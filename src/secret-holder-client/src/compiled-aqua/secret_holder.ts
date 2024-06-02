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


// Functions
export const permitRole_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
         )
         (call %init_peer_id% ("getDataSrv" "userId") [] -userId-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "role") [] -role-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "permit_role") [-secretId-arg-.$.id -userId-arg-.$.id -role-arg-] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerError_obj_map
                (seq
                 (seq
                  (ap ("error" ret) %WorkerError_obj_map)
                  (ap ("workerId" Id_obj) %WorkerError_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                )
               )
              )
              (ap WorkerError_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (new %Error_obj_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj_map)
                   (ap ("message" :error:.$.message) %Error_obj_map)
                  )
                  (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerError_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj) %WorkerError_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj-0_map  WorkerError_obj-0)
                )
               )
              )
              (ap WorkerError_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-11)
    )
    (ap #-result-fix-11 -result-flat-11)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-11])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type PermitRoleArgSecretId = { id: string; }
export type PermitRoleArgUserId = { id: string; }

export type PermitRoleParams = [secretId: PermitRoleArgSecretId, userId: PermitRoleArgUserId, role: string, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: PermitRoleArgSecretId, userId: PermitRoleArgUserId, role: string, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type PermitRoleResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function permitRole(...args: PermitRoleParams): PermitRoleResult {
    return callFunction$$(
        args,
        {
    "functionName": "permitRole",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "userId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "role": {
                    "name": "string",
                    "tag": "scalar"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        permitRole_script
    );
}

export const deleteSecret_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "delete_secret") [-secretId-arg-.$.id] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerError_obj_map
                (seq
                 (seq
                  (ap ("error" ret) %WorkerError_obj_map)
                  (ap ("workerId" Id_obj) %WorkerError_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                )
               )
              )
              (ap WorkerError_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (new %Error_obj_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj_map)
                   (ap ("message" :error:.$.message) %Error_obj_map)
                  )
                  (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerError_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj) %WorkerError_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj-0_map  WorkerError_obj-0)
                )
               )
              )
              (ap WorkerError_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-1)
    )
    (ap #-result-fix-1 -result-flat-1)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type DeleteSecretArgSecretId = { id: string; }

export type DeleteSecretParams = [secretId: DeleteSecretArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: DeleteSecretArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type DeleteSecretResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function deleteSecret(...args: DeleteSecretParams): DeleteSecretResult {
    return callFunction$$(
        args,
        {
    "functionName": "deleteSecret",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        deleteSecret_script
    );
}

export const initializeSecretHolder_script = `
(xor
 (new $res
  (seq
   (seq
    (seq
     (seq
      (seq
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (new -if-else-error-
         (new -else-error-
          (new -if-error-
           (xor
            (mismatch w-0.$.worker_id []
             (xor
              (seq
               (seq
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (new $-hop-
                      (new #-hopc-
                       (canon -relay- $-hop-  #-hopc-)
                      )
                     )
                     (new $-hop-
                      (new #-hopc-
                       (canon w-0.$.host_id $-hop-  #-hopc-)
                      )
                     )
                    )
                    (call w-0.$.worker_id.[0] ("secret-holder" "initialize") [] ret)
                   )
                   (new %Id_obj_map
                    (seq
                     (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                     (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                    )
                   )
                  )
                  (new %WorkerError_obj_map
                   (seq
                    (seq
                     (ap ("error" ret) %WorkerError_obj_map)
                     (ap ("workerId" Id_obj) %WorkerError_obj_map)
                    )
                    (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                   )
                  )
                 )
                 (ap WorkerError_obj $res)
                )
                (new $-hop-
                 (new #-hopc-
                  (canon w-0.$.host_id $-hop-  #-hopc-)
                 )
                )
               )
               (new $-hop-
                (new #-hopc-
                 (canon -relay- $-hop-  #-hopc-)
                )
               )
              )
              (seq
               (seq
                (seq
                 (new $-hop-
                  (new #-hopc-
                   (canon w-0.$.host_id $-hop-  #-hopc-)
                  )
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon -relay- $-hop-  #-hopc-)
                  )
                 )
                )
                (new $-hop-
                 (new #-hopc-
                  (canon %init_peer_id% $-hop-  #-hopc-)
                 )
                )
               )
               (fail :error:)
              )
             )
            )
            (seq
             (ap :error: -if-error-)
             (xor
              (match :error:.$.error_code 10002
               (seq
                (seq
                 (seq
                  (new %Error_obj_map
                   (seq
                    (seq
                     (ap ("is_ok" false) %Error_obj_map)
                     (ap ("message" "Worker id is nil") %Error_obj_map)
                    )
                    (canon %init_peer_id% %Error_obj_map  Error_obj)
                   )
                  )
                  (new %Id_obj-0_map
                   (seq
                    (ap ("id" "") %Id_obj-0_map)
                    (canon %init_peer_id% %Id_obj-0_map  Id_obj-0)
                   )
                  )
                 )
                 (new %WorkerError_obj-0_map
                  (seq
                   (seq
                    (ap ("error" Error_obj) %WorkerError_obj-0_map)
                    (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                   )
                   (canon %init_peer_id% %WorkerError_obj-0_map  WorkerError_obj-0)
                  )
                 )
                )
                (ap WorkerError_obj-0 $res)
               )
              )
              (seq
               (seq
                (ap :error: -else-error-)
                (xor
                 (match :error:.$.error_code 10001
                  (ap -if-error- -if-else-error-)
                 )
                 (ap -else-error- -if-else-error-)
                )
               )
               (fail -if-else-error-)
              )
             )
            )
           )
          )
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $res  #-res-fix-0)
    )
    (ap #-res-fix-0 -res-flat-0)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-res-flat-0])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type InitializeSecretHolderParams = [workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type InitializeSecretHolderResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function initializeSecretHolder(...args: InitializeSecretHolderParams): InitializeSecretHolderResult {
    return callFunction$$(
        args,
        {
    "functionName": "initializeSecretHolder",
    "arrow": {
        "domain": {
            "fields": {
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        initializeSecretHolder_script
    );
}

export const changeSecretVisibility_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
         (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "visibility") [] -visibility-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "change_visibility") [-secretId-arg-.$.id -visibility-arg-] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerError_obj_map
                (seq
                 (seq
                  (ap ("error" ret) %WorkerError_obj_map)
                  (ap ("workerId" Id_obj) %WorkerError_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                )
               )
              )
              (ap WorkerError_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (new %Error_obj_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj_map)
                   (ap ("message" :error:.$.message) %Error_obj_map)
                  )
                  (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerError_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj) %WorkerError_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj-0_map  WorkerError_obj-0)
                )
               )
              )
              (ap WorkerError_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-6)
    )
    (ap #-result-fix-6 -result-flat-6)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-6])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type ChangeSecretVisibilityArgSecretId = { id: string; }

export type ChangeSecretVisibilityParams = [secretId: ChangeSecretVisibilityArgSecretId, visibility: boolean, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: ChangeSecretVisibilityArgSecretId, visibility: boolean, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type ChangeSecretVisibilityResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function changeSecretVisibility(...args: ChangeSecretVisibilityParams): ChangeSecretVisibilityResult {
    return callFunction$$(
        args,
        {
    "functionName": "changeSecretVisibility",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "visibility": {
                    "name": "bool",
                    "tag": "scalar"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        changeSecretVisibility_script
    );
}

export const updateSecretExpiration_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
         (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "expiredAt") [] -expiredAt-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "update_expiration") [-secretId-arg-.$.id -expiredAt-arg-] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerError_obj_map
                (seq
                 (seq
                  (ap ("error" ret) %WorkerError_obj_map)
                  (ap ("workerId" Id_obj) %WorkerError_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                )
               )
              )
              (ap WorkerError_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (new %Error_obj_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj_map)
                   (ap ("message" :error:.$.message) %Error_obj_map)
                  )
                  (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerError_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj) %WorkerError_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj-0_map  WorkerError_obj-0)
                )
               )
              )
              (ap WorkerError_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-7)
    )
    (ap #-result-fix-7 -result-flat-7)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-7])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type UpdateSecretExpirationArgSecretId = { id: string; }

export type UpdateSecretExpirationParams = [secretId: UpdateSecretExpirationArgSecretId, expiredAt: number, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: UpdateSecretExpirationArgSecretId, expiredAt: number, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type UpdateSecretExpirationResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function updateSecretExpiration(...args: UpdateSecretExpirationParams): UpdateSecretExpirationResult {
    return callFunction$$(
        args,
        {
    "functionName": "updateSecretExpiration",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "expiredAt": {
                    "name": "u64",
                    "tag": "scalar"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        updateSecretExpiration_script
    );
}

export const getSecretMetadata_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "get_secret_metadata") [-secretId-arg-.$.id] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerSecretMetadata_obj_map
                (seq
                 (seq
                  (ap ("value" ret) %WorkerSecretMetadata_obj_map)
                  (ap ("workerId" Id_obj) %WorkerSecretMetadata_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerSecretMetadata_obj_map  WorkerSecretMetadata_obj)
                )
               )
              )
              (ap WorkerSecretMetadata_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (seq
                  (new %Error_obj_map
                   (seq
                    (seq
                     (ap ("is_ok" false) %Error_obj_map)
                     (ap ("message" :error:.$.message) %Error_obj_map)
                    )
                    (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                   )
                  )
                  (new %SecretMetadata_obj_map
                   (seq
                    (seq
                     (seq
                      (ap ("expired_at" 0) %SecretMetadata_obj_map)
                      (ap ("is_anyone_can_use" false) %SecretMetadata_obj_map)
                     )
                     (ap ("owner" "") %SecretMetadata_obj_map)
                    )
                    (canon w-0.$.worker_id.[0] %SecretMetadata_obj_map  SecretMetadata_obj)
                   )
                  )
                 )
                 (new %SecretMetadataResult_obj_map
                  (seq
                   (seq
                    (ap ("error" Error_obj) %SecretMetadataResult_obj_map)
                    (ap ("value" SecretMetadata_obj) %SecretMetadataResult_obj_map)
                   )
                   (canon w-0.$.worker_id.[0] %SecretMetadataResult_obj_map  SecretMetadataResult_obj)
                  )
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerSecretMetadata_obj-0_map
                (seq
                 (seq
                  (ap ("value" SecretMetadataResult_obj) %WorkerSecretMetadata_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerSecretMetadata_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerSecretMetadata_obj-0_map  WorkerSecretMetadata_obj-0)
                )
               )
              )
              (ap WorkerSecretMetadata_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-10)
    )
    (ap #-result-fix-10 -result-flat-10)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-10])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetSecretMetadataArgSecretId = { id: string; }

export type GetSecretMetadataParams = [secretId: GetSecretMetadataArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: GetSecretMetadataArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type GetSecretMetadataResult = Promise<{ value: { error: { is_ok: boolean; message: string; }; value: { expired_at: number; is_anyone_can_use: boolean; }; }; workerId: { id: string; }; }[]>;

export function getSecretMetadata(...args: GetSecretMetadataParams): GetSecretMetadataResult {
    return callFunction$$(
        args,
        {
    "functionName": "getSecretMetadata",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerSecretMetadata",
                        "fields": {
                            "value": {
                                "name": "SecretMetadataResult",
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
                                        "name": "SecretMetadata",
                                        "fields": {
                                            "expired_at": {
                                                "name": "u64",
                                                "tag": "scalar"
                                            },
                                            "is_anyone_can_use": {
                                                "name": "bool",
                                                "tag": "scalar"
                                            }
                                        },
                                        "tag": "struct"
                                    }
                                },
                                "tag": "struct"
                            },
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        getSecretMetadata_script
    );
}

export const getOwnableSecrets_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "get_all_ownable_secrets") [] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %GetAvailableSecretsResult_obj_map
                (seq
                 (seq
                  (ap ("value" ret) %GetAvailableSecretsResult_obj_map)
                  (ap ("workerId" Id_obj) %GetAvailableSecretsResult_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %GetAvailableSecretsResult_obj_map  GetAvailableSecretsResult_obj)
                )
               )
              )
              (ap GetAvailableSecretsResult_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (seq
                  (new %Error_obj_map
                   (seq
                    (seq
                     (ap ("is_ok" false) %Error_obj_map)
                     (ap ("message" :error:.$.message) %Error_obj_map)
                    )
                    (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                   )
                  )
                  (new %GetAllAvailableSecrets_obj_map
                   (seq
                    (ap ("secret_ids" []) %GetAllAvailableSecrets_obj_map)
                    (canon w-0.$.worker_id.[0] %GetAllAvailableSecrets_obj_map  GetAllAvailableSecrets_obj)
                   )
                  )
                 )
                 (new %GetAllAvailableSecretsResult_obj_map
                  (seq
                   (seq
                    (ap ("error" Error_obj) %GetAllAvailableSecretsResult_obj_map)
                    (ap ("value" GetAllAvailableSecrets_obj) %GetAllAvailableSecretsResult_obj_map)
                   )
                   (canon w-0.$.worker_id.[0] %GetAllAvailableSecretsResult_obj_map  GetAllAvailableSecretsResult_obj)
                  )
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %GetAvailableSecretsResult_obj-0_map
                (seq
                 (seq
                  (ap ("value" GetAllAvailableSecretsResult_obj) %GetAvailableSecretsResult_obj-0_map)
                  (ap ("workerId" Id_obj-0) %GetAvailableSecretsResult_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %GetAvailableSecretsResult_obj-0_map  GetAvailableSecretsResult_obj-0)
                )
               )
              )
              (ap GetAvailableSecretsResult_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-5)
    )
    (ap #-result-fix-5 -result-flat-5)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-5])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetOwnableSecretsParams = [workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type GetOwnableSecretsResult = Promise<{ value: { error: { is_ok: boolean; message: string; }; value: { secret_ids: string[]; }; }; workerId: { id: string; }; }[]>;

export function getOwnableSecrets(...args: GetOwnableSecretsParams): GetOwnableSecretsResult {
    return callFunction$$(
        args,
        {
    "functionName": "getOwnableSecrets",
    "arrow": {
        "domain": {
            "fields": {
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "GetAvailableSecretsResult",
                        "fields": {
                            "value": {
                                "name": "GetAllAvailableSecretsResult",
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
                                        "name": "GetAllAvailableSecrets",
                                        "fields": {
                                            "secret_ids": {
                                                "type": {
                                                    "name": "string",
                                                    "tag": "scalar"
                                                },
                                                "tag": "array"
                                            }
                                        },
                                        "tag": "struct"
                                    }
                                },
                                "tag": "struct"
                            },
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        getOwnableSecrets_script
    );
}

export const checkIsSecretAvailableForUse_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "is_secret_available_for_use") [-secretId-arg-.$.id] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerError_obj_map
                (seq
                 (seq
                  (ap ("error" ret) %WorkerError_obj_map)
                  (ap ("workerId" Id_obj) %WorkerError_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                )
               )
              )
              (ap WorkerError_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (new %Error_obj_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj_map)
                   (ap ("message" :error:.$.message) %Error_obj_map)
                  )
                  (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerError_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj) %WorkerError_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj-0_map  WorkerError_obj-0)
                )
               )
              )
              (ap WorkerError_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-8)
    )
    (ap #-result-fix-8 -result-flat-8)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-8])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type CheckIsSecretAvailableForUseArgSecretId = { id: string; }

export type CheckIsSecretAvailableForUseParams = [secretId: CheckIsSecretAvailableForUseArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: CheckIsSecretAvailableForUseArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type CheckIsSecretAvailableForUseResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function checkIsSecretAvailableForUse(...args: CheckIsSecretAvailableForUseParams): CheckIsSecretAvailableForUseResult {
    return callFunction$$(
        args,
        {
    "functionName": "checkIsSecretAvailableForUse",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        checkIsSecretAvailableForUse_script
    );
}

export const saveSecretOnWorkers_script = `
(xor
 (new $result-0
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
         )
         (call %init_peer_id% ("getDataSrv" "expiredAt") [] -expiredAt-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
       )
       (par
        (fold -workers-arg- w-0
         (new $result-1
          (par
           (seq
            (seq
             (seq
              (seq
               (xor
                (seq
                 (seq
                  (seq
                   (seq
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (new $-hop-
                          (new #-hopc-
                           (canon -relay- $-hop-  #-hopc-)
                          )
                         )
                         (new $-hop-
                          (new #-hopc-
                           (canon w-0.$.host_id $-hop-  #-hopc-)
                          )
                         )
                        )
                        (call w-0.$.worker_id.[0] ("secret-holder" "start_handshake") [] ret)
                       )
                       (new $-hop-
                        (new #-hopc-
                         (canon w-0.$.host_id $-hop-  #-hopc-)
                        )
                       )
                      )
                      (new $-hop-
                       (new #-hopc-
                        (canon -relay- $-hop-  #-hopc-)
                       )
                      )
                     )
                     (seq
                      (seq
                       (seq
                        (new $-hop-
                         (new #-hopc-
                          (canon w-0.$.host_id $-hop-  #-hopc-)
                         )
                        )
                        (new $-hop-
                         (new #-hopc-
                          (canon -relay- $-hop-  #-hopc-)
                         )
                        )
                       )
                       (new $-hop-
                        (new #-hopc-
                         (canon %init_peer_id% $-hop-  #-hopc-)
                        )
                       )
                      )
                      (fail :error:)
                     )
                    )
                    (par
                     (new %Error_obj_map
                      (seq
                       (seq
                        (ap ("is_ok" true) %Error_obj_map)
                        (ap ("message" "") %Error_obj_map)
                       )
                       (canon %init_peer_id% %Error_obj_map  Error_obj)
                      )
                     )
                     (seq
                      (new %Id_obj_map
                       (seq
                        (ap ("id" "") %Id_obj_map)
                        (canon %init_peer_id% %Id_obj_map  Id_obj)
                       )
                      )
                      (new %SessionMetaData_obj_map
                       (seq
                        (seq
                         (ap ("recieverPublicKey" ret.$.value.public_key) %SessionMetaData_obj_map)
                         (ap ("sessionId" Id_obj) %SessionMetaData_obj_map)
                        )
                        (canon %init_peer_id% %SessionMetaData_obj_map  SessionMetaData_obj)
                       )
                      )
                     )
                    )
                   )
                   (new %PrepareResult_obj_map
                    (seq
                     (seq
                      (ap ("error" Error_obj) %PrepareResult_obj_map)
                      (ap ("value" SessionMetaData_obj) %PrepareResult_obj_map)
                     )
                     (canon %init_peer_id% %PrepareResult_obj_map  PrepareResult_obj)
                    )
                   )
                  )
                  (xor
                   (match PrepareResult_obj.$.error.is_ok true
                    (ap false not)
                   )
                   (ap true not)
                  )
                 )
                 (new -if-else-error-
                  (new -else-error-
                   (new -if-error-
                    (xor
                     (match not true
                      (seq
                       (seq
                        (seq
                         (new %Id_obj-0_map
                          (seq
                           (ap ("id" "") %Id_obj-0_map)
                           (canon %init_peer_id% %Id_obj-0_map  Id_obj-0)
                          )
                         )
                         (new %Save_obj_map
                          (seq
                           (ap ("secretId" Id_obj-0) %Save_obj_map)
                           (canon %init_peer_id% %Save_obj_map  Save_obj)
                          )
                         )
                        )
                        (new %SaveSecretResult_obj_map
                         (seq
                          (seq
                           (ap ("error" PrepareResult_obj.$.error) %SaveSecretResult_obj_map)
                           (ap ("value" Save_obj) %SaveSecretResult_obj_map)
                          )
                          (canon %init_peer_id% %SaveSecretResult_obj_map  SaveSecretResult_obj)
                         )
                        )
                       )
                       (ap SaveSecretResult_obj $result-1)
                      )
                     )
                     (seq
                      (ap :error: -if-error-)
                      (xor
                       (match :error:.$.error_code 10001
                        (seq
                         (seq
                          (call %init_peer_id% ("secret_giver" "get_encrypted_secret") [-secretId-arg- PrepareResult_obj.$.value.recieverPublicKey] ret-0)
                          (xor
                           (match ret-0.$.error.is_ok true
                            (ap false not-0)
                           )
                           (ap true not-0)
                          )
                         )
                         (new -if-else-error-
                          (new -else-error-
                           (new -if-error-
                            (xor
                             (match not-0 true
                              (seq
                               (seq
                                (seq
                                 (new %Id_obj-1_map
                                  (seq
                                   (ap ("id" "") %Id_obj-1_map)
                                   (canon %init_peer_id% %Id_obj-1_map  Id_obj-1)
                                  )
                                 )
                                 (new %Save_obj-0_map
                                  (seq
                                   (ap ("secretId" Id_obj-1) %Save_obj-0_map)
                                   (canon %init_peer_id% %Save_obj-0_map  Save_obj-0)
                                  )
                                 )
                                )
                                (new %SaveSecretResult_obj-0_map
                                 (seq
                                  (seq
                                   (ap ("error" ret-0.$.error) %SaveSecretResult_obj-0_map)
                                   (ap ("value" Save_obj-0) %SaveSecretResult_obj-0_map)
                                  )
                                  (canon %init_peer_id% %SaveSecretResult_obj-0_map  SaveSecretResult_obj-0)
                                 )
                                )
                               )
                               (ap SaveSecretResult_obj-0 $result-1)
                              )
                             )
                             (seq
                              (ap :error: -if-error-)
                              (xor
                               (match :error:.$.error_code 10001
                                (seq
                                 (seq
                                  (seq
                                   (seq
                                    (xor
                                     (seq
                                      (seq
                                       (seq
                                        (seq
                                         (seq
                                          (seq
                                           (new $-hop-
                                            (new #-hopc-
                                             (canon -relay- $-hop-  #-hopc-)
                                            )
                                           )
                                           (new $-hop-
                                            (new #-hopc-
                                             (canon w-0.$.host_id $-hop-  #-hopc-)
                                            )
                                           )
                                          )
                                          (new %CryptoMetadata_obj_map
                                           (seq
                                            (seq
                                             (seq
                                              (ap ("nonce" ret-0.$.value.nonce) %CryptoMetadata_obj_map)
                                              (ap ("other_public_key" ret-0.$.value.publicKey) %CryptoMetadata_obj_map)
                                             )
                                             (ap ("self_public_key" PrepareResult_obj.$.value.recieverPublicKey) %CryptoMetadata_obj_map)
                                            )
                                            (canon w-0.$.worker_id.[0] %CryptoMetadata_obj_map  CryptoMetadata_obj)
                                           )
                                          )
                                         )
                                         (new %SaveSecretRequest_obj_map
                                          (seq
                                           (seq
                                            (seq
                                             (ap ("ciphertext" ret-0.$.value.secret) %SaveSecretRequest_obj_map)
                                             (ap ("expired_at" -expiredAt-arg-) %SaveSecretRequest_obj_map)
                                            )
                                            (ap ("metadata" CryptoMetadata_obj) %SaveSecretRequest_obj_map)
                                           )
                                           (canon w-0.$.worker_id.[0] %SaveSecretRequest_obj_map  SaveSecretRequest_obj)
                                          )
                                         )
                                        )
                                        (call w-0.$.worker_id.[0] ("secret-holder" "save_secret") [SaveSecretRequest_obj] ret-1)
                                       )
                                       (new $-hop-
                                        (new #-hopc-
                                         (canon w-0.$.host_id $-hop-  #-hopc-)
                                        )
                                       )
                                      )
                                      (new $-hop-
                                       (new #-hopc-
                                        (canon -relay- $-hop-  #-hopc-)
                                       )
                                      )
                                     )
                                     (seq
                                      (seq
                                       (seq
                                        (new $-hop-
                                         (new #-hopc-
                                          (canon w-0.$.host_id $-hop-  #-hopc-)
                                         )
                                        )
                                        (new $-hop-
                                         (new #-hopc-
                                          (canon -relay- $-hop-  #-hopc-)
                                         )
                                        )
                                       )
                                       (new $-hop-
                                        (new #-hopc-
                                         (canon %init_peer_id% $-hop-  #-hopc-)
                                        )
                                       )
                                      )
                                      (fail :error:)
                                     )
                                    )
                                    (new %Id_obj-2_map
                                     (seq
                                      (ap ("id" ret-1.$.value.secret_id) %Id_obj-2_map)
                                      (canon %init_peer_id% %Id_obj-2_map  Id_obj-2)
                                     )
                                    )
                                   )
                                   (new %Save_obj-1_map
                                    (seq
                                     (ap ("secretId" Id_obj-2) %Save_obj-1_map)
                                     (canon %init_peer_id% %Save_obj-1_map  Save_obj-1)
                                    )
                                   )
                                  )
                                  (new %SaveSecretResult_obj-1_map
                                   (seq
                                    (seq
                                     (ap ("error" ret-1.$.error) %SaveSecretResult_obj-1_map)
                                     (ap ("value" Save_obj-1) %SaveSecretResult_obj-1_map)
                                    )
                                    (canon %init_peer_id% %SaveSecretResult_obj-1_map  SaveSecretResult_obj-1)
                                   )
                                  )
                                 )
                                 (ap SaveSecretResult_obj-1 $result-1)
                                )
                               )
                               (seq
                                (seq
                                 (ap :error: -else-error-)
                                 (xor
                                  (match :error:.$.error_code 10001
                                   (ap -if-error- -if-else-error-)
                                  )
                                  (ap -else-error- -if-else-error-)
                                 )
                                )
                                (fail -if-else-error-)
                               )
                              )
                             )
                            )
                           )
                          )
                         )
                        )
                       )
                       (seq
                        (seq
                         (ap :error: -else-error-)
                         (xor
                          (match :error:.$.error_code 10001
                           (ap -if-error- -if-else-error-)
                          )
                          (ap -else-error- -if-else-error-)
                         )
                        )
                        (fail -if-else-error-)
                       )
                      )
                     )
                    )
                   )
                  )
                 )
                )
                (seq
                 (seq
                  (seq
                   (seq
                    (new %Error_obj-0_map
                     (seq
                      (seq
                       (ap ("is_ok" false) %Error_obj-0_map)
                       (ap ("message" :error:.$.message) %Error_obj-0_map)
                      )
                      (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
                     )
                    )
                    (new %Id_obj-3_map
                     (seq
                      (ap ("id" "") %Id_obj-3_map)
                      (canon %init_peer_id% %Id_obj-3_map  Id_obj-3)
                     )
                    )
                   )
                   (new %Save_obj-2_map
                    (seq
                     (ap ("secretId" Id_obj-3) %Save_obj-2_map)
                     (canon %init_peer_id% %Save_obj-2_map  Save_obj-2)
                    )
                   )
                  )
                  (new %SaveSecretResult_obj-2_map
                   (seq
                    (seq
                     (ap ("error" Error_obj-0) %SaveSecretResult_obj-2_map)
                     (ap ("value" Save_obj-2) %SaveSecretResult_obj-2_map)
                    )
                    (canon %init_peer_id% %SaveSecretResult_obj-2_map  SaveSecretResult_obj-2)
                   )
                  )
                 )
                 (ap SaveSecretResult_obj-2 $result-1)
                )
               )
               (new $result-1_test
                (seq
                 (seq
                  (fold $result-1 result-1_fold_var
                   (seq
                    (seq
                     (ap result-1_fold_var $result-1_test)
                     (canon %init_peer_id% $result-1_test  #result-1_iter_canon)
                    )
                    (xor
                     (match #result-1_iter_canon.length 1
                      (null)
                     )
                     (next result-1_fold_var)
                    )
                   )
                   (never)
                  )
                  (canon %init_peer_id% $result-1_test  #result-1_result_canon)
                 )
                 (ap #result-1_result_canon result-1_gate)
                )
               )
              )
              (new %Id_obj-4_map
               (seq
                (ap ("id" w-0.$.worker_id.[0]) %Id_obj-4_map)
                (canon %init_peer_id% %Id_obj-4_map  Id_obj-4)
               )
              )
             )
             (new %WorkerSaveSecretResult_obj_map
              (seq
               (seq
                (ap ("value" result-1_gate.$.[0]) %WorkerSaveSecretResult_obj_map)
                (ap ("workerId" Id_obj-4) %WorkerSaveSecretResult_obj_map)
               )
               (canon %init_peer_id% %WorkerSaveSecretResult_obj_map  WorkerSaveSecretResult_obj)
              )
             )
            )
            (ap WorkerSaveSecretResult_obj $result-0)
           )
           (next w-0)
          )
         )
         (never)
        )
        (null)
       )
      )
      (par
       (seq
        (seq
         (seq
          (ap -workers-arg- -workers-arg-_to_functor)
          (ap -workers-arg-_to_functor.length -workers-arg-_length)
         )
         (new $result-0_test
          (seq
           (seq
            (fold $result-0 result-0_fold_var
             (seq
              (seq
               (ap result-0_fold_var $result-0_test)
               (canon %init_peer_id% $result-0_test  #result-0_iter_canon)
              )
              (xor
               (match #result-0_iter_canon.length -workers-arg-_length
                (null)
               )
               (next result-0_fold_var)
              )
             )
             (never)
            )
            (canon %init_peer_id% $result-0_test  #result-0_result_canon)
           )
           (ap #result-0_result_canon result-0_gate)
          )
         )
        )
        (call %init_peer_id% ("math" "sub") [-workers-arg-_length 1] result-0_idx)
       )
       (call %init_peer_id% ("peer" "timeout") [3000 "timeout"] ret-2)
      )
     )
     (canon %init_peer_id% $result-0  #-result-fix-0)
    )
    (ap #-result-fix-0 -result-flat-0)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-0])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type SaveSecretOnWorkersArgSecretId = { id: string; }

export type SaveSecretOnWorkersParams = [secretId: SaveSecretOnWorkersArgSecretId, expiredAt: number, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: SaveSecretOnWorkersArgSecretId, expiredAt: number, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type SaveSecretOnWorkersResult = Promise<{ value: { error: { is_ok: boolean; message: string; }; value: { secretId: { id: string; }; }; }; workerId: { id: string; }; }[]>;

export function saveSecretOnWorkers(...args: SaveSecretOnWorkersParams): SaveSecretOnWorkersResult {
    return callFunction$$(
        args,
        {
    "functionName": "saveSecretOnWorkers",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "expiredAt": {
                    "name": "u64",
                    "tag": "scalar"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerSaveSecretResult",
                        "fields": {
                            "value": {
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
                                    },
                                    "value": {
                                        "name": "Save",
                                        "fields": {
                                            "secretId": {
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
                                        "tag": "struct"
                                    }
                                },
                                "tag": "struct"
                            },
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        saveSecretOnWorkers_script
    );
}

export const checkIsSecretOwner_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "is_secret_owner") [-secretId-arg-.$.id] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerError_obj_map
                (seq
                 (seq
                  (ap ("error" ret) %WorkerError_obj_map)
                  (ap ("workerId" Id_obj) %WorkerError_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                )
               )
              )
              (ap WorkerError_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (new %Error_obj_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj_map)
                   (ap ("message" :error:.$.message) %Error_obj_map)
                  )
                  (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerError_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj) %WorkerError_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj-0_map  WorkerError_obj-0)
                )
               )
              )
              (ap WorkerError_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-9)
    )
    (ap #-result-fix-9 -result-flat-9)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-9])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type CheckIsSecretOwnerArgSecretId = { id: string; }

export type CheckIsSecretOwnerParams = [secretId: CheckIsSecretOwnerArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: CheckIsSecretOwnerArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type CheckIsSecretOwnerResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function checkIsSecretOwner(...args: CheckIsSecretOwnerParams): CheckIsSecretOwnerResult {
    return callFunction$$(
        args,
        {
    "functionName": "checkIsSecretOwner",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        checkIsSecretOwner_script
    );
}

export const getRole_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
         (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "userId") [] -userId-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "get_user_role") [-secretId-arg-.$.id -userId-arg-.$.id] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerGetUserRoleResult_obj_map
                (seq
                 (seq
                  (ap ("value" ret) %WorkerGetUserRoleResult_obj_map)
                  (ap ("workerId" Id_obj) %WorkerGetUserRoleResult_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerGetUserRoleResult_obj_map  WorkerGetUserRoleResult_obj)
                )
               )
              )
              (ap WorkerGetUserRoleResult_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (seq
                  (new %Error_obj_map
                   (seq
                    (seq
                     (ap ("is_ok" false) %Error_obj_map)
                     (ap ("message" :error:.$.message) %Error_obj_map)
                    )
                    (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                   )
                  )
                  (new %GetUserRole_obj_map
                   (seq
                    (ap ("role" "") %GetUserRole_obj_map)
                    (canon w-0.$.worker_id.[0] %GetUserRole_obj_map  GetUserRole_obj)
                   )
                  )
                 )
                 (new %GetUserRoleResult_obj_map
                  (seq
                   (seq
                    (ap ("error" Error_obj) %GetUserRoleResult_obj_map)
                    (ap ("value" GetUserRole_obj) %GetUserRoleResult_obj_map)
                   )
                   (canon w-0.$.worker_id.[0] %GetUserRoleResult_obj_map  GetUserRoleResult_obj)
                  )
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerGetUserRoleResult_obj-0_map
                (seq
                 (seq
                  (ap ("value" GetUserRoleResult_obj) %WorkerGetUserRoleResult_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerGetUserRoleResult_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerGetUserRoleResult_obj-0_map  WorkerGetUserRoleResult_obj-0)
                )
               )
              )
              (ap WorkerGetUserRoleResult_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-12)
    )
    (ap #-result-fix-12 -result-flat-12)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-12])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetRoleArgSecretId = { id: string; }
export type GetRoleArgUserId = { id: string; }

export type GetRoleParams = [secretId: GetRoleArgSecretId, userId: GetRoleArgUserId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: GetRoleArgSecretId, userId: GetRoleArgUserId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type GetRoleResult = Promise<{ value: { error: { is_ok: boolean; message: string; }; value: { role: string; }; }; workerId: { id: string; }; }[]>;

export function getRole(...args: GetRoleParams): GetRoleResult {
    return callFunction$$(
        args,
        {
    "functionName": "getRole",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "userId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerGetUserRoleResult",
                        "fields": {
                            "value": {
                                "name": "GetUserRoleResult",
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
                                        "name": "GetUserRole",
                                        "fields": {
                                            "role": {
                                                "name": "string",
                                                "tag": "scalar"
                                            }
                                        },
                                        "tag": "struct"
                                    }
                                },
                                "tag": "struct"
                            },
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        getRole_script
    );
}

export const getSecret_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
         (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
       )
       (par
        (fold -workers-arg- w-0
         (new $result-0
          (par
           (seq
            (seq
             (seq
              (seq
               (xor
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (call %init_peer_id% ("secret_giver" "initialize_session") [] ret)
                     (call %init_peer_id% ("secret_giver" "generate_keys") [ret] ret-0)
                    )
                    (par
                     (new %Error_obj_map
                      (seq
                       (seq
                        (ap ("is_ok" true) %Error_obj_map)
                        (ap ("message" "") %Error_obj_map)
                       )
                       (canon %init_peer_id% %Error_obj_map  Error_obj)
                      )
                     )
                     (new %SessionMetaData_obj_map
                      (seq
                       (seq
                        (ap ("recieverPublicKey" ret-0.$.value.public_key) %SessionMetaData_obj_map)
                        (ap ("sessionId" ret) %SessionMetaData_obj_map)
                       )
                       (canon %init_peer_id% %SessionMetaData_obj_map  SessionMetaData_obj)
                      )
                     )
                    )
                   )
                   (new %PrepareResult_obj_map
                    (seq
                     (seq
                      (ap ("error" Error_obj) %PrepareResult_obj_map)
                      (ap ("value" SessionMetaData_obj) %PrepareResult_obj_map)
                     )
                     (canon %init_peer_id% %PrepareResult_obj_map  PrepareResult_obj)
                    )
                   )
                  )
                  (xor
                   (match PrepareResult_obj.$.error.is_ok true
                    (ap false not)
                   )
                   (ap true not)
                  )
                 )
                 (new -if-else-error-
                  (new -else-error-
                   (new -if-error-
                    (xor
                     (match not true
                      (seq
                       (seq
                        (seq
                         (new %Id_obj_map
                          (seq
                           (ap ("id" "") %Id_obj_map)
                           (canon %init_peer_id% %Id_obj_map  Id_obj)
                          )
                         )
                         (new %Save_obj_map
                          (seq
                           (ap ("secretId" Id_obj) %Save_obj_map)
                           (canon %init_peer_id% %Save_obj_map  Save_obj)
                          )
                         )
                        )
                        (new %SaveSecretResult_obj_map
                         (seq
                          (seq
                           (ap ("error" PrepareResult_obj.$.error) %SaveSecretResult_obj_map)
                           (ap ("value" Save_obj) %SaveSecretResult_obj_map)
                          )
                          (canon %init_peer_id% %SaveSecretResult_obj_map  SaveSecretResult_obj)
                         )
                        )
                       )
                       (ap SaveSecretResult_obj $result-0)
                      )
                     )
                     (seq
                      (ap :error: -if-error-)
                      (xor
                       (match :error:.$.error_code 10001
                        (seq
                         (seq
                          (seq
                           (seq
                            (xor
                             (seq
                              (seq
                               (seq
                                (seq
                                 (seq
                                  (seq
                                   (seq
                                    (new $-hop-
                                     (new #-hopc-
                                      (canon -relay- $-hop-  #-hopc-)
                                     )
                                    )
                                    (new $-hop-
                                     (new #-hopc-
                                      (canon w-0.$.host_id $-hop-  #-hopc-)
                                     )
                                    )
                                   )
                                   (call w-0.$.worker_id.[0] ("secret-holder" "start_handshake") [] ret-1)
                                  )
                                  (new %CryptoMetadata_obj_map
                                   (seq
                                    (seq
                                     (seq
                                      (ap ("nonce" []) %CryptoMetadata_obj_map)
                                      (ap ("other_public_key" PrepareResult_obj.$.value.recieverPublicKey) %CryptoMetadata_obj_map)
                                     )
                                     (ap ("self_public_key" ret-1.$.value.public_key) %CryptoMetadata_obj_map)
                                    )
                                    (canon w-0.$.worker_id.[0] %CryptoMetadata_obj_map  CryptoMetadata_obj)
                                   )
                                  )
                                 )
                                 (new %GetSecretRequest_obj_map
                                  (seq
                                   (seq
                                    (ap ("metadata" CryptoMetadata_obj) %GetSecretRequest_obj_map)
                                    (ap ("secret_id" -secretId-arg-.$.id) %GetSecretRequest_obj_map)
                                   )
                                   (canon w-0.$.worker_id.[0] %GetSecretRequest_obj_map  GetSecretRequest_obj)
                                  )
                                 )
                                )
                                (call w-0.$.worker_id.[0] ("secret-holder" "get_secret") [GetSecretRequest_obj] ret-2)
                               )
                               (new $-hop-
                                (new #-hopc-
                                 (canon w-0.$.host_id $-hop-  #-hopc-)
                                )
                               )
                              )
                              (new $-hop-
                               (new #-hopc-
                                (canon -relay- $-hop-  #-hopc-)
                               )
                              )
                             )
                             (seq
                              (seq
                               (seq
                                (new $-hop-
                                 (new #-hopc-
                                  (canon w-0.$.host_id $-hop-  #-hopc-)
                                 )
                                )
                                (new $-hop-
                                 (new #-hopc-
                                  (canon -relay- $-hop-  #-hopc-)
                                 )
                                )
                               )
                               (new $-hop-
                                (new #-hopc-
                                 (canon %init_peer_id% $-hop-  #-hopc-)
                                )
                               )
                              )
                              (fail :error:)
                             )
                            )
                            (new %SecretData_obj_map
                             (seq
                              (seq
                               (seq
                                (ap ("nonce" ret-2.$.value.nonce) %SecretData_obj_map)
                                (ap ("publicKey" ret-1.$.value.public_key) %SecretData_obj_map)
                               )
                               (ap ("secret" ret-2.$.value.secret) %SecretData_obj_map)
                              )
                              (canon %init_peer_id% %SecretData_obj_map  SecretData_obj)
                             )
                            )
                           )
                           (new %GetSecretResult_obj_map
                            (seq
                             (seq
                              (ap ("error" ret-2.$.error) %GetSecretResult_obj_map)
                              (ap ("value" SecretData_obj) %GetSecretResult_obj_map)
                             )
                             (canon %init_peer_id% %GetSecretResult_obj_map  GetSecretResult_obj)
                            )
                           )
                          )
                          (xor
                           (match GetSecretResult_obj.$.error.is_ok true
                            (ap false not-0)
                           )
                           (ap true not-0)
                          )
                         )
                         (new -if-else-error-
                          (new -else-error-
                           (new -if-error-
                            (xor
                             (match not-0 true
                              (seq
                               (seq
                                (seq
                                 (new %Id_obj-0_map
                                  (seq
                                   (ap ("id" "") %Id_obj-0_map)
                                   (canon %init_peer_id% %Id_obj-0_map  Id_obj-0)
                                  )
                                 )
                                 (new %Save_obj-0_map
                                  (seq
                                   (ap ("secretId" Id_obj-0) %Save_obj-0_map)
                                   (canon %init_peer_id% %Save_obj-0_map  Save_obj-0)
                                  )
                                 )
                                )
                                (new %SaveSecretResult_obj-0_map
                                 (seq
                                  (seq
                                   (ap ("error" GetSecretResult_obj.$.error) %SaveSecretResult_obj-0_map)
                                   (ap ("value" Save_obj-0) %SaveSecretResult_obj-0_map)
                                  )
                                  (canon %init_peer_id% %SaveSecretResult_obj-0_map  SaveSecretResult_obj-0)
                                 )
                                )
                               )
                               (ap SaveSecretResult_obj-0 $result-0)
                              )
                             )
                             (seq
                              (ap :error: -if-error-)
                              (xor
                               (match :error:.$.error_code 10001
                                (seq
                                 (seq
                                  (seq
                                   (call %init_peer_id% ("secret_giver" "save_secret") [PrepareResult_obj.$.value.sessionId GetSecretResult_obj.$.value.secret GetSecretResult_obj.$.value.nonce GetSecretResult_obj.$.value.publicKey] ret-3)
                                   (new %Save_obj-1_map
                                    (seq
                                     (ap ("secretId" PrepareResult_obj.$.value.sessionId) %Save_obj-1_map)
                                     (canon %init_peer_id% %Save_obj-1_map  Save_obj-1)
                                    )
                                   )
                                  )
                                  (new %SaveSecretResult_obj-1_map
                                   (seq
                                    (seq
                                     (ap ("error" ret-3.$.error) %SaveSecretResult_obj-1_map)
                                     (ap ("value" Save_obj-1) %SaveSecretResult_obj-1_map)
                                    )
                                    (canon %init_peer_id% %SaveSecretResult_obj-1_map  SaveSecretResult_obj-1)
                                   )
                                  )
                                 )
                                 (ap SaveSecretResult_obj-1 $result-0)
                                )
                               )
                               (seq
                                (seq
                                 (ap :error: -else-error-)
                                 (xor
                                  (match :error:.$.error_code 10001
                                   (ap -if-error- -if-else-error-)
                                  )
                                  (ap -else-error- -if-else-error-)
                                 )
                                )
                                (fail -if-else-error-)
                               )
                              )
                             )
                            )
                           )
                          )
                         )
                        )
                       )
                       (seq
                        (seq
                         (ap :error: -else-error-)
                         (xor
                          (match :error:.$.error_code 10001
                           (ap -if-error- -if-else-error-)
                          )
                          (ap -else-error- -if-else-error-)
                         )
                        )
                        (fail -if-else-error-)
                       )
                      )
                     )
                    )
                   )
                  )
                 )
                )
                (seq
                 (seq
                  (seq
                   (seq
                    (new %Error_obj-0_map
                     (seq
                      (seq
                       (ap ("is_ok" false) %Error_obj-0_map)
                       (ap ("message" :error:.$.message) %Error_obj-0_map)
                      )
                      (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
                     )
                    )
                    (new %Id_obj-1_map
                     (seq
                      (ap ("id" "") %Id_obj-1_map)
                      (canon %init_peer_id% %Id_obj-1_map  Id_obj-1)
                     )
                    )
                   )
                   (new %Save_obj-2_map
                    (seq
                     (ap ("secretId" Id_obj-1) %Save_obj-2_map)
                     (canon %init_peer_id% %Save_obj-2_map  Save_obj-2)
                    )
                   )
                  )
                  (new %SaveSecretResult_obj-2_map
                   (seq
                    (seq
                     (ap ("error" Error_obj-0) %SaveSecretResult_obj-2_map)
                     (ap ("value" Save_obj-2) %SaveSecretResult_obj-2_map)
                    )
                    (canon %init_peer_id% %SaveSecretResult_obj-2_map  SaveSecretResult_obj-2)
                   )
                  )
                 )
                 (ap SaveSecretResult_obj-2 $result-0)
                )
               )
               (new $result-0_test
                (seq
                 (seq
                  (fold $result-0 result-0_fold_var
                   (seq
                    (seq
                     (ap result-0_fold_var $result-0_test)
                     (canon %init_peer_id% $result-0_test  #result-0_iter_canon)
                    )
                    (xor
                     (match #result-0_iter_canon.length 1
                      (null)
                     )
                     (next result-0_fold_var)
                    )
                   )
                   (never)
                  )
                  (canon %init_peer_id% $result-0_test  #result-0_result_canon)
                 )
                 (ap #result-0_result_canon result-0_gate)
                )
               )
              )
              (new %Id_obj-2_map
               (seq
                (ap ("id" w-0.$.worker_id.[0]) %Id_obj-2_map)
                (canon %init_peer_id% %Id_obj-2_map  Id_obj-2)
               )
              )
             )
             (new %WorkerSaveSecretResult_obj_map
              (seq
               (seq
                (ap ("value" result-0_gate.$.[0]) %WorkerSaveSecretResult_obj_map)
                (ap ("workerId" Id_obj-2) %WorkerSaveSecretResult_obj_map)
               )
               (canon %init_peer_id% %WorkerSaveSecretResult_obj_map  WorkerSaveSecretResult_obj)
              )
             )
            )
            (ap WorkerSaveSecretResult_obj $result)
           )
           (next w-0)
          )
         )
         (never)
        )
        (null)
       )
      )
      (par
       (seq
        (seq
         (seq
          (ap -workers-arg- -workers-arg-_to_functor)
          (ap -workers-arg-_to_functor.length -workers-arg-_length)
         )
         (new $result_test
          (seq
           (seq
            (fold $result result_fold_var
             (seq
              (seq
               (ap result_fold_var $result_test)
               (canon %init_peer_id% $result_test  #result_iter_canon)
              )
              (xor
               (match #result_iter_canon.length -workers-arg-_length
                (null)
               )
               (next result_fold_var)
              )
             )
             (never)
            )
            (canon %init_peer_id% $result_test  #result_result_canon)
           )
           (ap #result_result_canon result_gate)
          )
         )
        )
        (call %init_peer_id% ("math" "sub") [-workers-arg-_length 1] result_idx)
       )
       (call %init_peer_id% ("peer" "timeout") [3000 "timeout"] ret-4)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-0)
    )
    (ap #-result-fix-0 -result-flat-0)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-0])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetSecretArgSecretId = { id: string; }

export type GetSecretParams = [secretId: GetSecretArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: GetSecretArgSecretId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type GetSecretResult = Promise<{ value: { error: { is_ok: boolean; message: string; }; value: { secretId: { id: string; }; }; }; workerId: { id: string; }; }[]>;

export function getSecret(...args: GetSecretParams): GetSecretResult {
    return callFunction$$(
        args,
        {
    "functionName": "getSecret",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerSaveSecretResult",
                        "fields": {
                            "value": {
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
                                    },
                                    "value": {
                                        "name": "Save",
                                        "fields": {
                                            "secretId": {
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
                                        "tag": "struct"
                                    }
                                },
                                "tag": "struct"
                            },
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        getSecret_script
    );
}

export const getAvailableForUseSecrets_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "get_all_available_for_use_secrets") [] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %GetAvailableSecretsResult_obj_map
                (seq
                 (seq
                  (ap ("value" ret) %GetAvailableSecretsResult_obj_map)
                  (ap ("workerId" Id_obj) %GetAvailableSecretsResult_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %GetAvailableSecretsResult_obj_map  GetAvailableSecretsResult_obj)
                )
               )
              )
              (ap GetAvailableSecretsResult_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (seq
                  (new %Error_obj_map
                   (seq
                    (seq
                     (ap ("is_ok" false) %Error_obj_map)
                     (ap ("message" :error:.$.message) %Error_obj_map)
                    )
                    (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                   )
                  )
                  (new %GetAllAvailableSecrets_obj_map
                   (seq
                    (ap ("secret_ids" []) %GetAllAvailableSecrets_obj_map)
                    (canon w-0.$.worker_id.[0] %GetAllAvailableSecrets_obj_map  GetAllAvailableSecrets_obj)
                   )
                  )
                 )
                 (new %GetAllAvailableSecretsResult_obj_map
                  (seq
                   (seq
                    (ap ("error" Error_obj) %GetAllAvailableSecretsResult_obj_map)
                    (ap ("value" GetAllAvailableSecrets_obj) %GetAllAvailableSecretsResult_obj_map)
                   )
                   (canon w-0.$.worker_id.[0] %GetAllAvailableSecretsResult_obj_map  GetAllAvailableSecretsResult_obj)
                  )
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %GetAvailableSecretsResult_obj-0_map
                (seq
                 (seq
                  (ap ("value" GetAllAvailableSecretsResult_obj) %GetAvailableSecretsResult_obj-0_map)
                  (ap ("workerId" Id_obj-0) %GetAvailableSecretsResult_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %GetAvailableSecretsResult_obj-0_map  GetAvailableSecretsResult_obj-0)
                )
               )
              )
              (ap GetAvailableSecretsResult_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-4)
    )
    (ap #-result-fix-4 -result-flat-4)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-4])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetAvailableForUseSecretsParams = [workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type GetAvailableForUseSecretsResult = Promise<{ value: { error: { is_ok: boolean; message: string; }; value: { secret_ids: string[]; }; }; workerId: { id: string; }; }[]>;

export function getAvailableForUseSecrets(...args: GetAvailableForUseSecretsParams): GetAvailableForUseSecretsResult {
    return callFunction$$(
        args,
        {
    "functionName": "getAvailableForUseSecrets",
    "arrow": {
        "domain": {
            "fields": {
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "GetAvailableSecretsResult",
                        "fields": {
                            "value": {
                                "name": "GetAllAvailableSecretsResult",
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
                                        "name": "GetAllAvailableSecrets",
                                        "fields": {
                                            "secret_ids": {
                                                "type": {
                                                    "name": "string",
                                                    "tag": "scalar"
                                                },
                                                "tag": "array"
                                            }
                                        },
                                        "tag": "struct"
                                    }
                                },
                                "tag": "struct"
                            },
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        getAvailableForUseSecrets_script
    );
}

export const initializeMultiWorkerSecret_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
          )
          (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
         )
         (call %init_peer_id% ("getDataSrv" "servicesCount") [] -servicesCount-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "firstRun") [] -firstRun-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "secondRun") [] -secondRun-arg-)
      )
      (fold -workers-arg- w-0
       (new $result-0
        (seq
         (seq
          (seq
           (par
            (seq
             (seq
              (xor
               (xor
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (new $-hop-
                      (new #-hopc-
                       (canon -relay- $-hop-  #-hopc-)
                      )
                     )
                     (new $-hop-
                      (new #-hopc-
                       (canon w-0.$.host_id $-hop-  #-hopc-)
                      )
                     )
                    )
                    (call w-0.$.worker_id.[0] ("secret-holder" "secret_key_init") [-secretId-arg-.$.id 0 -servicesCount-arg-] ret)
                   )
                   (ap ret $result-0)
                  )
                  (xor
                   (match ret.$.is_ok true
                    (ap false not)
                   )
                   (ap true not)
                  )
                 )
                 (new -if-else-error-
                  (new -else-error-
                   (new -if-error-
                    (xor
                     (seq
                      (seq
                       (match not true
                        (seq
                         (new %Error_obj_map
                          (seq
                           (seq
                            (ap ("is_ok" false) %Error_obj_map)
                            (ap ("message" "Failed to initialize secret") %Error_obj_map)
                           )
                           (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                          )
                         )
                         (ap Error_obj $result-0)
                        )
                       )
                       (new $-hop-
                        (new #-hopc-
                         (canon w-0.$.host_id $-hop-  #-hopc-)
                        )
                       )
                      )
                      (new $-hop-
                       (new #-hopc-
                        (canon -relay- $-hop-  #-hopc-)
                       )
                      )
                     )
                     (seq
                      (ap :error: -if-error-)
                      (xor
                       (match :error:.$.error_code 10001
                        (seq
                         (seq
                          (seq
                           (fold -firstRun-arg- s-0
                            (seq
                             (seq
                              (call w-0.$.worker_id.[0] (s-0.$.srvId "secret_initiate_handshake") [-secretId-arg-.$.id s-0.$.step -servicesCount-arg-] ret-0)
                              (ap ret-0 $result-0)
                             )
                             (next s-0)
                            )
                            (null)
                           )
                           (call w-0.$.worker_id.[0] ("secret-holder" "secret_key_init") [-secretId-arg-.$.id -servicesCount-arg- -servicesCount-arg-] ret-1)
                          )
                          (ap ret-1 $result-0)
                         )
                         (new -if-error-
                          (xor
                           (seq
                            (seq
                             (match ret-1.$.is_ok true
                              (fold -secondRun-arg- s-1
                               (seq
                                (seq
                                 (call w-0.$.worker_id.[0] (s-1.$.srvId "secret_initiate_handshake") [-secretId-arg-.$.id s-1.$.step -servicesCount-arg-] ret-2)
                                 (ap ret-2 $result-0)
                                )
                                (next s-1)
                               )
                               (null)
                              )
                             )
                             (new $-hop-
                              (new #-hopc-
                               (canon w-0.$.host_id $-hop-  #-hopc-)
                              )
                             )
                            )
                            (new $-hop-
                             (new #-hopc-
                              (canon -relay- $-hop-  #-hopc-)
                             )
                            )
                           )
                           (seq
                            (seq
                             (seq
                              (ap :error: -if-error-)
                              (xor
                               (seq
                                (seq
                                 (match :error:.$.error_code 10001
                                  (null)
                                 )
                                 (new $-hop-
                                  (new #-hopc-
                                   (canon w-0.$.host_id $-hop-  #-hopc-)
                                  )
                                 )
                                )
                                (new $-hop-
                                 (new #-hopc-
                                  (canon -relay- $-hop-  #-hopc-)
                                 )
                                )
                               )
                               (fail -if-error-)
                              )
                             )
                             (new $-hop-
                              (new #-hopc-
                               (canon w-0.$.host_id $-hop-  #-hopc-)
                              )
                             )
                            )
                            (new $-hop-
                             (new #-hopc-
                              (canon -relay- $-hop-  #-hopc-)
                             )
                            )
                           )
                          )
                         )
                        )
                       )
                       (seq
                        (seq
                         (seq
                          (seq
                           (ap :error: -else-error-)
                           (xor
                            (seq
                             (match :error:.$.error_code 10001
                              (ap -if-error- -if-else-error-)
                             )
                             (new $-hop-
                              (new #-hopc-
                               (canon w-0.$.host_id $-hop-  #-hopc-)
                              )
                             )
                            )
                            (seq
                             (ap -else-error- -if-else-error-)
                             (new $-hop-
                              (new #-hopc-
                               (canon w-0.$.host_id $-hop-  #-hopc-)
                              )
                             )
                            )
                           )
                          )
                          (fail -if-else-error-)
                         )
                         (new $-hop-
                          (new #-hopc-
                           (canon w-0.$.host_id $-hop-  #-hopc-)
                          )
                         )
                        )
                        (new $-hop-
                         (new #-hopc-
                          (canon -relay- $-hop-  #-hopc-)
                         )
                        )
                       )
                      )
                     )
                    )
                   )
                  )
                 )
                )
                (seq
                 (seq
                  (seq
                   (new $-hop-
                    (new #-hopc-
                     (canon w-0.$.host_id $-hop-  #-hopc-)
                    )
                   )
                   (new $-hop-
                    (new #-hopc-
                     (canon -relay- $-hop-  #-hopc-)
                    )
                   )
                  )
                  (new $-hop-
                   (new #-hopc-
                    (canon %init_peer_id% $-hop-  #-hopc-)
                   )
                  )
                 )
                 (fail :error:)
                )
               )
               (seq
                (new %Error_obj-0_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj-0_map)
                   (ap ("message" :error:.$.message) %Error_obj-0_map)
                  )
                  (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
                 )
                )
                (ap Error_obj-0 $result-0)
               )
              )
              (canon %init_peer_id% $result-0  #-result-fix-2)
             )
             (ap #-result-fix-2 -result-flat-2)
            )
            (new %Id_obj_map
             (seq
              (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
              (canon %init_peer_id% %Id_obj_map  Id_obj)
             )
            )
           )
           (new %WorkerErrors_obj_map
            (seq
             (seq
              (ap ("error" -result-flat-2) %WorkerErrors_obj_map)
              (ap ("workerId" Id_obj) %WorkerErrors_obj_map)
             )
             (canon %init_peer_id% %WorkerErrors_obj_map  WorkerErrors_obj)
            )
           )
          )
          (ap WorkerErrors_obj $result)
         )
         (next w-0)
        )
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-3)
    )
    (ap #-result-fix-3 -result-flat-3)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-3])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type InitializeMultiWorkerSecretArgSecretId = { id: string; }

export type InitializeMultiWorkerSecretParams = [workers: { host_id: string; pat_id: string; worker_id: string | null; }[], secretId: InitializeMultiWorkerSecretArgSecretId, servicesCount: number, firstRun: { srvId: string; step: number; }[], secondRun: { srvId: string; step: number; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], secretId: InitializeMultiWorkerSecretArgSecretId, servicesCount: number, firstRun: { srvId: string; step: number; }[], secondRun: { srvId: string; step: number; }[], config?: {ttl?: number}];

export type InitializeMultiWorkerSecretResult = Promise<{ error: { is_ok: boolean; message: string; }[]; workerId: { id: string; }; }[]>;

export function initializeMultiWorkerSecret(...args: InitializeMultiWorkerSecretParams): InitializeMultiWorkerSecretResult {
    return callFunction$$(
        args,
        {
    "functionName": "initializeMultiWorkerSecret",
    "arrow": {
        "domain": {
            "fields": {
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                },
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "servicesCount": {
                    "name": "u8",
                    "tag": "scalar"
                },
                "firstRun": {
                    "type": {
                        "name": "StepService",
                        "fields": {
                            "srvId": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "step": {
                                "name": "u8",
                                "tag": "scalar"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                },
                "secondRun": {
                    "type": {
                        "name": "StepService",
                        "fields": {
                            "srvId": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "step": {
                                "name": "u8",
                                "tag": "scalar"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerErrors",
                        "fields": {
                            "error": {
                                "type": {
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
                                "tag": "array"
                            },
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        initializeMultiWorkerSecret_script
    );
}

export const revokeRole_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
         (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "userId") [] -userId-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (xor
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon w-0.$.host_id $-hop-  #-hopc-)
            )
           )
          )
          (xor
           (seq
            (seq
             (seq
              (seq
               (par
                (call w-0.$.worker_id.[0] ("secret-holder" "revoke_role") [-secretId-arg-.$.id -userId-arg-.$.id] ret)
                (new %Id_obj_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                  (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                 )
                )
               )
               (new %WorkerError_obj_map
                (seq
                 (seq
                  (ap ("error" ret) %WorkerError_obj_map)
                  (ap ("workerId" Id_obj) %WorkerError_obj_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                )
               )
              )
              (ap WorkerError_obj $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (seq
            (seq
             (seq
              (seq
               (seq
                (new %Error_obj_map
                 (seq
                  (seq
                   (ap ("is_ok" false) %Error_obj_map)
                   (ap ("message" :error:.$.message) %Error_obj_map)
                  )
                  (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                 )
                )
                (new %Id_obj-0_map
                 (seq
                  (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                  (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                 )
                )
               )
               (new %WorkerError_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj) %WorkerError_obj-0_map)
                  (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                 )
                 (canon w-0.$.worker_id.[0] %WorkerError_obj-0_map  WorkerError_obj-0)
                )
               )
              )
              (ap WorkerError_obj-0 $result)
             )
             (new $-hop-
              (new #-hopc-
               (canon w-0.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
         (seq
          (seq
           (seq
            (new $-hop-
             (new #-hopc-
              (canon w-0.$.host_id $-hop-  #-hopc-)
             )
            )
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon %init_peer_id% $-hop-  #-hopc-)
            )
           )
          )
          (fail :error:)
         )
        )
        (next w-0)
       )
       (null)
      )
     )
     (canon %init_peer_id% $result  #-result-fix-13)
    )
    (ap #-result-fix-13 -result-flat-13)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-13])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type RevokeRoleArgSecretId = { id: string; }
export type RevokeRoleArgUserId = { id: string; }

export type RevokeRoleParams = [secretId: RevokeRoleArgSecretId, userId: RevokeRoleArgUserId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: RevokeRoleArgSecretId, userId: RevokeRoleArgUserId, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type RevokeRoleResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function revokeRole(...args: RevokeRoleParams): RevokeRoleResult {
    return callFunction$$(
        args,
        {
    "functionName": "revokeRole",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "userId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "workers": {
                    "type": {
                        "name": "Worker",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "pat_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "worker_id": {
                                "type": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "tag": "option"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerError",
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
                            "workerId": {
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
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        revokeRole_script
    );
}

export const initializeSecret_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "worker") [] -worker-arg-)
          )
          (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
         )
         (call %init_peer_id% ("getDataSrv" "servicesCount") [] -servicesCount-arg-)
        )
        (call %init_peer_id% ("getDataSrv" "firstRun") [] -firstRun-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "secondRun") [] -secondRun-arg-)
      )
      (xor
       (xor
        (seq
         (seq
          (seq
           (seq
            (seq
             (new $-hop-
              (new #-hopc-
               (canon -relay- $-hop-  #-hopc-)
              )
             )
             (new $-hop-
              (new #-hopc-
               (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
              )
             )
            )
            (call -worker-arg-.$.worker_id.[0] ("secret-holder" "secret_key_init") [-secretId-arg-.$.id 0 -servicesCount-arg-] ret)
           )
           (ap ret $result)
          )
          (xor
           (match ret.$.is_ok true
            (ap false not)
           )
           (ap true not)
          )
         )
         (new -if-else-error-
          (new -else-error-
           (new -if-error-
            (xor
             (seq
              (seq
               (match not true
                (seq
                 (new %Error_obj_map
                  (seq
                   (seq
                    (ap ("is_ok" false) %Error_obj_map)
                    (ap ("message" "Failed to initialize secret") %Error_obj_map)
                   )
                   (canon -worker-arg-.$.worker_id.[0] %Error_obj_map  Error_obj)
                  )
                 )
                 (ap Error_obj $result)
                )
               )
               (new $-hop-
                (new #-hopc-
                 (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
                )
               )
              )
              (new $-hop-
               (new #-hopc-
                (canon -relay- $-hop-  #-hopc-)
               )
              )
             )
             (seq
              (ap :error: -if-error-)
              (xor
               (match :error:.$.error_code 10001
                (seq
                 (seq
                  (seq
                   (fold -firstRun-arg- s-0
                    (seq
                     (seq
                      (call -worker-arg-.$.worker_id.[0] (s-0.$.srvId "secret_initiate_handshake") [-secretId-arg-.$.id s-0.$.step -servicesCount-arg-] ret-0)
                      (ap ret-0 $result)
                     )
                     (next s-0)
                    )
                    (null)
                   )
                   (call -worker-arg-.$.worker_id.[0] ("secret-holder" "secret_key_init") [-secretId-arg-.$.id -servicesCount-arg- -servicesCount-arg-] ret-1)
                  )
                  (ap ret-1 $result)
                 )
                 (new -if-error-
                  (xor
                   (seq
                    (seq
                     (match ret-1.$.is_ok true
                      (fold -secondRun-arg- s-1
                       (seq
                        (seq
                         (call -worker-arg-.$.worker_id.[0] (s-1.$.srvId "secret_initiate_handshake") [-secretId-arg-.$.id s-1.$.step -servicesCount-arg-] ret-2)
                         (ap ret-2 $result)
                        )
                        (next s-1)
                       )
                       (null)
                      )
                     )
                     (new $-hop-
                      (new #-hopc-
                       (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
                      )
                     )
                    )
                    (new $-hop-
                     (new #-hopc-
                      (canon -relay- $-hop-  #-hopc-)
                     )
                    )
                   )
                   (seq
                    (seq
                     (seq
                      (ap :error: -if-error-)
                      (xor
                       (seq
                        (seq
                         (match :error:.$.error_code 10001
                          (null)
                         )
                         (new $-hop-
                          (new #-hopc-
                           (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
                          )
                         )
                        )
                        (new $-hop-
                         (new #-hopc-
                          (canon -relay- $-hop-  #-hopc-)
                         )
                        )
                       )
                       (fail -if-error-)
                      )
                     )
                     (new $-hop-
                      (new #-hopc-
                       (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
                      )
                     )
                    )
                    (new $-hop-
                     (new #-hopc-
                      (canon -relay- $-hop-  #-hopc-)
                     )
                    )
                   )
                  )
                 )
                )
               )
               (seq
                (seq
                 (seq
                  (seq
                   (ap :error: -else-error-)
                   (xor
                    (seq
                     (match :error:.$.error_code 10001
                      (ap -if-error- -if-else-error-)
                     )
                     (new $-hop-
                      (new #-hopc-
                       (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
                      )
                     )
                    )
                    (seq
                     (ap -else-error- -if-else-error-)
                     (new $-hop-
                      (new #-hopc-
                       (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
                      )
                     )
                    )
                   )
                  )
                  (fail -if-else-error-)
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
                  )
                 )
                )
                (new $-hop-
                 (new #-hopc-
                  (canon -relay- $-hop-  #-hopc-)
                 )
                )
               )
              )
             )
            )
           )
          )
         )
        )
        (seq
         (seq
          (seq
           (new $-hop-
            (new #-hopc-
             (canon -worker-arg-.$.host_id $-hop-  #-hopc-)
            )
           )
           (new $-hop-
            (new #-hopc-
             (canon -relay- $-hop-  #-hopc-)
            )
           )
          )
          (new $-hop-
           (new #-hopc-
            (canon %init_peer_id% $-hop-  #-hopc-)
           )
          )
         )
         (fail :error:)
        )
       )
       (seq
        (new %Error_obj-0_map
         (seq
          (seq
           (ap ("is_ok" false) %Error_obj-0_map)
           (ap ("message" :error:.$.message) %Error_obj-0_map)
          )
          (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
         )
        )
        (ap Error_obj-0 $result)
       )
      )
     )
     (canon %init_peer_id% $result  #-result-fix-2)
    )
    (ap #-result-fix-2 -result-flat-2)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-result-flat-2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type InitializeSecretArgWorker = { host_id: string; pat_id: string; worker_id: string | null; }
export type InitializeSecretArgSecretId = { id: string; }

export type InitializeSecretParams = [worker: InitializeSecretArgWorker, secretId: InitializeSecretArgSecretId, servicesCount: number, firstRun: { srvId: string; step: number; }[], secondRun: { srvId: string; step: number; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, worker: InitializeSecretArgWorker, secretId: InitializeSecretArgSecretId, servicesCount: number, firstRun: { srvId: string; step: number; }[], secondRun: { srvId: string; step: number; }[], config?: {ttl?: number}];

export type InitializeSecretResult = Promise<{ is_ok: boolean; message: string; }[]>;

export function initializeSecret(...args: InitializeSecretParams): InitializeSecretResult {
    return callFunction$$(
        args,
        {
    "functionName": "initializeSecret",
    "arrow": {
        "domain": {
            "fields": {
                "worker": {
                    "name": "Worker",
                    "fields": {
                        "host_id": {
                            "name": "string",
                            "tag": "scalar"
                        },
                        "pat_id": {
                            "name": "string",
                            "tag": "scalar"
                        },
                        "worker_id": {
                            "type": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "tag": "option"
                        }
                    },
                    "tag": "struct"
                },
                "secretId": {
                    "name": "Id",
                    "fields": {
                        "id": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                },
                "servicesCount": {
                    "name": "u8",
                    "tag": "scalar"
                },
                "firstRun": {
                    "type": {
                        "name": "StepService",
                        "fields": {
                            "srvId": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "step": {
                                "name": "u8",
                                "tag": "scalar"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                },
                "secondRun": {
                    "type": {
                        "name": "StepService",
                        "fields": {
                            "srvId": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "step": {
                                "name": "u8",
                                "tag": "scalar"
                            }
                        },
                        "tag": "struct"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
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
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        initializeSecret_script
    );
}
