import type { Id, MarineError } from '../types/types.js';

export interface Worker {
  readonly hostId: string;
  readonly workerId: string;
  readonly patId: string;
}

export interface MarineWorker {
  readonly host_id: string;
  readonly worker_id: string | null;
  readonly pat_id: string;
}

export const workerMapperToMarine = (worker: Worker): MarineWorker => ({
  host_id: worker.hostId,
  worker_id: worker.workerId,
  pat_id: worker.patId,
});

export const workerMapperFromMarine = (marine: MarineWorker): Worker => ({
  hostId: marine.host_id,
  workerId: marine.worker_id ?? '',
  patId: marine.pat_id,
});

export interface ServiceAliases {
  readonly serviceId: Id;
  readonly aliases: string[];
}

export interface WorkerServiceAliases {
  readonly workerId: Id;
  readonly services: ServiceAliases[];
}

export interface SignatureMarine {
  readonly name: string;
  readonly arguments: string[][];
  readonly output_types: string[];
}

export interface Signature {
  readonly name: string;
  readonly arguments: string[][];
  readonly outputTypes: string[];
}

export const signatureMapperFromMarine = (marine: SignatureMarine): Signature => ({
  name: marine.name,
  arguments: marine.arguments,
  outputTypes: marine.output_types,
});

export interface ServiceId {
  readonly serviceId: Id;
}

export interface ServiceAlias {
  readonly alias: string;
}

export interface FuncSignatures {
  readonly functions: Signature[];
}

export type ServiceSignatureById = ServiceId & FuncSignatures;
export type ServiceSignatureByAlias = ServiceAlias & FuncSignatures;

export interface WorkerServiceSignature<T extends FuncSignatures> {
  readonly workerId: Id;
  readonly services: T[];
}

export interface WorkerWithIds {
  readonly worker: Worker;
  readonly serviceIds: Id[];
}

export interface WorkerResult<T> {
  workerId: Id;
  value: T;
}

export interface WorkerError {
  workerId: Id;
  error: MarineError;
}
