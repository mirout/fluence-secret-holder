import { v4 as uuidv4 } from 'uuid';

import { Id, MarineError, Error, AquaResult } from '../types/types.js';
import { Result, ResultAsync, err, ok } from 'neverthrow';
import { WorkerError, WorkerResult } from '../worker/types.js';

export const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const generateRandomId = (): Id => ({ id: uuidv4() });

export const marineErrorToResult = <T>(val: { error: MarineError; value: T }): Result<T, Error> => {
  if (!val.error.is_ok) {
    return err(val.error);
  }
  return ok(val.value);
};

export const resultToMarineError = <T>(result: Result<T, Error>, defaultT: T): AquaResult<T> => {
  if (result.isOk()) {
    return { value: result.value, error: { is_ok: true, message: '' } };
  }
  return {
    value: defaultT,
    error: { is_ok: false, message: result.error.message },
  };
};

export const asyncResultToMarineError = async <T>(
  result: ResultAsync<T, Error>,
  defaultT: T,
): Promise<AquaResult<T>> => {
  return result.then((r) => {
    return resultToMarineError(r, defaultT);
  });
};

export function extractData<T>(
  result: ResultAsync<WorkerResult<AquaResult<T>>[], Error>,
): ResultAsync<WorkerResult<T>[], Error> {
  return result
    .map((result) =>
      result.map((worker) =>
        marineErrorToResult({
          value: {
            workerId: worker.workerId,
            value: worker.value.value,
          },
          error: worker.value.error,
        }),
      ),
    )
    .andThen((workers) => {
      return Result.combine(workers);
    });
}

export function flatWorkerError(
  result: ResultAsync<WorkerError[], Error>,
): ResultAsync<void, Error> {
  return result
    .andThen((workers) => {
      return Result.combine(
        workers.map((worker) => {
          if (worker.error.is_ok) {
            return ok(undefined);
          } else {
            return err(worker.error);
          }
        }),
      );
    })
    .map(() => undefined);
}
