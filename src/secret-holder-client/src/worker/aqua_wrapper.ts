import { ResolveDealSubnetParams, resolveDealSubnet } from '../compiled-aqua/main.js';
import {
  GetWorkerServiceSignatureByAliasParams,
  GetWorkerServiceSignatureParams,
  GetWorkerServicesParams,
  getWorkerServiceSignature,
  getWorkerServiceSignatureByAlias,
  getWorkerServices,
} from '../compiled-aqua/worker.js';
import { AquaResult } from '../types/types.js';
import {
  MarineWorker,
  ServiceSignatureByAlias,
  ServiceSignatureById,
  WorkerServiceAliases,
  WorkerServiceSignature,
  signatureMapperFromMarine,
} from './types.js';

export type ResolveSubnetResult = MarineWorker[];

export interface WorkerAquaWrapper {
  resolveDealSubnet: (...args: ResolveDealSubnetParams) => Promise<AquaResult<ResolveSubnetResult>>;
  getWorkerServices: (
    ...args: GetWorkerServicesParams
  ) => Promise<AquaResult<WorkerServiceAliases>[]>;
  getWorkerServiceSignature: (
    ...args: GetWorkerServiceSignatureParams
  ) => Promise<AquaResult<WorkerServiceSignature<ServiceSignatureById>>[]>;
  getWorkerServiceSignatureByAlias: (
    ...args: GetWorkerServiceSignatureByAliasParams
  ) => Promise<AquaResult<WorkerServiceSignature<ServiceSignatureByAlias>>[]>;
}

export const workerAquaWrapper: WorkerAquaWrapper = {
  resolveDealSubnet,
  getWorkerServices,
  async getWorkerServiceSignature(...args: GetWorkerServiceSignatureParams) {
    const result = await getWorkerServiceSignature(...args);
    return result.map((res) => ({
      error: res.error,
      value: {
        workerId: res.value.workerId,
        services: res.value.services.map((service) => ({
          serviceId: service.serviceId,
          functions: service.interface.map(signatureMapperFromMarine),
        })),
      },
    }));
  },

  async getWorkerServiceSignatureByAlias(...args: GetWorkerServiceSignatureByAliasParams) {
    const result = await getWorkerServiceSignatureByAlias(...args);
    return result.map((res) => ({
      error: res.error,
      value: {
        workerId: res.value.workerId,
        services: res.value.services.map((service) => ({
          alias: service.serviceAlias,
          functions: service.interface.map(signatureMapperFromMarine),
        })),
      },
    }));
  },
};
