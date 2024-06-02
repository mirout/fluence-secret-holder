import { ClientPeer } from '@fluencelabs/js-client';
import type { Id, Error } from '../types/types.js';
import { ResolveSubnetResult, WorkerAquaWrapper, workerAquaWrapper } from './aqua_wrapper.js';
import { Result, ResultAsync, errAsync, okAsync } from 'neverthrow';
import { marineErrorToResult } from '../utils/utils.js';
import {
  FuncSignatures,
  ServiceSignatureByAlias,
  ServiceSignatureById,
  Worker,
  WorkerServiceAliases,
  WorkerServiceSignature,
  WorkerWithIds,
  workerMapperToMarine,
} from './types.js';
import { assert } from 'chai';

export class WorkerClient {
  private fluenceClient: ClientPeer;
  private aquaWrapper: WorkerAquaWrapper;

  constructor(fluenceClient: ClientPeer, aquaWrapper: WorkerAquaWrapper = workerAquaWrapper) {
    assert(fluenceClient instanceof ClientPeer);
    this.fluenceClient = fluenceClient;
    this.aquaWrapper = aquaWrapper;
  }

  public resolveDeal(dealId: Id, ttl = 7000): ResultAsync<Map<string, Worker>, Error> {
    return ResultAsync.fromPromise(
      this.aquaWrapper.resolveDealSubnet(this.fluenceClient, dealId.id, { ttl }),
      () => new Error(`Failed to get workers for deal ${dealId.id}`),
    )
      .andThen(marineErrorToResult<ResolveSubnetResult>)
      .andThen((workers) => {
        const workerMap = new Map<string, Worker>();
        if (workers.find((worker) => worker.worker_id === null) !== undefined) {
          return errAsync(new Error('Worker has not worker_id'));
        }

        workers.forEach((worker) => {
          workerMap.set(worker.worker_id ?? '', {
            hostId: worker.host_id,
            workerId: worker.worker_id ?? '',
            patId: worker.pat_id,
          });
        });

        return okAsync(workerMap);
      });
  }

  public getWorkerServices(
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<Map<string, WorkerServiceAliases>, Error> {
    return ResultAsync.fromPromise(
      this.aquaWrapper.getWorkerServices(this.fluenceClient, workers.map(workerMapperToMarine), {
        ttl,
      }),
      () => new Error(`Failed to get worker services for workers`),
    )
      .andThen((res) =>
        Result.combine(res.map((r) => marineErrorToResult<WorkerServiceAliases>(r))),
      )
      .map((res) => {
        const workerServices = new Map<string, WorkerServiceAliases>();
        res.forEach((ws) => {
          workerServices.set(ws.workerId.id, ws);
        });

        return workerServices;
      });
  }

  public getWorkerServiceSignature(
    input: WorkerWithIds[],
    ttl = 7000,
  ): ResultAsync<Map<string, Map<string, FuncSignatures>>, Error> {
    return ResultAsync.fromPromise(
      this.aquaWrapper.getWorkerServiceSignature(
        this.fluenceClient,
        input.map((ws) => ({
          worker: workerMapperToMarine(ws.worker),
          serviceIds: ws.serviceIds,
        })),
        { ttl },
      ),
      () => new Error(`Failed to get worker service signature for workers`),
    )
      .andThen((res) =>
        Result.combine(
          res.map((r) => marineErrorToResult<WorkerServiceSignature<ServiceSignatureById>>(r)),
        ),
      )
      .map((res) => {
        const workerServiceSignatures = new Map<string, Map<string, FuncSignatures>>();
        res.forEach((wss) => {
          const serviceSignatures = new Map<string, FuncSignatures>();
          wss.services.forEach((s) => {
            serviceSignatures.set(s.serviceId.id, s);
          });
          workerServiceSignatures.set(wss.workerId.id, serviceSignatures);
        });

        return workerServiceSignatures;
      });
  }

  public getWorkerServiceSignatureByAlias(
    workers: Worker[],
    aliases: string[],
    ttl = 7000,
  ): ResultAsync<Map<string, Map<string, FuncSignatures>>, Error> {
    return ResultAsync.fromPromise(
      this.aquaWrapper.getWorkerServiceSignatureByAlias(
        this.fluenceClient,
        workers.map(workerMapperToMarine),
        aliases,
        { ttl },
      ),
      () => new Error(`Failed to get worker service signature by alias for workers`),
    )
      .andThen((res) =>
        Result.combine(
          res.map((r) => marineErrorToResult<WorkerServiceSignature<ServiceSignatureByAlias>>(r)),
        ),
      )
      .map((res) => {
        const workerServiceSignatures = new Map<string, Map<string, FuncSignatures>>();
        res.forEach((wss) => {
          const serviceSignatures = new Map<string, FuncSignatures>();
          wss.services.forEach((s) => {
            serviceSignatures.set(s.alias, s);
          });
          workerServiceSignatures.set(wss.workerId.id, serviceSignatures);
        });

        return workerServiceSignatures;
      });
  }
}

export class WorkerGroup {
  public readonly workers: Map<string, Worker>;
  private readonly workerClient: WorkerClient;

  public constructor(workers: Map<string, Worker>, workerClient: WorkerClient) {
    this.workers = workers;
    this.workerClient = workerClient;
  }

  public removeWorkers(workerIds: Id[]): WorkerGroup {
    const workers = new Map<string, Worker>(this.workers);
    workerIds.forEach((workerId) => {
      workers.delete(workerId.id);
    });

    return new WorkerGroup(workers, this.workerClient);
  }

  public getWorkersServices(): ResultAsync<Map<string, WorkerServiceAliases>, Error> {
    return this.workerClient.getWorkerServices(Array.from(this.workers.values()));
  }

  public getWorkerServiceSignaturesByAlias(
    aliases: string[],
  ): ResultAsync<Map<string, Map<string, FuncSignatures>>, Error> {
    return this.workerClient.getWorkerServiceSignatureByAlias(
      Array.from(this.workers.values()),
      aliases,
    );
  }
}
