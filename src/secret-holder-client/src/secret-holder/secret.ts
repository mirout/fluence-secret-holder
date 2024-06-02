import { ResultAsync, err, ok } from 'neverthrow';
import type { Id, Error } from '../types/types.js';
import { WorkerGroup } from '../worker/worker.js';
import { SecretHolderClient } from './client.js';
import { Role, SecretId, SecretMetadata } from './types.js';
import { FuncSignatures } from '../worker/types.js';
import { isContainsSecretInitFunc } from './utils.js';

class StoredSecret {
  public readonly secretId: Id;
  public readonly workers: WorkerGroup;

  protected client: SecretHolderClient;

  public constructor(secretId: Id, workers: WorkerGroup, client: SecretHolderClient) {
    this.secretId = secretId;
    this.workers = workers;
    this.client = client;
  }
}

export class Secret extends StoredSecret {
  public constructor(secretId: Id, workers: WorkerGroup, client: SecretHolderClient) {
    super(secretId, workers, client);
  }

  public getSecret(): ResultAsync<Map<string, Uint8Array>, Error> {
    return this.client
      .getSecret(this.secretId, Array.from(this.workers.workers.values()))
      .andThen((secrets) => {
        const result = new Map<string, Uint8Array>();
        for (const [workerId, sessionId] of secrets.entries()) {
          const secret = this.client.getFromStorage(sessionId.sessionId);
          if (secret.isErr()) {
            return err(secret.error);
          }

          result.set(workerId, new Uint8Array(secret.value));
        }

        return ok(result);
      });
  }

  public deleteSecret(): ResultAsync<void, Error> {
    return this.client.deleteSecret(this.secretId, Array.from(this.workers.workers.values()));
  }

  public changeVisibility(visibility: boolean): ResultAsync<Secret, Error> {
    return this.client
      .changeSecretVisibility(this.secretId, visibility, Array.from(this.workers.workers.values()))
      .map(() => new Secret(this.secretId, this.workers, this.client));
  }

  public updateExpirationTime(expirationTime: number): ResultAsync<Secret, Error> {
    return this.client
      .updateSecretExpiration(
        this.secretId,
        expirationTime,
        Array.from(this.workers.workers.values()),
      )
      .map(() => new Secret(this.secretId, this.workers, this.client));
  }

  public getMetadata(): ResultAsync<Map<string, SecretMetadata>, Error> {
    return this.client.getSecretMetadata(this.secretId, Array.from(this.workers.workers.values()));
  }

  // getAvailableUsers return the list of users services
  public getAvailableUserServices(): ResultAsync<string[], Error> {
    return this.workers
      .getWorkersServices()
      .andThen((services) => {
        const serviceNames = new Set<string>();

        const iterator = services.values();

        const firstWorkerServices = iterator.next();
        if (firstWorkerServices.done) {
          return err(new Error('No workers available'));
        }
        firstWorkerServices.value.services.forEach((service) => {
          serviceNames.add(service.aliases[0]);
        });

        for (const workerServices of iterator) {
          for (const service of workerServices.services) {
            const anyAlias = service.aliases.find((alias) => serviceNames.has(alias));
            if (anyAlias === undefined) {
              return err(new Error('Workers have different services'));
            }
          }
        }

        return ok(Array.from(serviceNames));
      })
      .andThen((serviceNames) => this.workers.getWorkerServiceSignaturesByAlias(serviceNames))
      .andThen((signatures) => {
        const serviceToSignatures = new Map<string, FuncSignatures>();

        const iterator = signatures.values();

        const firstWorkerServices = iterator.next();
        if (firstWorkerServices.done) {
          return err(new Error('No workers available'));
        }
        firstWorkerServices.value.forEach((service, key) => {
          service.functions.sort((a, b) => a.name.localeCompare(b.name));
          serviceToSignatures.set(key, service);
        });

        for (const workerServices of iterator) {
          for (const [key, service] of workerServices) {
            const anyAlias = serviceToSignatures.get(key);
            service.functions.sort((a, b) => a.name.localeCompare(b.name));
            if (JSON.stringify(service) !== JSON.stringify(anyAlias)) {
              return err(new Error('Workers have different services'));
            }
          }
        }

        return ok(serviceToSignatures);
      })
      .map((serviceToSignatures) => {
        const serviceNames = new Set<string>();

        serviceToSignatures.forEach((sign, key) => {
          if (isContainsSecretInitFunc(sign)) {
            serviceNames.add(key);
          }
        });

        return Array.from(serviceNames);
      });
  }

  public initializeSecret(userServices: string[]): ResultAsync<void, Error> {
    return this.client.initializeMultiWorkerSecret(
      this.secretId,
      Array.from(this.workers.workers.values()),
      userServices,
    );
  }

  public permitRole(userId: Id, role: string): ResultAsync<void, Error> {
    return this.client.permitRole(
      this.secretId,
      userId,
      role,
      Array.from(this.workers.workers.values()),
    );
  }

  public getUserRole(userId: Id): ResultAsync<Map<string, Role>, Error> {
    return this.client.getUserRole(
      this.secretId,
      userId,
      Array.from(this.workers.workers.values()),
    );
  }

  public revokeRole(userId: Id): ResultAsync<void, Error> {
    return this.client.revokeRole(this.secretId, userId, Array.from(this.workers.workers.values()));
  }
}

export class LocalSecret extends StoredSecret {
  public expirationTime = 0;

  public constructor(sessionId: Id, workers: WorkerGroup, client: SecretHolderClient) {
    super(sessionId, workers, client);
  }

  public setSecret(secret: Uint8Array) {
    const secretArray = Array.from(secret);
    this.client.putToStorage(this.secretId, secretArray);
  }

  public sendSecret(): ResultAsync<Secret, Error> {
    const res = this.client.sendSecret(
      Array.from(this.workers.workers.values()),
      this.secretId,
      this.expirationTime,
    );
    return res.andThen((secrets) => {
      if (secrets.size === 0) {
        return err(new Error('Secret was not saved'));
      }

      const secretId = secrets.values().next().value as SecretId | undefined;
      if (secretId === undefined) {
        return err(new Error('Secret was not saved'));
      }

      return ok(new Secret(secretId.secretId, this.workers, this.client));
    });
  }

  public setExpirationTime(expirationTime: number) {
    this.expirationTime = expirationTime;
  }
}

export class UncheckedSecret extends StoredSecret {
  public constructor(secretId: Id, workers: WorkerGroup, client: SecretHolderClient) {
    super(secretId, workers, client);
  }

  public verifySecret(): ResultAsync<Secret, Error> {
    return this.client
      .verifySecret(this.secretId, Array.from(this.workers.workers.values()))
      .map(() => new Secret(this.secretId, this.workers, this.client));
  }
}
