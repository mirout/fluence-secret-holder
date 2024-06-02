import { ParticleContext } from '@fluencelabs/js-client';

import { SecretGiverServiceDef } from './compiled-aqua/secret_worker/local.js';
import { CryptoUtils } from './crypto/client.js';
import type { AquaResult, Id, Key, MarineError, Error } from './types/types.js';
import { generateRandomId, resultToMarineError } from './utils/utils.js';
import { Result, err, ok } from 'neverthrow';

interface GetSecret {
  secret: number[];
  nonce: number[];
  publicKey: Key;
}

type GetSecretResult = AquaResult<GetSecret>;

interface GenerateResult {
  public_key: Key;
}

interface SaveSecretResult {
  error: MarineError;
}

interface KeyPair {
  public_key: Key;
  private_key: Key;
}

interface Session {
  secret: number[];
  keys: KeyPair;
}

export class SecretGiver implements SecretGiverServiceDef {
  private sessionsStore: Map<string, Session> = new Map<string, Session>();

  public save_secret(
    session_id: Id,
    message: number[],
    nonce: number[],
    sender_public_key: Key,
    _callParams: ParticleContext | undefined = undefined,
  ): SaveSecretResult {
    const session = this.sessionsStore.get(session_id.id);
    if (!session) {
      return { error: { is_ok: false, message: 'Session not found' } };
    }

    return resultToMarineError(
      CryptoUtils.decrypt(message, nonce, session.keys.private_key, sender_public_key).map(
        (res) => {
          session.secret = res.ciphertext;
          return {};
        },
      ),
      {},
    );
  }

  public generate_keys(
    session_id: Id,
    _callParams: ParticleContext | undefined = undefined,
  ): AquaResult<GenerateResult> {
    const keys = CryptoUtils.generateKeys();
    const session = { keys, secret: [] };
    this.sessionsStore.set(session_id.id, session);

    return {
      value: { public_key: keys.public_key },
      error: { is_ok: true, message: '' },
    };
  }

  public get_encrypted_secret(
    session_id: Id,
    receiver_public_key: Key,
    _callParams: ParticleContext | undefined = undefined,
  ): GetSecretResult {
    const session = this.sessionsStore.get(session_id.id);

    if (!session) {
      return {
        error: { is_ok: false, message: 'Session not found' },
        value: { secret: [], nonce: [], publicKey: { key: [] } },
      };
    }
    const secret = session.secret;

    const keys = CryptoUtils.generateKeys();

    const message = CryptoUtils.encrypt(secret, keys.private_key, receiver_public_key).map(
      (res) => {
        return {
          secret: res.ciphertext,
          nonce: res.nonce,
          publicKey: keys.public_key,
        };
      },
    );

    return resultToMarineError(message, {
      secret: [],
      nonce: [],
      publicKey: { key: [] },
    });
  }

  public initialize_session(_callParams: ParticleContext | undefined = undefined): Id {
    const id = generateRandomId();
    this.sessionsStore.set(id.id, {
      secret: [],
      keys: { public_key: { key: [] }, private_key: { key: [] } },
    });
    return id;
  }

  public setSecret(session_id: Id, secret: number[]): Result<void, Error> {
    const session = this.sessionsStore.get(session_id.id);
    if (!session) {
      return err(new Error('Session not found setSecret'));
    }
    session.secret = secret;

    return ok(undefined);
  }

  public getSecret(session_id: Id): Result<number[], Error> {
    const session = this.sessionsStore.get(session_id.id);
    if (!session) {
      return err(new Error('Session not found getSecret'));
    }
    return ok(session.secret);
  }
}
