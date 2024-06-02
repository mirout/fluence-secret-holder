import { expect } from 'chai';
import { SecretGiver } from '../src/secret_giver.js';

describe('Secret giver', () => {
  it('happy path', async () => {
    const secretGiver = new SecretGiver();

    const giverSessionId = secretGiver.initialize_session();

    const receiverSessionId = secretGiver.initialize_session();
    const receiverPublicKey = secretGiver.generate_keys(receiverSessionId);

    expect(receiverPublicKey.error.is_ok).to.be.true;
    expect(receiverPublicKey.value.public_key.key).to.not.be.empty;

    const secret = [1, 2, 3, 4, 5];
    secretGiver.setSecret(giverSessionId, secret);

    const encryptedSecret = secretGiver.get_encrypted_secret(
      giverSessionId,
      receiverPublicKey.value.public_key,
    );

    expect(encryptedSecret.error.is_ok).to.be.true;
    expect(encryptedSecret.value.secret).to.not.be.empty;
    expect(encryptedSecret.value.nonce).to.not.be.empty;
    expect(encryptedSecret.value.publicKey.key).to.not.be.empty;

    const decryptedSecret = secretGiver.save_secret(
      receiverSessionId,
      encryptedSecret.value.secret,
      encryptedSecret.value.nonce,
      encryptedSecret.value.publicKey,
    );

    expect(decryptedSecret.error.is_ok).to.be.true;

    const savedSecret = secretGiver.getSecret(receiverSessionId);

    expect(savedSecret.isOk()).to.be.true;
    expect(savedSecret._unsafeUnwrap()).to.deep.equal(secret);
  });

  describe('should return error if session not found', () => {
    it('get_encrypted_secret', async () => {
      const secretGiver = new SecretGiver();
      const receiverSessionId = secretGiver.initialize_session();
      const receiverPublicKey = secretGiver.generate_keys(receiverSessionId);

      const encryptedSecret = secretGiver.get_encrypted_secret(
        { id: 'not_found' },
        receiverPublicKey.value.public_key,
      );

      expect(encryptedSecret.error.is_ok).to.be.false;
      expect(encryptedSecret.error.message).to.equal('Session not found');
    });

    it('save_secret', async () => {
      const secretGiver = new SecretGiver();
      const receiverSessionId = secretGiver.initialize_session();
      const receiverPublicKey = secretGiver.generate_keys(receiverSessionId);

      const decryptedSecret = secretGiver.save_secret(
        { id: 'not_found' },
        [1, 2, 3],
        [1, 2, 3],
        receiverPublicKey.value.public_key,
      );

      expect(decryptedSecret.error.is_ok).to.be.false;
      expect(decryptedSecret.error.message).to.equal('Session not found');
    });

    it('getSecret', async () => {
      const secretGiver = new SecretGiver();
      const savedSecret = secretGiver.getSecret({ id: 'not_found' });

      expect(savedSecret.isErr()).to.be.true;
      expect(savedSecret._unsafeUnwrapErr().message).to.contains('Session not found');
    });

    it('setSecret', async () => {
      const secretGiver = new SecretGiver();
      const savedSecret = secretGiver.setSecret({ id: 'not_found' }, [1, 2, 3]);

      expect(savedSecret.isErr()).to.be.true;
      expect(savedSecret._unsafeUnwrapErr().message).to.contains('Session not found');
    });
  });
});
