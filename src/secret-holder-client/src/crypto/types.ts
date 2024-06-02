import { Key } from '../types/types.js';

export interface EncryptResult {
  ciphertext: number[];
  nonce: number[];
}

export interface DecryptResult {
  ciphertext: number[];
}

export type DeployDalekResult = string;

export interface GenerateKeysResult {
  private_key: Key;
  public_key: Key;
}
