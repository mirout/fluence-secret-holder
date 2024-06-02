import { ClientPeer } from '@fluencelabs/js-client';
import { SecretGiver } from '../secret_giver.js';
import { registerSecretGiverService } from '../compiled-aqua/secret_worker/local.js';
import { Result, ResultAsync, err, ok } from 'neverthrow';
import type { Id, Error } from '../types/types.js';
import { extractData, flatWorkerError } from '../utils/utils.js';
import { SecretHolderAquaWrapper, secretHolderAquaWrapper } from './aqua_wrapper.js';
import { Worker, workerMapperToMarine } from '../worker/types.js';
import { LocalSecret, UncheckedSecret } from './secret.js';
import { WorkerGroup } from '../worker/worker.js';
import { Role, SecretId, SecretMetadata, SessionId } from './types.js';

export class SecretHolderClient {
  private fluenceClient: ClientPeer;
  private secretGiver: SecretGiver;
  private aquaWrapper: SecretHolderAquaWrapper;

  public constructor(
    fluenceClient: ClientPeer,
    secretGiver: SecretGiver,
    aquaWrapper: SecretHolderAquaWrapper,
  ) {
    this.fluenceClient = fluenceClient;
    this.secretGiver = secretGiver;
    this.aquaWrapper = aquaWrapper;
  }

  public static deploy(
    fluenceClient: ClientPeer,
    aquaWrapper: SecretHolderAquaWrapper = secretHolderAquaWrapper,
  ): SecretHolderClient {
    const secretGiver: SecretGiver = new SecretGiver();
    registerSecretGiverService(fluenceClient, secretGiver);

    return new SecretHolderClient(fluenceClient, secretGiver, aquaWrapper);
  }

  public initializeSecretHolder(workers: Worker[]): ResultAsync<void, Error> {
    return flatWorkerError(
      ResultAsync.fromPromise(
        this.aquaWrapper.initializeSecretHolder(
          this.fluenceClient,
          workers.map(workerMapperToMarine),
        ),
        (e) => ({ message: 'error during initializing secret holder: ' + JSON.stringify(e) }),
      ),
    );
  }

  public createNewSecret(workerGroup: WorkerGroup): LocalSecret {
    const sessionId = this.secretGiver.initialize_session();
    return new LocalSecret(sessionId, workerGroup, this);
  }

  public getSecretFromHolder(secretId: Id, workerGroup: WorkerGroup): UncheckedSecret {
    return new UncheckedSecret(secretId, workerGroup, this);
  }

  public putToStorage(secretId: Id, secret: number[]): void {
    this.secretGiver.setSecret(secretId, secret);
  }

  public getFromStorage(sessionId: Id): Result<number[], Error> {
    return this.secretGiver.getSecret(sessionId);
  }

  public sendSecret(
    workers: Worker[],
    sessionId: Id,
    expiredAt = 0,
    ttl = 7000,
  ): ResultAsync<Map<string, SecretId>, Error> {
    return extractData(
      ResultAsync.fromPromise(
        this.aquaWrapper.saveSecretOnWorkers(
          this.fluenceClient,
          sessionId,
          expiredAt,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during saving secret: ' + JSON.stringify(e) }),
      ),
    ).map((result) => {
      const saveSecrets = new Map<string, SecretId>();
      result.forEach((secret) => {
        saveSecrets.set(secret.workerId.id, secret.value);
      });

      return saveSecrets;
    });
  }

  public getSecret(
    secretId: Id,
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<Map<string, SessionId>, Error> {
    return extractData(
      ResultAsync.fromPromise(
        this.aquaWrapper.getSecret(
          this.fluenceClient,
          secretId,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during getting secret: ' + JSON.stringify(e) }),
      ),
    ).map((result) => {
      const secrets = new Map<string, SessionId>();
      result.forEach((secret) => {
        secrets.set(secret.workerId.id, { sessionId: secret.value.secretId });
      });

      return secrets;
    });
  }

  public deleteSecret(secretId: Id, workers: Worker[], ttl = 7000): ResultAsync<void, Error> {
    return flatWorkerError(
      ResultAsync.fromPromise(
        this.aquaWrapper.deleteSecret(
          this.fluenceClient,
          secretId,
          workers.map(workerMapperToMarine),
          {
            ttl,
          },
        ),
        (e) => ({ message: 'error during deleting secret: ' + JSON.stringify(e) }),
      ),
    );
  }

  public verifySecret(secretId: Id, workers: Worker[], ttl = 7000): ResultAsync<void, Error> {
    return flatWorkerError(
      ResultAsync.fromPromise(
        this.aquaWrapper.checkIsSecretOwner(
          this.fluenceClient,
          secretId,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during verifying secret: ' + JSON.stringify(e) }),
      ),
    );
  }

  public changeSecretVisibility(
    secretId: Id,
    isAvailable: boolean,
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<void, Error> {
    return flatWorkerError(
      ResultAsync.fromPromise(
        this.aquaWrapper.changeSecretVisibility(
          this.fluenceClient,
          secretId,
          isAvailable,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during changing secret visibility: ' + JSON.stringify(e) }),
      ),
    );
  }

  public initializeMultiWorkerSecret(
    secretId: Id,
    workers: Worker[],
    serviceAliases: string[],
    ttl = 20000,
  ): ResultAsync<void, Error> {
    const firstStep = serviceAliases.map((alias, idx) => ({
      srvId: alias,
      step: idx + 1,
    }));
    const secondStep = serviceAliases.slice(0, serviceAliases.length - 1).map((alias, idx) => ({
      srvId: alias,
      step: idx + serviceAliases.length + 2,
    }));
    return ResultAsync.fromPromise(
      this.aquaWrapper.initializeMultiWorkerSecret(
        this.fluenceClient,
        workers.map(workerMapperToMarine),
        secretId,
        serviceAliases.length + 1,
        firstStep,
        secondStep,
        { ttl },
      ),
      (e) => ({ message: 'error during initializing multi worker secret: ' + JSON.stringify(e) }),
    )
      .andThen((result) => {
        return Result.combine(
          result.map((workerResult) => {
            const errorResult = workerResult.error.find((e) => !e.is_ok);
            if (errorResult === undefined) {
              return ok(undefined);
            } else {
              return err(errorResult);
            }
          }),
        );
      })
      .map(() => undefined);
  }

  public getSecretMetadata(
    secretId: Id,
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<Map<string, SecretMetadata>, Error> {
    return extractData(
      ResultAsync.fromPromise(
        this.aquaWrapper.getSecretMetadata(
          this.fluenceClient,
          secretId,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during getting secret metadata: ' + JSON.stringify(e) }),
      ),
    ).map((result) => {
      const metadata = new Map<string, SecretMetadata>();
      result.forEach((secret) => {
        metadata.set(secret.workerId.id, secret.value);
      });

      return metadata;
    });
  }

  public getOwnableSecrets(
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<Map<string, SecretId[]>, Error> {
    return extractData(
      ResultAsync.fromPromise(
        this.aquaWrapper.getAllOwnableSecrets(
          this.fluenceClient,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during getting ownable secrets: ' + JSON.stringify(e) }),
      ),
    ).map((result) => {
      const secrets = new Map<string, SecretId[]>();
      result.forEach((secret) => {
        secrets.set(secret.workerId.id, secret.value);
      });

      return secrets;
    });
  }

  public getAvailableForUseSecrets(
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<Map<string, SecretId[]>, Error> {
    return extractData(
      ResultAsync.fromPromise(
        this.aquaWrapper.getAllAvailableSecrets(
          this.fluenceClient,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({
          message: 'error during getting available for use secrets: ' + JSON.stringify(e),
        }),
      ),
    ).map((result) => {
      const secrets = new Map<string, SecretId[]>();
      result.forEach((secret) => {
        secrets.set(secret.workerId.id, secret.value);
      });

      return secrets;
    });
  }

  public updateSecretExpiration(
    secretId: Id,
    expiredAt: number,
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<void, Error> {
    return flatWorkerError(
      ResultAsync.fromPromise(
        this.aquaWrapper.updateSecretExpiration(
          this.fluenceClient,
          secretId,
          expiredAt,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during updating secret expiration: ' + JSON.stringify(e) }),
      ),
    );
  }

  public permitRole(
    secretId: Id,
    userId: Id,
    role: string,
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<void, Error> {
    return flatWorkerError(
      ResultAsync.fromPromise(
        this.aquaWrapper.permitRole(
          this.fluenceClient,
          secretId,
          userId,
          role,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during permitting role: ' + JSON.stringify(e) }),
      ),
    );
  }

  public revokeRole(
    secretId: Id,
    userId: Id,
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<void, Error> {
    return flatWorkerError(
      ResultAsync.fromPromise(
        this.aquaWrapper.revokeRole(
          this.fluenceClient,
          secretId,
          userId,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during revoking role: ' + JSON.stringify(e) }),
      ),
    );
  }

  public getUserRole(
    secretId: Id,
    userId: Id,
    workers: Worker[],
    ttl = 7000,
  ): ResultAsync<Map<string, Role>, Error> {
    return extractData(
      ResultAsync.fromPromise(
        this.aquaWrapper.getUserRole(
          this.fluenceClient,
          secretId,
          userId,
          workers.map(workerMapperToMarine),
          { ttl },
        ),
        (e) => ({ message: 'error during getting user role: ' + JSON.stringify(e) }),
      ),
    ).map((result) => {
      const roles = new Map<string, Role>();
      result.forEach((role) => {
        roles.set(role.workerId.id, role.value);
      });

      return roles;
    });
  }
}
