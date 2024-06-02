import { expect } from 'chai';
import relays from './relays.json' assert { type: 'json' };
import { ClientPeer, KeyPair, createClient } from '@fluencelabs/js-client';
import {
  GetSecretUser1ResultType,
  getAndUseSecretUser2,
  getIntegrationTestsDeal,
  getSecretUser1,
  getSecretUser2,
  initializeSecretHolderAll,
} from './compiled-aqua/main.ts';
import {
  WorkerClient,
  WorkerGroup,
  SecretHolderClient,
  UncheckedSecret,
  Secret,
} from 'fluence-secret-holder-client';

const getRandomKeyPair = async () =>
  await KeyPair.randomEd25519().then((keyPair) => keyPair.toEd25519PrivateKey());

const RANDOM_PRIVATE_KEY_1 = await getRandomKeyPair();
const RANDOM_PRIVATE_KEY_2 = await getRandomKeyPair();

let client1: ClientPeer;
let client2: ClientPeer;
let dealId: string;
let secretHolderClient1: SecretHolderClient;
let secretHolderClient2: SecretHolderClient;

before(async () => {
  client1 = await createClient(relays[0], {
    keyPair: {
      type: 'Ed25519',
      source: RANDOM_PRIVATE_KEY_1,
    },
  });
  secretHolderClient1 = SecretHolderClient.deploy(client1);

  client2 = await createClient(relays[0], {
    keyPair: {
      type: 'Ed25519',
      source: RANDOM_PRIVATE_KEY_2,
    },
  });
  secretHolderClient2 = SecretHolderClient.deploy(client2);

  dealId = await getIntegrationTestsDeal(client1);
  await initializeSecretHolderAll(client1);
});

after(async () => {
  await Promise.all([client1.disconnect(), client2.disconnect()]);
});

describe('Connection', () => {
  async function getWorkers(client: ClientPeer) {
    const workerClient = new WorkerClient(client);
    const worker = await workerClient.resolveDeal({ id: dealId });
    expect(worker.isOk()).to.be.true;
    expect(worker._unsafeUnwrap().size).to.be.greaterThan(0);
    const workerGroup = new WorkerGroup(worker._unsafeUnwrap(), workerClient);

    return { workerGroup, workerClient };
  }

  async function sendSecret(holder: SecretHolderClient, workers: WorkerGroup, secretValue: string) {
    const newSecret = holder.createNewSecret(workers);
    const encodedSecret = new TextEncoder().encode(secretValue);

    newSecret.setSecret(encodedSecret);
    const savedSecretResult = await newSecret.sendSecret();

    expect(savedSecretResult.isOk()).to.be.true;

    return savedSecretResult._unsafeUnwrap();
  }

  async function deleteSecret(secret: Secret) {
    const deleteResult = await secret.deleteSecret();
    expect(deleteResult.isOk()).to.be.true;
  }

  async function successGetSecretFromUserService(
    client: ClientPeer,
    secretId: string,
    service: number,
  ) {
    let secret: GetSecretUser1ResultType;
    switch (service) {
      case 1:
        secret = await getSecretUser1(client, secretId);
        break;
      case 2:
        secret = await getSecretUser2(client, secretId);
        break;
      default:
        throw new Error('Unknown service');
    }

    secret[0].forEach((secretPrepare) => expect(secretPrepare.error.is_ok).to.be.true);
    secret[1].forEach((secretPrepare) => expect(secretPrepare.is_ok).to.be.true);

    expect(secret[0][0].error.is_ok).to.be.true;
    expect(secret[1][0].is_ok).to.be.true;

    const values = secret[0]
      .map((secretPrepare) => new Uint8Array(secretPrepare.value.secret))
      .map((value) => new TextDecoder().decode(value));

    return values;
  }

  it('should save secret and available to download it', async () => {
    const { workerGroup } = await getWorkers(client1);

    const secretString = 'super secret value';
    const savedSecret = await sendSecret(secretHolderClient1, workerGroup, secretString);

    const savedSecretValue = await savedSecret.getSecret();

    expect(savedSecretValue.isOk()).to.be.true;

    savedSecretValue._unsafeUnwrap().forEach((value) => {
      expect(new TextDecoder().decode(value)).to.be.equal(secretString);
    });

    await deleteSecret(savedSecret);
  }).timeout(60000);

  it('should save secret, initialize and success download from all services', async () => {
    const { workerGroup } = await getWorkers(client1);

    const secretString = 'This is a secret message';
    const savedSecret = await sendSecret(secretHolderClient1, workerGroup, secretString);

    const availableServices = await savedSecret.getAvailableUserServices();
    expect(availableServices.isOk()).to.be.true;
    expect(availableServices._unsafeUnwrap().length).to.be.equal(2);

    await savedSecret.initializeSecret(availableServices._unsafeUnwrap());

    const downloadedSecret1 = await successGetSecretFromUserService(
      client1,
      savedSecret.secretId.id,
      1,
    );
    downloadedSecret1.forEach((secret) => expect(secret).to.be.equal(secretString));

    const downloadedSecret2 = await successGetSecretFromUserService(
      client1,
      savedSecret.secretId.id,
      2,
    );
    downloadedSecret2.forEach((secret) => expect(secret).to.be.equal(secretString));

    await deleteSecret(savedSecret);
  }).timeout(60000);

  it('should save secret, initialize and success download from first service', async () => {
    const { workerGroup } = await getWorkers(client1);

    const secretString = 'This is a secret message';
    const savedSecret = await sendSecret(secretHolderClient1, workerGroup, secretString);

    const availableServices = await savedSecret.getAvailableUserServices();
    expect(availableServices.isOk()).to.be.true;
    expect(availableServices._unsafeUnwrap().length).to.be.equal(2);

    await savedSecret.initializeSecret(['secret-user']);

    const downloadedSecret = await successGetSecretFromUserService(
      client1,
      savedSecret.secretId.id,
      1,
    );
    downloadedSecret.forEach((secret) => expect(secret).to.be.equal(secretString));

    const userServiceGet2 = await getSecretUser2(client1, savedSecret.secretId.id);

    expect(userServiceGet2[0][0].error.is_ok).to.be.false;
    expect(userServiceGet2[1][0].is_ok).to.be.true;

    await deleteSecret(savedSecret);
  }).timeout(60000);

  it('should save secret and fail to download from second service', async () => {
    const workers1 = await getWorkers(client1);
    const workers2 = await getWorkers(client2);

    const secret = 'This is a secret message';
    const savedSecret = await sendSecret(secretHolderClient1, workers1.workerGroup, secret);

    const unchecked = new UncheckedSecret(
      savedSecret.secretId,
      workers2.workerGroup,
      secretHolderClient2,
    );

    const verify = await unchecked.verifySecret();
    expect(verify.isOk()).to.be.false;

    await deleteSecret(savedSecret);
  }).timeout(60000);

  it('should save secret, delete it and try get', async () => {
    const { workerGroup } = await getWorkers(client1);

    const secretString = 'This is a secret message';
    const savedSecret = await sendSecret(secretHolderClient1, workerGroup, secretString);

    await deleteSecret(savedSecret);

    const unchecked = new UncheckedSecret(savedSecret.secretId, workerGroup, secretHolderClient1);
    const verify = await unchecked.verifySecret();

    expect(verify.isOk()).to.be.false;
  }).timeout(60000);

  it('should save secret, initialize and success get and use from second service', async () => {
    const { workerGroup } = await getWorkers(client1);

    const secretString = 'This is a secret message';
    const savedSecret = await sendSecret(secretHolderClient1, workerGroup, secretString);

    const availableServices = await savedSecret.getAvailableUserServices();
    expect(availableServices.isOk()).to.be.true;

    await savedSecret.initializeSecret(availableServices._unsafeUnwrap());

    const downloadedSecret = await getAndUseSecretUser2(
      client1,
      savedSecret.secretId.id,
      [0, 1, 2],
    );

    downloadedSecret[1].forEach(
      (prepareSecretResult) => expect(prepareSecretResult.is_ok).to.be.true,
    );
    downloadedSecret[0].forEach((secret) => {
      expect(secret.error.is_ok).to.be.true;
      const encodedSecret = Array.from(new TextEncoder().encode(secretString));
      encodedSecret.push(0, 1, 2);
      expect(secret.value.result).to.be.deep.equal(encodedSecret);
    });
  }).timeout(60000);

  it('should save secret, permit role to second user and success get, after that revoke role', async () => {
    const { workerGroup } = await getWorkers(client1);

    const secretString =
      'This is a secret message that should be available only for the second user';
    const savedSecret = await sendSecret(secretHolderClient1, workerGroup, secretString);

    const peerId = await client2.getPeerId();
    const permitResult = await savedSecret.permitRole({id: peerId}, 'owner');
    expect(permitResult.isOk()).to.be.true;

    const role = await savedSecret.getUserRole({id: peerId});
    expect(role.isOk()).to.be.true;
    role._unsafeUnwrap().forEach((role) => {
      expect(role).to.be.equal('owner');
    });

    const { workerGroup: workerGroup2 } = await getWorkers(client2);
    const unchecked = secretHolderClient2.getSecretFromHolder(savedSecret.secretId, workerGroup2);
    const verify = await unchecked.verifySecret();
    expect(verify.isOk()).to.be.true;

    const secret = await verify._unsafeUnwrap().getSecret();
    expect(secret.isOk()).to.be.true;
    
    secret._unsafeUnwrap().forEach((value) => {
      expect(new TextDecoder().decode(value)).to.be.equal(secretString);
    });

    const revokeResult = await savedSecret.revokeRole({id: peerId});
    expect(revokeResult.isOk()).to.be.true;

    const roleAfterRevoke = await savedSecret.getUserRole({id: peerId});
    expect(roleAfterRevoke.isOk()).to.be.true;
    roleAfterRevoke._unsafeUnwrap().forEach((role) => {
      expect(role).to.be.equal('unknown');
    });

    await deleteSecret(savedSecret);
  }).timeout(60000);
});
