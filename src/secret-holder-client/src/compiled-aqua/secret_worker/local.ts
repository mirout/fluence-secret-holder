/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.13.0
 * @fluencelabs/aqua-to-js version: 0.3.13
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, ParticleContext as ParticleContext$$ } from '@fluencelabs/js-client';

// Making aliases to reduce chance of accidental name collision
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$
} from '@fluencelabs/js-client';

// Services
export interface SecretGiverServiceDef {
    generate_keys: (session_id: { id: string; }, callParams: ParticleContext$$) => { error: { is_ok: boolean; message: string; }; value: { public_key: { key: number[]; }; }; } | Promise<{ error: { is_ok: boolean; message: string; }; value: { public_key: { key: number[]; }; }; }>;
    get_encrypted_secret: (session_id: { id: string; }, reciever_public_key: { key: number[]; }, callParams: ParticleContext$$) => { error: { is_ok: boolean; message: string; }; value: { nonce: number[]; publicKey: { key: number[]; }; secret: number[]; }; } | Promise<{ error: { is_ok: boolean; message: string; }; value: { nonce: number[]; publicKey: { key: number[]; }; secret: number[]; }; }>;
    initialize_session: (callParams: ParticleContext$$) => { id: string; } | Promise<{ id: string; }>;
    save_secret: (session_id: { id: string; }, message: number[], nonce: number[], sender_public_key: { key: number[]; }, callParams: ParticleContext$$) => { error: { is_ok: boolean; message: string; }; } | Promise<{ error: { is_ok: boolean; message: string; }; }>;
}
export function registerSecretGiverService(service: SecretGiverServiceDef): void;
export function registerSecretGiverService(serviceId: string, service: SecretGiverServiceDef): void;
export function registerSecretGiverService(peer: IFluenceClient$$, service: SecretGiverServiceDef): void;
export function registerSecretGiverService(peer: IFluenceClient$$, serviceId: string, service: SecretGiverServiceDef): void;
export function registerSecretGiverService(...args: any[]) {
    registerService$$(
        args,
        {
    "defaultServiceId": "secret_giver",
    "functions": {
        "fields": {
            "generate_keys": {
                "domain": {
                    "fields": {
                        "session_id": {
                            "name": "Id",
                            "fields": {
                                "id": {
                                    "name": "string",
                                    "tag": "scalar"
                                }
                            },
                            "tag": "struct"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "GenerateKeysResult",
                            "fields": {
                                "error": {
                                    "name": "Error",
                                    "fields": {
                                        "is_ok": {
                                            "name": "bool",
                                            "tag": "scalar"
                                        },
                                        "message": {
                                            "name": "string",
                                            "tag": "scalar"
                                        }
                                    },
                                    "tag": "struct"
                                },
                                "value": {
                                    "name": "PublicKey",
                                    "fields": {
                                        "public_key": {
                                            "name": "KeyVec",
                                            "fields": {
                                                "key": {
                                                    "type": {
                                                        "name": "u8",
                                                        "tag": "scalar"
                                                    },
                                                    "tag": "array"
                                                }
                                            },
                                            "tag": "struct"
                                        }
                                    },
                                    "tag": "struct"
                                }
                            },
                            "tag": "struct"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            },
            "get_encrypted_secret": {
                "domain": {
                    "fields": {
                        "session_id": {
                            "name": "Id",
                            "fields": {
                                "id": {
                                    "name": "string",
                                    "tag": "scalar"
                                }
                            },
                            "tag": "struct"
                        },
                        "reciever_public_key": {
                            "name": "KeyVec",
                            "fields": {
                                "key": {
                                    "type": {
                                        "name": "u8",
                                        "tag": "scalar"
                                    },
                                    "tag": "array"
                                }
                            },
                            "tag": "struct"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "GetSecretResult",
                            "fields": {
                                "error": {
                                    "name": "Error",
                                    "fields": {
                                        "is_ok": {
                                            "name": "bool",
                                            "tag": "scalar"
                                        },
                                        "message": {
                                            "name": "string",
                                            "tag": "scalar"
                                        }
                                    },
                                    "tag": "struct"
                                },
                                "value": {
                                    "name": "SecretData",
                                    "fields": {
                                        "nonce": {
                                            "type": {
                                                "name": "u8",
                                                "tag": "scalar"
                                            },
                                            "tag": "array"
                                        },
                                        "publicKey": {
                                            "name": "KeyVec",
                                            "fields": {
                                                "key": {
                                                    "type": {
                                                        "name": "u8",
                                                        "tag": "scalar"
                                                    },
                                                    "tag": "array"
                                                }
                                            },
                                            "tag": "struct"
                                        },
                                        "secret": {
                                            "type": {
                                                "name": "u8",
                                                "tag": "scalar"
                                            },
                                            "tag": "array"
                                        }
                                    },
                                    "tag": "struct"
                                }
                            },
                            "tag": "struct"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            },
            "initialize_session": {
                "domain": {
                    "tag": "nil"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "Id",
                            "fields": {
                                "id": {
                                    "name": "string",
                                    "tag": "scalar"
                                }
                            },
                            "tag": "struct"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            },
            "save_secret": {
                "domain": {
                    "fields": {
                        "session_id": {
                            "name": "Id",
                            "fields": {
                                "id": {
                                    "name": "string",
                                    "tag": "scalar"
                                }
                            },
                            "tag": "struct"
                        },
                        "message": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        },
                        "nonce": {
                            "type": {
                                "name": "u8",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        },
                        "sender_public_key": {
                            "name": "KeyVec",
                            "fields": {
                                "key": {
                                    "type": {
                                        "name": "u8",
                                        "tag": "scalar"
                                    },
                                    "tag": "array"
                                }
                            },
                            "tag": "struct"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "SaveSecretResult",
                            "fields": {
                                "error": {
                                    "name": "Error",
                                    "fields": {
                                        "is_ok": {
                                            "name": "bool",
                                            "tag": "scalar"
                                        },
                                        "message": {
                                            "name": "string",
                                            "tag": "scalar"
                                        }
                                    },
                                    "tag": "struct"
                                }
                            },
                            "tag": "struct"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            }
        },
        "tag": "labeledProduct"
    }
}
    );
}


