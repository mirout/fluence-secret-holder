import { Key, Error } from '../types/types.js';
import { Result } from 'neverthrow';
import { DecryptResult, EncryptResult, GenerateKeysResult } from './types.js';
import * as wasm from 'crypto-utils';

export namespace CryptoUtils {
  export function generateKeys(): GenerateKeysResult {
    const result = wasm.generate_random_key();
    const privateKey = Array.from(result.private_key.key);
    const publicKey = Array.from(result.public_key.key);
    result.free();
    return {
      private_key: { key: privateKey },
      public_key: { key: publicKey },
    };
  }

  export function encrypt(
    message: number[],
    privateKey: Key,
    receiverPublicKey: Key,
  ): Result<EncryptResult, Error> {
    const messageUint = new Uint8Array(message);
    const privateKeyWrapper = new wasm.KeyVec(new Uint8Array(privateKey.key));
    const receiverPublicKeyWrapper = new wasm.KeyVec(new Uint8Array(receiverPublicKey.key));

    const res = Result.fromThrowable(
      () => wasm.encrypt_wrapper(messageUint, privateKeyWrapper, receiverPublicKeyWrapper),
      () => ({ message: 'error during encrypting' }),
    );

    return res().map((result) => ({
      ciphertext: Array.from(result.ciphertext),
      nonce: Array.from(result.nonce),
    }));
  }

  export function decrypt(
    message: number[],
    nonce: number[],
    privateKey: Key,
    senderPublicKey: Key,
  ): Result<DecryptResult, Error> {
    const messageUint = new Uint8Array(message);
    const nonceUint = new Uint8Array(nonce);

    const privateKeyWrapper = new wasm.KeyVec(new Uint8Array(privateKey.key));
    const senderPublicKeyWrapper = new wasm.KeyVec(new Uint8Array(senderPublicKey.key));

    const res = Result.fromThrowable(
      () => wasm.decrypt_wrapper(messageUint, nonceUint, privateKeyWrapper, senderPublicKeyWrapper),
      () => ({ message: 'error during decrypting' }),
    )();

    return res.map((result) => {
      const wrappedResult = {
        ciphertext: Array.from(result.ciphertext),
      };
      result.free();
      return wrappedResult;
    });
  }
}
