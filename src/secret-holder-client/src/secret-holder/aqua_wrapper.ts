import {
  ChangeSecretVisibilityParams,
  CheckIsSecretAvailableForUseParams,
  CheckIsSecretOwnerParams,
  DeleteSecretParams,
  GetAvailableForUseSecretsParams,
  GetOwnableSecretsParams,
  GetRoleParams,
  GetSecretMetadataParams,
  GetSecretParams,
  InitializeMultiWorkerSecretParams,
  InitializeSecretHolderParams,
  PermitRoleParams,
  RevokeRoleParams,
  SaveSecretOnWorkersParams,
  UpdateSecretExpirationParams,
  changeSecretVisibility,
  checkIsSecretAvailableForUse,
  checkIsSecretOwner,
  deleteSecret,
  getAvailableForUseSecrets,
  getOwnableSecrets,
  getRole,
  getSecret,
  getSecretMetadata,
  initializeMultiWorkerSecret,
  initializeSecretHolder,
  permitRole,
  revokeRole,
  saveSecretOnWorkers,
  updateSecretExpiration,
} from '../compiled-aqua/secret_holder.js';
import type { AquaResult, Id, MarineError } from '../types/types.js';
import { WorkerError, WorkerResult } from '../worker/types.js';
import { Role, SecretId, SecretMetadata } from './types.js';

export interface SecretHolderAquaWrapper {
  initializeSecretHolder: (...args: InitializeSecretHolderParams) => Promise<WorkerError[]>;
  saveSecretOnWorkers: (
    ...args: SaveSecretOnWorkersParams
  ) => Promise<WorkerResult<AquaResult<SecretId>>[]>;
  getSecret: (...args: GetSecretParams) => Promise<WorkerResult<AquaResult<SecretId>>[]>;
  deleteSecret: (...args: DeleteSecretParams) => Promise<WorkerError[]>;
  getSecretMetadata: (
    ...args: GetSecretMetadataParams
  ) => Promise<WorkerResult<AquaResult<SecretMetadata>>[]>;

  getAllAvailableSecrets: (
    ...args: GetAvailableForUseSecretsParams
  ) => Promise<WorkerResult<AquaResult<SecretId[]>>[]>;
  getAllOwnableSecrets: (
    ...args: GetOwnableSecretsParams
  ) => Promise<WorkerResult<AquaResult<SecretId[]>>[]>;

  checkIsSecretAvailableForUse: (
    ...args: CheckIsSecretAvailableForUseParams
  ) => Promise<WorkerError[]>;
  checkIsSecretOwner: (...args: CheckIsSecretOwnerParams) => Promise<WorkerError[]>;

  changeSecretVisibility: (...args: ChangeSecretVisibilityParams) => Promise<WorkerError[]>;
  updateSecretExpiration: (...args: UpdateSecretExpirationParams) => Promise<WorkerError[]>;

  initializeMultiWorkerSecret: (
    ...args: InitializeMultiWorkerSecretParams
  ) => Promise<{ workerId: Id; error: MarineError[] }[]>;

  permitRole: (...args: PermitRoleParams) => Promise<WorkerError[]>;
  getUserRole: (...args: GetRoleParams) => Promise<WorkerResult<AquaResult<Role>>[]>;
  revokeRole: (...args: RevokeRoleParams) => Promise<WorkerError[]>;
}

export const secretHolderAquaWrapper: SecretHolderAquaWrapper = {
  initializeSecretHolder,
  saveSecretOnWorkers,
  getSecret,
  deleteSecret,
  async getSecretMetadata(...args: GetSecretMetadataParams) {
    const res = await getSecretMetadata(...args);
    return res.map((r) => ({
      workerId: r.workerId,
      value: {
        value: {
          expiredAt: r.value.value.expired_at,
          isAnyoneCanUse: r.value.value.is_anyone_can_use,
        },
        error: r.value.error,
      },
    }));
  },

  checkIsSecretAvailableForUse,
  checkIsSecretOwner,

  changeSecretVisibility,
  updateSecretExpiration,
  initializeMultiWorkerSecret,

  permitRole,
  revokeRole,
  async getUserRole(...args: GetRoleParams) {
    const res = await getRole(...args);
    let role: Role;
    switch (res[0].value.value.role) {
      case 'owner':
        role = 'owner';
        break;
      case 'user':
        role = 'user';
        break;
      default:
        role = 'unknown';
    }
    return res.map((r) => ({
      workerId: r.workerId,
      value: {
        value: role,
        error: r.value.error,
      },
    }));
  },

  async getAllAvailableSecrets(...args: GetAvailableForUseSecretsParams) {
    const res = await getAvailableForUseSecrets(...args);
    return res.map((r) => ({
      workerId: r.workerId,
      value: {
        value: r.value.value.secret_ids.map((secretId) => ({
          secretId: { id: secretId },
        })),
        error: r.value.error,
      },
    }));
  },
  async getAllOwnableSecrets(...args: GetOwnableSecretsParams) {
    const res = await getOwnableSecrets(...args);
    return res.map((r) => ({
      workerId: r.workerId,
      value: {
        value: r.value.value.secret_ids.map((secretId) => ({
          secretId: { id: secretId },
        })),
        error: r.value.error,
      },
    }));
  },
};
