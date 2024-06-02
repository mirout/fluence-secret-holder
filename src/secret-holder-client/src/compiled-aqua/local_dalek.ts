/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.13.0
 * @fluencelabs/aqua-to-js version: 0.3.5
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


// Functions
export const encrypt_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "dalek_service_id") [] -dalek_service_id-arg-)
      )
      (call %init_peer_id% ("getDataSrv" "message") [] -message-arg-)
     )
     (call %init_peer_id% ("getDataSrv" "self_private_key") [] -self_private_key-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "other_public_key") [] -other_public_key-arg-)
   )
   (call %init_peer_id% (-dalek_service_id-arg- "encrypt_message") [-message-arg- -self_private_key-arg- -other_public_key-arg-] ret)
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type EncryptArgSelf_private_key = { key: number[]; }
export type EncryptArgOther_public_key = { key: number[]; }

export type EncryptResultType = { error: { is_ok: boolean; message: string; }; value: { ciphertext: number[]; nonce: number[]; }; }

export type EncryptParams = [dalek_service_id: string, message: number[], self_private_key: EncryptArgSelf_private_key, other_public_key: EncryptArgOther_public_key, config?: {ttl?: number}] | [peer: IFluenceClient$$, dalek_service_id: string, message: number[], self_private_key: EncryptArgSelf_private_key, other_public_key: EncryptArgOther_public_key, config?: {ttl?: number}];

export type EncryptResult = Promise<EncryptResultType>;

export function encrypt(...args: EncryptParams): EncryptResult {
    return callFunction$$(
        args,
        {
    "functionName": "encrypt",
    "arrow": {
        "domain": {
            "fields": {
                "dalek_service_id": {
                    "name": "string",
                    "tag": "scalar"
                },
                "message": {
                    "type": {
                        "name": "u8",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "self_private_key": {
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
                "other_public_key": {
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
                    "name": "EncryptResult",
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
                            "name": "Encrypt",
                            "fields": {
                                "ciphertext": {
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
        encrypt_script
    );
}

export const deployLocalDalek_script = `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "dalekWasm") [] -dalekWasm-arg-)
   )
   (new $val
    (seq
     (seq
      (seq
       (call %init_peer_id% ("single_module_srv" "create") [-dalekWasm-arg-] ret)
       (xor
        (match ret.$.success true
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
             (new %Error_obj_map
              (seq
               (seq
                (ap ("is_ok" false) %Error_obj_map)
                (ap ("message" ret.$.error.[0]) %Error_obj_map)
               )
               (canon %init_peer_id% %Error_obj_map  Error_obj)
              )
             )
             (new %LocalDeployResult_obj_map
              (seq
               (seq
                (ap ("error" Error_obj) %LocalDeployResult_obj_map)
                (ap ("value" "") %LocalDeployResult_obj_map)
               )
               (canon %init_peer_id% %LocalDeployResult_obj_map  LocalDeployResult_obj)
              )
             )
            )
            (ap LocalDeployResult_obj $val)
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
               (new %LocalDeployResult_obj-0_map
                (seq
                 (seq
                  (ap ("error" Error_obj-0) %LocalDeployResult_obj-0_map)
                  (ap ("value" ret.$.service_id.[0]) %LocalDeployResult_obj-0_map)
                 )
                 (canon %init_peer_id% %LocalDeployResult_obj-0_map  LocalDeployResult_obj-0)
                )
               )
              )
              (ap LocalDeployResult_obj-0 $val)
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
     (new $val_test
      (seq
       (seq
        (fold $val val_fold_var
         (seq
          (seq
           (ap val_fold_var $val_test)
           (canon %init_peer_id% $val_test  #val_iter_canon)
          )
          (xor
           (match #val_iter_canon.length 1
            (null)
           )
           (next val_fold_var)
          )
         )
         (never)
        )
        (canon %init_peer_id% $val_test  #val_result_canon)
       )
       (ap #val_result_canon val_gate)
      )
     )
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [val_gate.$.[0]])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type DeployLocalDalekResultType = { error: { is_ok: boolean; message: string; }; value: string; }

export type DeployLocalDalekParams = [dalekWasm: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, dalekWasm: string, config?: {ttl?: number}];

export type DeployLocalDalekResult = Promise<DeployLocalDalekResultType>;

export function deployLocalDalek(...args: DeployLocalDalekParams): DeployLocalDalekResult {
    return callFunction$$(
        args,
        {
    "functionName": "deployLocalDalek",
    "arrow": {
        "domain": {
            "fields": {
                "dalekWasm": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "LocalDeployResult",
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
        deployLocalDalek_script
    );
}

export const decrypt_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "dalek_service_id") [] -dalek_service_id-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "ciphertext") [] -ciphertext-arg-)
      )
      (call %init_peer_id% ("getDataSrv" "nonce") [] -nonce-arg-)
     )
     (call %init_peer_id% ("getDataSrv" "self_private_key") [] -self_private_key-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "other_public_key") [] -other_public_key-arg-)
   )
   (call %init_peer_id% (-dalek_service_id-arg- "decrypt_message") [-ciphertext-arg- -nonce-arg- -self_private_key-arg- -other_public_key-arg-] ret)
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type DecryptArgSelf_private_key = { key: number[]; }
export type DecryptArgOther_public_key = { key: number[]; }

export type DecryptResultType = { error: { is_ok: boolean; message: string; }; value: { ciphertext: number[]; }; }

export type DecryptParams = [dalek_service_id: string, ciphertext: number[], nonce: number[], self_private_key: DecryptArgSelf_private_key, other_public_key: DecryptArgOther_public_key, config?: {ttl?: number}] | [peer: IFluenceClient$$, dalek_service_id: string, ciphertext: number[], nonce: number[], self_private_key: DecryptArgSelf_private_key, other_public_key: DecryptArgOther_public_key, config?: {ttl?: number}];

export type DecryptResult = Promise<DecryptResultType>;

export function decrypt(...args: DecryptParams): DecryptResult {
    return callFunction$$(
        args,
        {
    "functionName": "decrypt",
    "arrow": {
        "domain": {
            "fields": {
                "dalek_service_id": {
                    "name": "string",
                    "tag": "scalar"
                },
                "ciphertext": {
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
                "self_private_key": {
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
                "other_public_key": {
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
                    "name": "DecryptResult",
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
                            "name": "Decrypt",
                            "fields": {
                                "ciphertext": {
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
        decrypt_script
    );
}

export const generateKeys_script = `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "dalekSerivceId") [] -dalekSerivceId-arg-)
   )
   (call %init_peer_id% (-dalekSerivceId-arg- "generate_random_key") [] ret)
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GenerateKeysResultType = { private_key: { key: number[]; }; public_key: { key: number[]; }; }

export type GenerateKeysParams = [dalekSerivceId: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, dalekSerivceId: string, config?: {ttl?: number}];

export type GenerateKeysResult = Promise<GenerateKeysResultType>;

export function generateKeys(...args: GenerateKeysParams): GenerateKeysResult {
    return callFunction$$(
        args,
        {
    "functionName": "generateKeys",
    "arrow": {
        "domain": {
            "fields": {
                "dalekSerivceId": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "GenerateResult",
                    "fields": {
                        "private_key": {
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
        generateKeys_script
    );
}
