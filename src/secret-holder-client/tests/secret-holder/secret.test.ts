import sinon from 'sinon';
import { SecretHolderClient } from '../../src/secret-holder/client.js';
import { WorkerGroup } from '../../src/worker/worker.js';
import { LocalSecret, Secret, UncheckedSecret } from '../../src/secret-holder/secret.js';
import { ok, okAsync } from 'neverthrow';
import { expect } from 'chai';

const SECRET_ID = { id: 'secretId' };
const SAVED_SECRET_ID = { id: 'savedSecretId' };

const WORKER_1 = { hostId: '1', workerId: '1', patId: '1' };
const WORKER_2 = { hostId: '2', workerId: '2', patId: '2' };

describe('Local secret', () => {
  function createClient() {
    const client = <SecretHolderClient>(<unknown>{
      putToStorage: () => {},
      sendSecret: () => {},
    });
    const workers = sinon.createStubInstance(WorkerGroup);
    (workers as any).workers = new Map([[WORKER_1.workerId, WORKER_1]]);
    const secret = new LocalSecret(SECRET_ID, workers, client);
    return { client, workers, secret };
  }

  it('should set secret', () => {
    const { client, secret } = createClient();

    const mockedClient = sinon.mock(client);

    const secretData = new Uint8Array([1, 2, 3]);

    mockedClient.expects('putToStorage').once().withArgs(SECRET_ID, [1, 2, 3]);

    secret.setSecret(secretData);

    mockedClient.verify();
  });

  it('should save secret', async () => {
    const { client, secret } = createClient();

    const mockedClient = sinon.mock(client);

    mockedClient
      .expects('sendSecret')
      .withArgs([WORKER_1], SECRET_ID, 10)
      .once()
      .returns(okAsync(new Map([[WORKER_1.workerId, { secretId: SAVED_SECRET_ID }]])));

    secret.setExpirationTime(10);

    const sendSecretResult = await secret.sendSecret();

    expect(sendSecretResult.isOk()).to.be.true;
    expect(sendSecretResult._unsafeUnwrap().secretId).to.be.equal(SAVED_SECRET_ID);
    expect(sendSecretResult._unsafeUnwrap().workers.workers).to.be.deep.equal(
      new Map([[WORKER_1.workerId, WORKER_1]]),
    );

    mockedClient.verify();
  });
});

describe('Unchecked secret', () => {
  it('should verify secret', async () => {
    const client = <SecretHolderClient>(<unknown>{
      verifySecret: () => {},
    });
    const workers = sinon.createStubInstance(WorkerGroup);
    (workers as any).workers = new Map([[WORKER_1.workerId, WORKER_1]]);
    const secret = new UncheckedSecret(SECRET_ID, workers, client);

    const mockedClient = sinon.mock(client);

    mockedClient
      .expects('verifySecret')
      .withArgs(SECRET_ID, [WORKER_1])
      .once()
      .returns(okAsync(undefined));

    const verifySecret = await secret.verifySecret();

    expect(verifySecret.isOk()).to.be.true;
    expect(verifySecret._unsafeUnwrap().secretId).to.be.equal(SECRET_ID);
    expect(verifySecret._unsafeUnwrap().workers).to.be.deep.equal(workers);

    mockedClient.verify();
  });
});

describe('Secret', () => {
  function createClient() {
    const client = <SecretHolderClient>(<unknown>{
      getSecret: () => {},
      getFromStorage: () => {},
      changeSecretVisibility: () => {},
      updateSecretExpiration: () => {},
      getUserRole: () => {},
      permitRole: () => {},
      revokeRole: () => {},
    });
    const workers = sinon.createStubInstance(WorkerGroup);
    (workers as any).workers = new Map([
      [WORKER_1.workerId, WORKER_1],
      [WORKER_2.workerId, WORKER_2],
    ]);
    const secret = new Secret(SECRET_ID, workers, client);
    return { client, workers, secret };
  }

  it('should get secret', async () => {
    const { client, secret } = createClient();

    const mockedClient = sinon.mock(client);

    const sessionId1 = { id: 'sessionId1' };
    const sessionId2 = { id: 'sessionId2' };

    mockedClient
      .expects('getSecret')
      .withArgs(SECRET_ID, [WORKER_1, WORKER_2])
      .once()
      .returns(
        okAsync(
          new Map([
            [WORKER_1.workerId, { sessionId: sessionId1 }],
            [WORKER_2.workerId, { sessionId: sessionId2 }],
          ]),
        ),
      );

    mockedClient
      .expects('getFromStorage')
      .withArgs(sessionId1)
      .once()
      .returns(ok(new Uint8Array([1, 2, 3])));

    mockedClient
      .expects('getFromStorage')
      .withArgs(sessionId2)
      .once()
      .returns(ok(new Uint8Array([4, 5, 6])));

    const getSecret = await secret.getSecret();

    expect(getSecret.isOk()).to.be.true;
    expect(getSecret._unsafeUnwrap().get(WORKER_1.workerId)).to.be.deep.equal(
      new Uint8Array([1, 2, 3]),
    );
    expect(getSecret._unsafeUnwrap().get(WORKER_2.workerId)).to.be.deep.equal(
      new Uint8Array([4, 5, 6]),
    );

    mockedClient.verify();
  });

  it('should change visibility', async () => {
    const { client, secret } = createClient();

    const mockedClient = sinon.mock(client);

    mockedClient
      .expects('changeSecretVisibility')
      .withArgs(SECRET_ID, true, [WORKER_1, WORKER_2])
      .once()
      .returns(okAsync(undefined));

    const changeVisibility = await secret.changeVisibility(true);

    expect(changeVisibility.isOk()).to.be.true;
    expect(changeVisibility._unsafeUnwrap().secretId).to.be.equal(SECRET_ID);
    expect(changeVisibility._unsafeUnwrap().workers.workers).to.be.deep.equal(
      new Map([
        [WORKER_1.workerId, WORKER_1],
        [WORKER_2.workerId, WORKER_2],
      ]),
    );

    mockedClient.verify();
  });

  describe('getAvailableUserServices', () => {
    function createClient() {
      const workers = <WorkerGroup>(<unknown>{
        getWorkersServices: () => {},
        getWorkerServiceSignaturesByAlias: () => {},
      });
      const client = sinon.createStubInstance(SecretHolderClient);
      (workers as any).workers = new Map([
        [WORKER_1.workerId, WORKER_1],
        [WORKER_2.workerId, WORKER_2],
      ]);
      const secret = new Secret(SECRET_ID, workers, client);
      return { client, workers, secret };
    }

    it('should get available user services', async () => {
      const { workers, secret } = createClient();

      const mockedWorkers = sinon.mock(workers);

      const services = new Map([
        [WORKER_1.workerId, { workerId: WORKER_1.workerId, services: [{ aliases: ['service1'] }] }],
        [WORKER_2.workerId, { workerId: WORKER_2.workerId, services: [{ aliases: ['service1'] }] }],
      ]);

      mockedWorkers.expects('getWorkersServices').once().returns(ok(services));

      mockedWorkers
        .expects('getWorkerServiceSignaturesByAlias')
        .withArgs(['service1'])
        .once()
        .returns(
          okAsync(
            new Map([
              [
                WORKER_1.workerId,
                new Map([
                  [
                    'service1',
                    {
                      functions: [
                        {
                          name: 'secret_initiate_handshake',
                          arguments: [
                            ['arg1', 'string'],
                            ['arg2', 'u8'],
                            ['arg3', 'u8'],
                          ],
                          outputTypes: ['Error'],
                        },
                      ],
                    },
                  ],
                ]),
              ],
              [
                WORKER_2.workerId,
                new Map([
                  [
                    'service1',
                    {
                      functions: [
                        {
                          name: 'secret_initiate_handshake',
                          arguments: [
                            ['arg1', 'string'],
                            ['arg2', 'u8'],
                            ['arg3', 'u8'],
                          ],
                          outputTypes: ['Error'],
                        },
                      ],
                    },
                  ],
                ]),
              ],
            ]),
          ),
        );

      const getAvailableUserServices = await secret.getAvailableUserServices();

      expect(getAvailableUserServices.isOk()).to.be.true;
      expect(getAvailableUserServices._unsafeUnwrap()).to.be.deep.equal(['service1']);

      mockedWorkers.verify();
      mockedWorkers.restore();
    });

    it('should fail if no workers available', async () => {
      const { workers, secret } = createClient();

      const mockedWorkers = sinon.mock(workers);

      mockedWorkers.expects('getWorkersServices').once().returns(ok(new Map()));

      const getAvailableUserServices = await secret.getAvailableUserServices();

      expect(getAvailableUserServices.isErr()).to.be.true;
      expect(getAvailableUserServices._unsafeUnwrapErr().message).to.be.equal(
        'No workers available',
      );

      mockedWorkers.verify();
      mockedWorkers.restore();
    });

    it('should fail if workers have different services', async () => {
      const { workers, secret } = createClient();

      const mockedWorkers = sinon.mock(workers);

      const services = new Map([
        [WORKER_1.workerId, { workerId: WORKER_1.workerId, services: [{ aliases: ['service1'] }] }],
        [WORKER_2.workerId, { workerId: WORKER_2.workerId, services: [{ aliases: ['service2'] }] }],
      ]);

      mockedWorkers.expects('getWorkersServices').once().returns(okAsync(services));

      const getAvailableUserServices = await secret.getAvailableUserServices();

      expect(getAvailableUserServices.isErr()).to.be.true;
      expect(getAvailableUserServices._unsafeUnwrapErr().message).to.be.equal(
        'Workers have different services',
      );

      mockedWorkers.verify();
      mockedWorkers.restore();
    });
  });

  it('should update expiration time', async () => {
    const { client, secret } = createClient();

    const mockedClient = sinon.mock(client);

    mockedClient
      .expects('updateSecretExpiration')
      .withArgs(SECRET_ID, 10, [WORKER_1, WORKER_2])
      .once()
      .returns(okAsync(undefined));

    const updateExpirationTime = await secret.updateExpirationTime(10);

    expect(updateExpirationTime.isOk()).to.be.true;
    expect(updateExpirationTime._unsafeUnwrap().secretId).to.be.equal(SECRET_ID);
    expect(updateExpirationTime._unsafeUnwrap().workers.workers).to.be.deep.equal(
      new Map([
        [WORKER_1.workerId, WORKER_1],
        [WORKER_2.workerId, WORKER_2],
      ]),
    );

    mockedClient.verify();
    mockedClient.restore();
  });

  describe('roles', () => {
    it('should get role', async () => {
      const { client, secret } = createClient();

      const mockedClient = sinon.mock(client);

      mockedClient
        .expects('getUserRole')
        .withArgs(SECRET_ID, { id: 'userId' }, [WORKER_1, WORKER_2])
        .once()
        .returns(
          okAsync(
            new Map([
              [WORKER_1.workerId, 'owner'],
              [WORKER_2.workerId, 'user'],
            ]),
          ),
        );

      const getRole = await secret.getUserRole({ id: 'userId' });
      expect(getRole.isOk()).to.be.true;
      expect(getRole._unsafeUnwrap().get(WORKER_1.workerId)).to.be.equal('owner');
      expect(getRole._unsafeUnwrap().get(WORKER_2.workerId)).to.be.equal('user');

      mockedClient.verify();
      mockedClient.restore();
    });

    it('should permit role', async () => {
      const { client, secret } = createClient();

      const mockedClient = sinon.mock(client);

      mockedClient
        .expects('permitRole')
        .withArgs(SECRET_ID, { id: 'userId' }, 'role', [WORKER_1, WORKER_2])
        .once()
        .returns(okAsync(undefined));

      const permitRole = await secret.permitRole({ id: 'userId' }, 'role');
      expect(permitRole.isOk()).to.be.true;

      mockedClient.verify();
      mockedClient.restore();
    });

    it('should revoke role', async () => {
      const { client, secret } = createClient();

      const mockedClient = sinon.mock(client);

      mockedClient
        .expects('revokeRole')
        .withArgs(SECRET_ID, { id: 'userId' }, [WORKER_1, WORKER_2])
        .once()
        .returns(okAsync(undefined));

      const revokeRole = await secret.revokeRole({ id: 'userId' });
      expect(revokeRole.isOk()).to.be.true;

      mockedClient.verify();
      mockedClient.restore();
    });
  });
});
