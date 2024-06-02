import { expect } from 'chai';
import sinon from 'sinon';
import { SecretHolderClient } from '../../src/secret-holder/client.js';
import { SecretHolderAquaWrapper } from '../../src/secret-holder/aqua_wrapper.js';
import { ClientPeer } from '@fluencelabs/js-client';
import { SecretGiver } from '../../src/secret_giver.js';
import { workerMapperToMarine } from '../../src/worker/types.js';
import { err, ok } from 'neverthrow';
import { WorkerGroup } from '../../src/worker/worker.js';

describe('Test secret-holder-client', () => {
  const NO_ERROR = { is_ok: true, message: '' };
  const WORKER_1 = { hostId: '1', workerId: '1', patId: '1' };

  function createClient(): [
    SecretHolderClient,
    sinon.SinonStubbedInstance<ClientPeer>,
    sinon.SinonStubbedInstance<SecretGiver>,
    SecretHolderAquaWrapper,
  ] {
    const fluenceClient = sinon.createStubInstance(ClientPeer);
    const secretGiver = sinon.createStubInstance(SecretGiver);

    let aquaWrapper = <SecretHolderAquaWrapper>{
      saveSecretOnWorkers: () => {},
      getSecret: () => {},
      deleteSecret: () => {},
      getSecretMetadata: () => {},

      getAllAvailableSecrets: () => {},
      getAllOwnableSecrets: () => {},

      checkIsSecretAvailableForUse: () => {},
      checkIsSecretOwner: () => {},

      changeSecretVisibility: () => {},
      updateSecretExpiration: () => {},

      initializeMultiWorkerSecret: () => {},

      permitRole: () => {},
      getUserRole: () => {},
      revokeRole: () => {},
    };

    return [
      new SecretHolderClient(fluenceClient, secretGiver, aquaWrapper),
      fluenceClient,
      secretGiver,
      aquaWrapper,
    ];
  }

  describe('initializeMultiWorkerSecret', () => {
    it('should pass on one service without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('initializeMultiWorkerSecret')
        .withExactArgs(
          fluenceClient,
          [workerMapperToMarine(WORKER_1)],
          { id: '1' },
          2,
          [{ srvId: 'service', step: 1 }],
          [],
          sinon.match.any,
        )
        .once()
        .returns(Promise.resolve([{ workerId: '1', error: [NO_ERROR, NO_ERROR, NO_ERROR] }]));

      const result = await client.initializeMultiWorkerSecret({ id: '1' }, [WORKER_1], ['service']);

      expect(result.isOk()).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('should pass on multiple services without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('initializeMultiWorkerSecret')
        .withExactArgs(
          fluenceClient,
          [workerMapperToMarine(WORKER_1)],
          { id: '1' },
          3,
          [
            { srvId: 'service1', step: 1 },
            { srvId: 'service2', step: 2 },
          ],
          [{ srvId: 'service1', step: 4 }],
          sinon.match.any,
        )
        .once()
        .returns(
          Promise.resolve([
            { workerId: '1', error: [NO_ERROR, NO_ERROR, NO_ERROR, NO_ERROR, NO_ERROR] },
          ]),
        );

      const result = await client.initializeMultiWorkerSecret(
        { id: '1' },
        [WORKER_1],
        ['service1', 'service2'],
      );

      expect(result.isOk()).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('should fail if any step is error', async () => {
      const [client, _ignored, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('initializeMultiWorkerSecret')
        .once()
        .returns(
          Promise.resolve([
            {
              workerId: '1',
              error: [NO_ERROR, NO_ERROR, { is_ok: false, message: 'someError' }],
            },
          ]),
        );

      const result = await client.initializeMultiWorkerSecret(
        { id: '1' },
        [WORKER_1],
        ['service1'],
      );

      expect(result.isErr()).to.be.true;
      expect(result._unsafeUnwrapErr().message).to.be.equal('someError');

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('changeSecretVisibility', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('changeSecretVisibility')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          true,
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(Promise.resolve([{ workerId: '1', error: NO_ERROR }]));

      const result = await client.changeSecretVisibility({ id: '1' }, true, [WORKER_1]);

      expect(result.isOk()).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('should fail if any worker has error', async () => {
      const [client, _ignored, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('changeSecretVisibility')
        .once()
        .returns(
          Promise.resolve([{ workerId: '1', error: { is_ok: false, message: 'someError' } }]),
        );

      const result = await client.changeSecretVisibility({ id: '1' }, true, [WORKER_1]);

      expect(result.isErr()).to.be.true;
      expect(result._unsafeUnwrapErr().message).to.be.equal('someError');

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('verifySecret', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('checkIsSecretOwner')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(Promise.resolve([{ workerId: '1', error: NO_ERROR }]));

      const result = await client.verifySecret({ id: '1' }, [WORKER_1]);

      expect(result.isOk()).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('should fail if any worker has error', async () => {
      const [client, _ignored, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('checkIsSecretOwner')
        .once()
        .returns(
          Promise.resolve([{ workerId: '1', error: { is_ok: false, message: 'someError' } }]),
        );

      const result = await client.verifySecret({ id: '1' }, [WORKER_1]);

      expect(result.isErr()).to.be.true;
      expect(result._unsafeUnwrapErr().message).to.be.equal('someError');

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('getSecret', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('getSecret')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(
          Promise.resolve([
            { workerId: { id: '1' }, value: { value: { secretId: { id: '1' } }, error: NO_ERROR } },
          ]),
        );

      const result = await client.getSecret({ id: '1' }, [WORKER_1]);

      expect(result.isOk()).to.be.true;
      expect(result._unsafeUnwrap().get('1')?.sessionId).to.be.deep.equal({ id: '1' });

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('should fail if any worker has error', async () => {
      const [client, _ignored, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('getSecret')
        .once()
        .returns(
          Promise.resolve([
            {
              workerId: { id: '1' },
              value: {
                value: { secretId: { id: '1' } },
                error: { is_ok: false, message: 'someError' },
              },
            },
          ]),
        );

      const result = await client.getSecret({ id: '1' }, [WORKER_1]);

      expect(result.isErr()).to.be.true;
      expect(result._unsafeUnwrapErr().message).to.be.equal('someError');

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('saveSecret', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('saveSecretOnWorkers')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          0,
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(
          Promise.resolve([
            { workerId: { id: '1' }, value: { value: { secretId: { id: '1' } }, error: NO_ERROR } },
          ]),
        );

      const result = await client.sendSecret([WORKER_1], { id: '1' });

      expect(result.isOk()).to.be.true;
      expect(result._unsafeUnwrap().get('1')?.secretId).to.be.deep.equal({ id: '1' });

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('deleteSecret', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('deleteSecret')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(Promise.resolve([{ workerId: '1', error: NO_ERROR }]));

      const result = await client.deleteSecret({ id: '1' }, [WORKER_1]);

      expect(result.isOk()).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('should fail if any worker has error', async () => {
      const [client, _ignored, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('deleteSecret')
        .once()
        .returns(
          Promise.resolve([{ workerId: '1', error: { is_ok: false, message: 'someError' } }]),
        );

      const result = await client.deleteSecret({ id: '1' }, [WORKER_1]);

      expect(result.isErr()).to.be.true;
      expect(result._unsafeUnwrapErr().message).to.be.equal('someError');

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('putToStorage', () => {
    it('should pass without error', async () => {
      const [client, _ignored, secretGiver, _] = createClient();

      client.putToStorage({ id: '1' }, [1, 2, 3]);

      expect(secretGiver.setSecret.calledOnceWith({ id: '1' }, [1, 2, 3])).to.be.true;
    });
  });

  describe('getFromStorage', () => {
    it('should pass without error', async () => {
      const [client, _ignored, secretGiver, _] = createClient();

      secretGiver.getSecret.withArgs({ id: '1' }).returns(ok([1, 2, 3]));

      const result = client.getFromStorage({ id: '1' });

      expect(result.isOk()).to.be.true;
      expect(result._unsafeUnwrap()).to.be.deep.equal([1, 2, 3]);
    });

    it('should fail if secret not found', async () => {
      const [client, _ignored, secretGiver, _] = createClient();

      secretGiver.getSecret.withArgs({ id: '1' }).returns(err({ message: 'error' }));

      const result = client.getFromStorage({ id: '1' });

      expect(result.isErr()).to.be.true;
      expect(result._unsafeUnwrapErr().message).to.be.equal('error');
    });
  });

  describe('createNewSecret', () => {
    it('should pass without error', async () => {
      const [client, _ignored, secretGiver, _] = createClient();

      const workerGroup = sinon.createStubInstance(WorkerGroup);

      secretGiver.initialize_session.returns({ id: '1' });

      const result = client.createNewSecret(workerGroup);

      expect(result.secretId).to.be.deep.equal({ id: '1' });
      expect(result.workers).to.be.equal(workerGroup);
    });
  });

  describe('getSecretMetadata', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('getSecretMetadata')
        .withExactArgs(fluenceClient, { id: '1' }, sinon.match.any, sinon.match.any)
        .once()
        .returns(
          Promise.resolve([
            {
              workerId: { id: '1' },
              value: {
                value: { owner: { id: '1' }, expiredAt: 0, isAnyoneCanUse: true },
                error: NO_ERROR,
              },
            },
          ]),
        );

      const result = await client.getSecretMetadata({ id: '1' }, [WORKER_1]);

      expect(result.isOk()).to.be.true;
      expect(result._unsafeUnwrap().get('1')?.expiredAt).to.be.equal(0);
      expect(result._unsafeUnwrap().get('1')?.isAnyoneCanUse).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('getAllAvailableSecrets', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('getAllAvailableSecrets')
        .withExactArgs(fluenceClient, [workerMapperToMarine(WORKER_1)], sinon.match.any)
        .once()
        .returns(
          Promise.resolve([
            {
              workerId: { id: '1' },
              value: {
                value: [{ secretId: { id: '1' } }, { secretId: { id: '2' } }],
                error: NO_ERROR,
              },
            },
          ]),
        );

      const result = await client.getAvailableForUseSecrets([WORKER_1]);

      expect(result.isOk()).to.be.true;
      expect(result._unsafeUnwrap().get('1')).to.be.deep.equal([
        { secretId: { id: '1' } },
        { secretId: { id: '2' } },
      ]);

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('getAllOwnableSecrets', () => {
    it('should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('getAllOwnableSecrets')
        .withExactArgs(fluenceClient, [workerMapperToMarine(WORKER_1)], sinon.match.any)
        .once()
        .returns(
          Promise.resolve([
            {
              workerId: { id: '1' },
              value: {
                value: [{ secretId: { id: '1' } }, { secretId: { id: '2' } }],
                error: NO_ERROR,
              },
            },
          ]),
        );

      const result = await client.getOwnableSecrets([WORKER_1]);

      expect(result.isOk()).to.be.true;
      expect(result._unsafeUnwrap().get('1')).to.be.deep.equal([
        { secretId: { id: '1' } },
        { secretId: { id: '2' } },
      ]);

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });

  describe('roles', () => {
    it('permitRole should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('permitRole')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          { id: 'user' },
          'admin',
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(Promise.resolve([{ workerId: '1', error: NO_ERROR }]));

      const result = await client.permitRole({ id: '1' }, { id: 'user' }, 'admin', [WORKER_1]);

      expect(result.isOk()).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('revokeRole should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('revokeRole')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          { id: 'user' },
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(Promise.resolve([{ workerId: '1', error: NO_ERROR }]));

      const result = await client.revokeRole({ id: '1' }, { id: 'user' }, [WORKER_1]);

      expect(result.isOk()).to.be.true;

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });

    it('getUserRole should pass without error', async () => {
      const [client, fluenceClient, _, aquaWrapper] = createClient();

      let aquaWrapperMock = sinon.mock(aquaWrapper);
      aquaWrapperMock
        .expects('getUserRole')
        .withExactArgs(
          fluenceClient,
          { id: '1' },
          { id: 'user' },
          [workerMapperToMarine(WORKER_1)],
          sinon.match.any,
        )
        .once()
        .returns(
          Promise.resolve([
            {
              workerId: { id: '1' },
              value: { value: 'owner', error: NO_ERROR },
            },
          ]),
        );

      const result = await client.getUserRole({ id: '1' }, { id: 'user' }, [WORKER_1]);

      expect(result.isOk()).to.be.true;
      expect(result._unsafeUnwrap().get('1')).to.be.equal('owner');

      aquaWrapperMock.verify();
      aquaWrapperMock.restore();
    });
  });
});
