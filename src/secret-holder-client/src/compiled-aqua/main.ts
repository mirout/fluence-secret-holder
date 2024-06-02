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

export const initializeSecretHolderAll_script = `
(xor
 (new $res-0
  (new $res
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
             (seq
              (seq
               (seq
                (seq
                 (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                 (new $option-inline
                  (seq
                   (xor
                    (seq
                     (new %IntegrationTestDeployment_obj_map
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (ap ("chainNetworkId" 31337) %IntegrationTestDeployment_obj_map)
                            (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %IntegrationTestDeployment_obj_map)
                           )
                           (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %IntegrationTestDeployment_obj_map)
                          )
                          (ap ("definition" "bafkreif2va2f476e43n6rr2yv53czyxruechzsjaykhhfu4baznm4yncuu") %IntegrationTestDeployment_obj_map)
                         )
                         (ap ("matched" true) %IntegrationTestDeployment_obj_map)
                        )
                        (ap ("timestamp" "2024-06-01T22:06:36.630Z") %IntegrationTestDeployment_obj_map)
                       )
                       (canon %init_peer_id% %IntegrationTestDeployment_obj_map  IntegrationTestDeployment_obj)
                      )
                     )
                     (ap IntegrationTestDeployment_obj $option-inline)
                    )
                    (null)
                   )
                   (canon %init_peer_id% $option-inline  #option-inline-0)
                  )
                 )
                )
                (new %Deals_obj_map
                 (seq
                  (seq
                   (seq
                    (ap ("alchemyRpcDeployment" []) %Deals_obj_map)
                    (ap ("integrationTestDeployment" #option-inline-0) %Deals_obj_map)
                   )
                   (ap ("secretHolderDeployment" []) %Deals_obj_map)
                  )
                  (canon %init_peer_id% %Deals_obj_map  Deals_obj)
                 )
                )
               )
               (ap Deals_obj.$.secretHolderDeployment Deals_obj_flat)
              )
              (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
             )
             (xor
              (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
              (fail :error:)
             )
            )
            (new -if-else-error-
             (new -else-error-
              (new -if-error-
               (xor
                (match ret.$.success false
                 (seq
                  (seq
                   (new %Error_obj_map
                    (seq
                     (seq
                      (ap ("is_ok" false) %Error_obj_map)
                      (ap ("message" ret.$.error.[0]) %Error_obj_map)
                     )
                     (canon %init_peer_id% %Error_obj_map  Error_obj)
                    )
                   )
                   (new %ResolveSubnetResult_obj_map
                    (seq
                     (seq
                      (ap ("error" Error_obj) %ResolveSubnetResult_obj_map)
                      (ap ("value" []) %ResolveSubnetResult_obj_map)
                     )
                     (canon %init_peer_id% %ResolveSubnetResult_obj_map  ResolveSubnetResult_obj)
                    )
                   )
                  )
                  (ap ResolveSubnetResult_obj $result)
                 )
                )
                (seq
                 (ap :error: -if-error-)
                 (xor
                  (match :error:.$.error_code 10001
                   (seq
                    (seq
                     (new %Error_obj-0_map
                      (seq
                       (seq
                        (ap ("is_ok" true) %Error_obj-0_map)
                        (ap ("message" "") %Error_obj-0_map)
                       )
                       (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
                      )
                     )
                     (new %ResolveSubnetResult_obj-0_map
                      (seq
                       (seq
                        (ap ("error" Error_obj-0) %ResolveSubnetResult_obj-0_map)
                        (ap ("value" ret.$.workers) %ResolveSubnetResult_obj-0_map)
                       )
                       (canon %init_peer_id% %ResolveSubnetResult_obj-0_map  ResolveSubnetResult_obj-0)
                      )
                     )
                    )
                    (ap ResolveSubnetResult_obj-0 $result)
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
                 (match #result_iter_canon.length 1
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
          (xor
           (match result_gate.$.[0].error.is_ok true
            (ap false not)
           )
           (ap true not)
          )
         )
         (new -if-error-
          (xor
           (seq
            (match not true
             (seq
              (new $array-inline
               (seq
                (seq
                 (ap "Failed to resolve subnet: " $array-inline)
                 (ap result_gate.$.[0].error $array-inline)
                )
                (canon %init_peer_id% $array-inline  #array-inline-0)
               )
              )
              (call %init_peer_id% ("run-console" "print") [#array-inline-0])
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
             (ap :error: -if-error-)
             (xor
              (seq
               (match :error:.$.error_code 10001
                (null)
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
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
          )
         )
        )
        (fold result_gate.$.[0].value w-0
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
                      (call w-0.$.worker_id.[0] ("secret-holder" "initialize") [] ret-0)
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
                       (ap ("error" ret-0) %WorkerError_obj_map)
                       (ap ("workerId" Id_obj) %WorkerError_obj_map)
                      )
                      (canon w-0.$.worker_id.[0] %WorkerError_obj_map  WorkerError_obj)
                     )
                    )
                   )
                   (ap WorkerError_obj $res-0)
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
                    (new %Error_obj-1_map
                     (seq
                      (seq
                       (ap ("is_ok" false) %Error_obj-1_map)
                       (ap ("message" "Worker id is nil") %Error_obj-1_map)
                      )
                      (canon %init_peer_id% %Error_obj-1_map  Error_obj-1)
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
                      (ap ("error" Error_obj-1) %WorkerError_obj-0_map)
                      (ap ("workerId" Id_obj-0) %WorkerError_obj-0_map)
                     )
                     (canon %init_peer_id% %WorkerError_obj-0_map  WorkerError_obj-0)
                    )
                   )
                  )
                  (ap WorkerError_obj-0 $res-0)
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
       (canon %init_peer_id% $res-0  #-res-fix-0)
      )
      (ap #-res-fix-0 -res-flat-0)
     )
     (call %init_peer_id% ("callbackSrv" "response") [-res-flat-0])
    )
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type InitializeSecretHolderAllParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type InitializeSecretHolderAllResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: { id: string; }; }[]>;

export function initializeSecretHolderAll(...args: InitializeSecretHolderAllParams): InitializeSecretHolderAllResult {
    return callFunction$$(
        args,
        {
    "functionName": "initializeSecretHolderAll",
    "arrow": {
        "domain": {
            "fields": {},
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
        initializeSecretHolderAll_script
    );
}

export const showSubnet_script = `
(xor
 (new $services
  (seq
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
            (new $option-inline
             (seq
              (xor
               (seq
                (new %IntegrationTestDeployment_obj_map
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (seq
                       (ap ("chainNetworkId" 31337) %IntegrationTestDeployment_obj_map)
                       (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %IntegrationTestDeployment_obj_map)
                      )
                      (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %IntegrationTestDeployment_obj_map)
                     )
                     (ap ("definition" "bafkreif2va2f476e43n6rr2yv53czyxruechzsjaykhhfu4baznm4yncuu") %IntegrationTestDeployment_obj_map)
                    )
                    (ap ("matched" true) %IntegrationTestDeployment_obj_map)
                   )
                   (ap ("timestamp" "2024-06-01T22:06:36.630Z") %IntegrationTestDeployment_obj_map)
                  )
                  (canon %init_peer_id% %IntegrationTestDeployment_obj_map  IntegrationTestDeployment_obj)
                 )
                )
                (ap IntegrationTestDeployment_obj $option-inline)
               )
               (null)
              )
              (canon %init_peer_id% $option-inline  #option-inline-0)
             )
            )
           )
           (new %Deals_obj_map
            (seq
             (seq
              (seq
               (ap ("alchemyRpcDeployment" []) %Deals_obj_map)
               (ap ("integrationTestDeployment" #option-inline-0) %Deals_obj_map)
              )
              (ap ("secretHolderDeployment" []) %Deals_obj_map)
             )
             (canon %init_peer_id% %Deals_obj_map  Deals_obj)
            )
           )
          )
          (ap Deals_obj.$.secretHolderDeployment Deals_obj_flat)
         )
         (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
        )
        (xor
         (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
         (fail :error:)
        )
       )
       (new -if-error-
        (xor
         (seq
          (match ret.$.success false
           (seq
            (new $array-inline
             (seq
              (seq
               (ap "Failed to resolve subnet: " $array-inline)
               (ap ret.$.error $array-inline)
              )
              (canon %init_peer_id% $array-inline  #array-inline-0)
             )
            )
            (call %init_peer_id% ("run-console" "print") [#array-inline-0])
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
           (ap :error: -if-error-)
           (xor
            (seq
             (match :error:.$.error_code 10001
              (null)
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
            (canon -relay- $-hop-  #-hopc-)
           )
          )
         )
        )
       )
      )
      (fold ret.$.workers w-0
       (seq
        (new -if-else-error-
         (new -else-error-
          (new -if-error-
           (xor
            (mismatch w-0.$.worker_id []
             (new $aliases
              (xor
               (seq
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
                      (call w-0.$.worker_id.[0] ("srv" "list") [] ret-0)
                     )
                     (fold ret-0 s-0
                      (seq
                       (seq
                        (seq
                         (seq
                          (ap s-0.$.aliases s-0_flat)
                          (ap s-0_flat s-0_flat_to_functor)
                         )
                         (ap s-0_flat_to_functor.length s-0_flat_length)
                        )
                        (new -if-error-
                         (xor
                          (mismatch s-0_flat_length 0
                           (ap s-0.$.aliases.[0] $aliases)
                          )
                          (seq
                           (ap :error: -if-error-)
                           (xor
                            (match :error:.$.error_code 10002
                             (null)
                            )
                            (fail -if-error-)
                           )
                          )
                         )
                        )
                       )
                       (next s-0)
                      )
                      (null)
                     )
                    )
                    (new $option-inline-1
                     (seq
                      (xor
                       (seq
                        (canon w-0.$.worker_id.[0] $aliases  #push-to-stream-98)
                        (ap #push-to-stream-98 $option-inline-1)
                       )
                       (null)
                      )
                      (canon w-0.$.worker_id.[0] $option-inline-1  #option-inline-1-0)
                     )
                    )
                   )
                   (new %WorkerServices_obj_map
                    (seq
                     (seq
                      (seq
                       (ap ("host_id" w-0.$.host_id) %WorkerServices_obj_map)
                       (ap ("services" #option-inline-1-0) %WorkerServices_obj_map)
                      )
                      (ap ("worker_id" w-0.$.worker_id) %WorkerServices_obj_map)
                     )
                     (canon w-0.$.worker_id.[0] %WorkerServices_obj_map  WorkerServices_obj)
                    )
                   )
                  )
                  (ap WorkerServices_obj $services)
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
            )
            (seq
             (ap :error: -if-error-)
             (xor
              (match :error:.$.error_code 10002
               (seq
                (new %WorkerServices_obj-0_map
                 (seq
                  (seq
                   (seq
                    (ap ("host_id" w-0.$.host_id) %WorkerServices_obj-0_map)
                    (ap ("services" []) %WorkerServices_obj-0_map)
                   )
                   (ap ("worker_id" []) %WorkerServices_obj-0_map)
                  )
                  (canon %init_peer_id% %WorkerServices_obj-0_map  WorkerServices_obj-0)
                 )
                )
                (ap WorkerServices_obj-0 $services)
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
     (canon %init_peer_id% $services  #-services-fix-0)
    )
    (ap #-services-fix-0 -services-flat-0)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-services-flat-0])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type ShowSubnetParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type ShowSubnetResult = Promise<{ host_id: string; services: string[] | null; worker_id: string | null; }[]>;

export function showSubnet(...args: ShowSubnetParams): ShowSubnetResult {
    return callFunction$$(
        args,
        {
    "functionName": "showSubnet",
    "arrow": {
        "domain": {
            "fields": {},
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "WorkerServices",
                        "fields": {
                            "host_id": {
                                "name": "string",
                                "tag": "scalar"
                            },
                            "services": {
                                "type": {
                                    "type": {
                                        "name": "string",
                                        "tag": "scalar"
                                    },
                                    "tag": "array"
                                },
                                "tag": "option"
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
        showSubnet_script
    );
}

export const resolveDealSubnet_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "dealId") [] -dealId-arg-)
      )
      (xor
       (call -relay- ("subnet" "resolve") [-dealId-arg-] ret)
       (fail :error:)
      )
     )
     (new -if-else-error-
      (new -else-error-
       (new -if-error-
        (xor
         (match ret.$.success false
          (seq
           (seq
            (new %Error_obj_map
             (seq
              (seq
               (ap ("is_ok" false) %Error_obj_map)
               (ap ("message" ret.$.error.[0]) %Error_obj_map)
              )
              (canon %init_peer_id% %Error_obj_map  Error_obj)
             )
            )
            (new %ResolveSubnetResult_obj_map
             (seq
              (seq
               (ap ("error" Error_obj) %ResolveSubnetResult_obj_map)
               (ap ("value" []) %ResolveSubnetResult_obj_map)
              )
              (canon %init_peer_id% %ResolveSubnetResult_obj_map  ResolveSubnetResult_obj)
             )
            )
           )
           (ap ResolveSubnetResult_obj $result)
          )
         )
         (seq
          (ap :error: -if-error-)
          (xor
           (match :error:.$.error_code 10001
            (seq
             (seq
              (new %Error_obj-0_map
               (seq
                (seq
                 (ap ("is_ok" true) %Error_obj-0_map)
                 (ap ("message" "") %Error_obj-0_map)
                )
                (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
               )
              )
              (new %ResolveSubnetResult_obj-0_map
               (seq
                (seq
                 (ap ("error" Error_obj-0) %ResolveSubnetResult_obj-0_map)
                 (ap ("value" ret.$.workers) %ResolveSubnetResult_obj-0_map)
                )
                (canon %init_peer_id% %ResolveSubnetResult_obj-0_map  ResolveSubnetResult_obj-0)
               )
              )
             )
             (ap ResolveSubnetResult_obj-0 $result)
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
          (match #result_iter_canon.length 1
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
   (call %init_peer_id% ("callbackSrv" "response") [result_gate.$.[0]])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type ResolveDealSubnetResultType = { error: { is_ok: boolean; message: string; }; value: { host_id: string; pat_id: string; worker_id: string | null; }[]; }

export type ResolveDealSubnetParams = [dealId: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, dealId: string, config?: {ttl?: number}];

export type ResolveDealSubnetResult = Promise<ResolveDealSubnetResultType>;

export function resolveDealSubnet(...args: ResolveDealSubnetParams): ResolveDealSubnetResult {
    return callFunction$$(
        args,
        {
    "functionName": "resolveDealSubnet",
    "arrow": {
        "domain": {
            "fields": {
                "dealId": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "ResolveSubnetResult",
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
                    "tag": "struct"
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
        resolveDealSubnet_script
    );
}

export const resolveSubnet_script = `
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
          (new $option-inline
           (seq
            (xor
             (seq
              (new %IntegrationTestDeployment_obj_map
               (seq
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (ap ("chainNetworkId" 31337) %IntegrationTestDeployment_obj_map)
                     (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %IntegrationTestDeployment_obj_map)
                    )
                    (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %IntegrationTestDeployment_obj_map)
                   )
                   (ap ("definition" "bafkreif2va2f476e43n6rr2yv53czyxruechzsjaykhhfu4baznm4yncuu") %IntegrationTestDeployment_obj_map)
                  )
                  (ap ("matched" true) %IntegrationTestDeployment_obj_map)
                 )
                 (ap ("timestamp" "2024-06-01T22:06:36.630Z") %IntegrationTestDeployment_obj_map)
                )
                (canon %init_peer_id% %IntegrationTestDeployment_obj_map  IntegrationTestDeployment_obj)
               )
              )
              (ap IntegrationTestDeployment_obj $option-inline)
             )
             (null)
            )
            (canon %init_peer_id% $option-inline  #option-inline-0)
           )
          )
         )
         (new %Deals_obj_map
          (seq
           (seq
            (seq
             (ap ("alchemyRpcDeployment" []) %Deals_obj_map)
             (ap ("integrationTestDeployment" #option-inline-0) %Deals_obj_map)
            )
            (ap ("secretHolderDeployment" []) %Deals_obj_map)
           )
           (canon %init_peer_id% %Deals_obj_map  Deals_obj)
          )
         )
        )
        (ap Deals_obj.$.secretHolderDeployment Deals_obj_flat)
       )
       (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
      )
      (xor
       (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
       (fail :error:)
      )
     )
     (new -if-else-error-
      (new -else-error-
       (new -if-error-
        (xor
         (match ret.$.success false
          (seq
           (seq
            (new %Error_obj_map
             (seq
              (seq
               (ap ("is_ok" false) %Error_obj_map)
               (ap ("message" ret.$.error.[0]) %Error_obj_map)
              )
              (canon %init_peer_id% %Error_obj_map  Error_obj)
             )
            )
            (new %ResolveSubnetResult_obj_map
             (seq
              (seq
               (ap ("error" Error_obj) %ResolveSubnetResult_obj_map)
               (ap ("value" []) %ResolveSubnetResult_obj_map)
              )
              (canon %init_peer_id% %ResolveSubnetResult_obj_map  ResolveSubnetResult_obj)
             )
            )
           )
           (ap ResolveSubnetResult_obj $result)
          )
         )
         (seq
          (ap :error: -if-error-)
          (xor
           (match :error:.$.error_code 10001
            (seq
             (seq
              (new %Error_obj-0_map
               (seq
                (seq
                 (ap ("is_ok" true) %Error_obj-0_map)
                 (ap ("message" "") %Error_obj-0_map)
                )
                (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
               )
              )
              (new %ResolveSubnetResult_obj-0_map
               (seq
                (seq
                 (ap ("error" Error_obj-0) %ResolveSubnetResult_obj-0_map)
                 (ap ("value" ret.$.workers) %ResolveSubnetResult_obj-0_map)
                )
                (canon %init_peer_id% %ResolveSubnetResult_obj-0_map  ResolveSubnetResult_obj-0)
               )
              )
             )
             (ap ResolveSubnetResult_obj-0 $result)
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
          (match #result_iter_canon.length 1
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
   (call %init_peer_id% ("callbackSrv" "response") [result_gate.$.[0]])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type ResolveSubnetResultType = { error: { is_ok: boolean; message: string; }; value: { host_id: string; pat_id: string; worker_id: string | null; }[]; }

export type ResolveSubnetParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type ResolveSubnetResult = Promise<ResolveSubnetResultType>;

export function resolveSubnet(...args: ResolveSubnetParams): ResolveSubnetResult {
    return callFunction$$(
        args,
        {
    "functionName": "resolveSubnet",
    "arrow": {
        "domain": {
            "fields": {},
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "ResolveSubnetResult",
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
                    "tag": "struct"
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
        resolveSubnet_script
    );
}

export const getSecret_script = `
(xor
 (new $secrets
  (seq
   (seq
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
             (call %init_peer_id% ("getDataSrv" "secret_id") [] -secret_id-arg-)
            )
            (new $option-inline
             (seq
              (xor
               (seq
                (new %IntegrationTestDeployment_obj_map
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (seq
                       (ap ("chainNetworkId" 31337) %IntegrationTestDeployment_obj_map)
                       (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %IntegrationTestDeployment_obj_map)
                      )
                      (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %IntegrationTestDeployment_obj_map)
                     )
                     (ap ("definition" "bafkreif2va2f476e43n6rr2yv53czyxruechzsjaykhhfu4baznm4yncuu") %IntegrationTestDeployment_obj_map)
                    )
                    (ap ("matched" true) %IntegrationTestDeployment_obj_map)
                   )
                   (ap ("timestamp" "2024-06-01T22:06:36.630Z") %IntegrationTestDeployment_obj_map)
                  )
                  (canon %init_peer_id% %IntegrationTestDeployment_obj_map  IntegrationTestDeployment_obj)
                 )
                )
                (ap IntegrationTestDeployment_obj $option-inline)
               )
               (null)
              )
              (canon %init_peer_id% $option-inline  #option-inline-0)
             )
            )
           )
           (new %Deals_obj_map
            (seq
             (seq
              (seq
               (ap ("alchemyRpcDeployment" []) %Deals_obj_map)
               (ap ("integrationTestDeployment" #option-inline-0) %Deals_obj_map)
              )
              (ap ("secretHolderDeployment" []) %Deals_obj_map)
             )
             (canon %init_peer_id% %Deals_obj_map  Deals_obj)
            )
           )
          )
          (ap Deals_obj.$.secretHolderDeployment Deals_obj_flat)
         )
         (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
        )
        (xor
         (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
         (fail :error:)
        )
       )
       (new -if-error-
        (xor
         (seq
          (match ret.$.success false
           (seq
            (new $array-inline
             (seq
              (seq
               (ap "Failed to resolve subnet: " $array-inline)
               (ap ret.$.error $array-inline)
              )
              (canon %init_peer_id% $array-inline  #array-inline-0)
             )
            )
            (call %init_peer_id% ("run-console" "print") [#array-inline-0])
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
           (ap :error: -if-error-)
           (xor
            (seq
             (match :error:.$.error_code 10001
              (null)
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
            (canon -relay- $-hop-  #-hopc-)
           )
          )
         )
        )
       )
      )
      (xor
       (fold ret.$.workers w-0
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
                    (call w-0.$.worker_id.[0] ("secret-holder" "prepare_to_use") [-secret_id-arg-] ret-0)
                   )
                   (call w-0.$.worker_id.[0] ("secret-user" "get_secret") [-secret_id-arg-] ret-1)
                  )
                  (ap ret-1 $secrets)
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
                   (new %GetSecretForUse_obj_map
                    (seq
                     (ap ("secret" []) %GetSecretForUse_obj_map)
                     (canon %init_peer_id% %GetSecretForUse_obj_map  GetSecretForUse_obj)
                    )
                   )
                  )
                  (new %GetSecretForUseResult_obj_map
                   (seq
                    (seq
                     (ap ("error" Error_obj) %GetSecretForUseResult_obj_map)
                     (ap ("value" GetSecretForUse_obj) %GetSecretForUseResult_obj_map)
                    )
                    (canon %init_peer_id% %GetSecretForUseResult_obj_map  GetSecretForUseResult_obj)
                   )
                  )
                 )
                 (ap GetSecretForUseResult_obj $secrets)
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
          (new %GetSecretForUse_obj-0_map
           (seq
            (ap ("secret" []) %GetSecretForUse_obj-0_map)
            (canon %init_peer_id% %GetSecretForUse_obj-0_map  GetSecretForUse_obj-0)
           )
          )
         )
         (new %GetSecretForUseResult_obj-0_map
          (seq
           (seq
            (ap ("error" Error_obj-0) %GetSecretForUseResult_obj-0_map)
            (ap ("value" GetSecretForUse_obj-0) %GetSecretForUseResult_obj-0_map)
           )
           (canon %init_peer_id% %GetSecretForUseResult_obj-0_map  GetSecretForUseResult_obj-0)
          )
         )
        )
        (ap GetSecretForUseResult_obj-0 $secrets)
       )
      )
     )
     (canon %init_peer_id% $secrets  #-secrets-fix-0)
    )
    (ap #-secrets-fix-0 -secrets-flat-0)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-secrets-flat-0])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetSecretParams = [secret_id: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, secret_id: string, config?: {ttl?: number}];

export type GetSecretResult = Promise<{ error: { is_ok: boolean; message: string; }; value: { secret: number[]; }; }[]>;

export function getSecret(...args: GetSecretParams): GetSecretResult {
    return callFunction$$(
        args,
        {
    "functionName": "getSecret",
    "arrow": {
        "domain": {
            "fields": {
                "secret_id": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "GetSecretForUseResult",
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
                                "name": "GetSecretForUse",
                                "fields": {
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
