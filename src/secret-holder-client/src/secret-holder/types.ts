import { Id } from '../types/types.js';

export interface SecretId {
  secretId: Id;
}

export interface SessionId {
  sessionId: Id;
}

export interface SecretMetadata {
  expiredAt: number;
  isAnyoneCanUse: boolean;
}

export type Role = 'owner' | 'user' | 'unknown';
