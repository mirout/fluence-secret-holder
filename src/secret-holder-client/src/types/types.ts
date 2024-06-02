export interface Relay {
  readonly multiaddr: string;
  readonly peerId: string;
}

export interface Key {
  readonly key: number[];
}

export interface Error {
  readonly message: string;
}

export interface MarineError {
  readonly is_ok: boolean;
  readonly message: string;
}

export interface Id {
  readonly id: string;
}

export interface AquaResult<T> {
  readonly value: T;
  readonly error: MarineError;
}
