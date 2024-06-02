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


// Functions
export const initializeSecretHolderAll_script = `
(xor
 (new $res-0
  (new $res
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
            (ap Deals_obj.$.integrationTestDeployment Deals_obj_flat)
           )
           (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
          )
          (xor
           (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
           (fail :error:)
          )
         )
         (xor
          (match ret.$.success true
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
                    (call w-0.$.worker_id.[0] ("secret-holder" "initialize") [] ret-0)
                   )
                   (new %WorkerError_obj_map
                    (seq
                     (seq
                      (ap ("error" ret-0) %WorkerError_obj_map)
                      (ap ("workerId" w-0.$.worker_id.[0]) %WorkerError_obj_map)
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
                  (new %Error_obj_map
                   (seq
                    (seq
                     (ap ("is_ok" false) %Error_obj_map)
                     (ap ("message" "Worker id is nil") %Error_obj_map)
                    )
                    (canon %init_peer_id% %Error_obj_map  Error_obj)
                   )
                  )
                  (new %WorkerError_obj-0_map
                   (seq
                    (seq
                     (ap ("error" Error_obj) %WorkerError_obj-0_map)
                     (ap ("workerId" "") %WorkerError_obj-0_map)
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
      (canon %init_peer_id% $res-0  #-res-fix-3)
     )
     (ap #-res-fix-3 -res-flat-3)
    )
    (call %init_peer_id% ("callbackSrv" "response") [-res-flat-3])
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type InitializeSecretHolderAllParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type InitializeSecretHolderAllResult = Promise<{ error: { is_ok: boolean; message: string; }; workerId: string; }[]>;

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
        initializeSecretHolderAll_script
    );
}

export const getSecretUser1_script = `
(xor
 (new $errors
  (new $res
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
               (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
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
            (ap Deals_obj.$.integrationTestDeployment Deals_obj_flat)
           )
           (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
          )
          (xor
           (seq
            (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (fail :error:)
          )
         )
         (fold ret.$.workers w-0
          (seq
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
                     (call w-0.$.worker_id.[0] ("secret-holder" "prepare_to_use") [-secretId-arg-] ret-0)
                    )
                    (ap ret-0 $errors)
                   )
                   (call w-0.$.worker_id.[0] ("secret-user" "get_secret") [-secretId-arg-] ret-1)
                  )
                  (ap ret-1 $res)
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
                (null)
               )
               (fail -if-error-)
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
      (canon %init_peer_id% $errors  #-errors-fix-0)
     )
     (ap #-errors-fix-0 -errors-flat-0)
    )
    (call %init_peer_id% ("callbackSrv" "response") [-res-flat-0 -errors-flat-0])
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetSecretUser1ResultType = [{ error: { is_ok: boolean; message: string; }; value: { secret: number[]; }; }[], { is_ok: boolean; message: string; }[]]

export type GetSecretUser1Params = [secretId: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: string, config?: {ttl?: number}];

export type GetSecretUser1Result = Promise<GetSecretUser1ResultType>;

export function getSecretUser1(...args: GetSecretUser1Params): GetSecretUser1Result {
    return callFunction$$(
        args,
        {
    "functionName": "getSecretUser1",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
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
                },
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
        getSecretUser1_script
    );
}

export const getIntegrationTestsDeal_script = `
(xor
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
    (ap Deals_obj.$.integrationTestDeployment Deals_obj_flat)
   )
   (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
  )
  (call %init_peer_id% ("callbackSrv" "response") [Deals_obj_flat_flat])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetIntegrationTestsDealParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type GetIntegrationTestsDealResult = Promise<string>;

export function getIntegrationTestsDeal(...args: GetIntegrationTestsDealParams): GetIntegrationTestsDealResult {
    return callFunction$$(
        args,
        {
    "functionName": "getIntegrationTestsDeal",
    "arrow": {
        "domain": {
            "fields": {},
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "string",
                    "tag": "scalar"
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
        getIntegrationTestsDeal_script
    );
}

export const getSecretUser2_script = `
(xor
 (new $errors
  (new $res
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
               (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
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
            (ap Deals_obj.$.integrationTestDeployment Deals_obj_flat)
           )
           (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
          )
          (xor
           (seq
            (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (fail :error:)
          )
         )
         (fold ret.$.workers w-0
          (seq
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
                     (call w-0.$.worker_id.[0] ("secret-holder" "prepare_to_use") [-secretId-arg-] ret-0)
                    )
                    (ap ret-0 $errors)
                   )
                   (call w-0.$.worker_id.[0] ("secret-user-2" "get_secret") [-secretId-arg-] ret-1)
                  )
                  (ap ret-1 $res)
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
                (null)
               )
               (fail -if-error-)
              )
             )
            )
           )
           (next w-0)
          )
          (null)
         )
        )
        (canon %init_peer_id% $res  #-res-fix-1)
       )
       (ap #-res-fix-1 -res-flat-1)
      )
      (canon %init_peer_id% $errors  #-errors-fix-1)
     )
     (ap #-errors-fix-1 -errors-flat-1)
    )
    (call %init_peer_id% ("callbackSrv" "response") [-res-flat-1 -errors-flat-1])
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetSecretUser2ResultType = [{ error: { is_ok: boolean; message: string; }; value: { secret: number[]; }; }[], { is_ok: boolean; message: string; }[]]

export type GetSecretUser2Params = [secretId: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: string, config?: {ttl?: number}];

export type GetSecretUser2Result = Promise<GetSecretUser2ResultType>;

export function getSecretUser2(...args: GetSecretUser2Params): GetSecretUser2Result {
    return callFunction$$(
        args,
        {
    "functionName": "getSecretUser2",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
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
                },
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
        getSecretUser2_script
    );
}

export const getAndUseSecretUser2_script = `
(xor
 (new $errors
  (new $res
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
                (call %init_peer_id% ("getDataSrv" "secretId") [] -secretId-arg-)
               )
               (call %init_peer_id% ("getDataSrv" "calldata") [] -calldata-arg-)
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
            (ap Deals_obj.$.integrationTestDeployment Deals_obj_flat)
           )
           (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
          )
          (xor
           (seq
            (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
            (new $-hop-
             (new #-hopc-
              (canon -relay- $-hop-  #-hopc-)
             )
            )
           )
           (fail :error:)
          )
         )
         (fold ret.$.workers w-0
          (seq
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
                     (call w-0.$.worker_id.[0] ("secret-holder" "prepare_to_use") [-secretId-arg-] ret-0)
                    )
                    (ap ret-0 $errors)
                   )
                   (call w-0.$.worker_id.[0] ("secret-user-2" "get_and_use_secret") [-secretId-arg- -calldata-arg-] ret-1)
                  )
                  (ap ret-1 $res)
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
                (null)
               )
               (fail -if-error-)
              )
             )
            )
           )
           (next w-0)
          )
          (null)
         )
        )
        (canon %init_peer_id% $res  #-res-fix-2)
       )
       (ap #-res-fix-2 -res-flat-2)
      )
      (canon %init_peer_id% $errors  #-errors-fix-2)
     )
     (ap #-errors-fix-2 -errors-flat-2)
    )
    (call %init_peer_id% ("callbackSrv" "response") [-res-flat-2 -errors-flat-2])
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetAndUseSecretUser2ResultType = [{ error: { is_ok: boolean; message: string; }; value: { result: number[]; }; }[], { is_ok: boolean; message: string; }[]]

export type GetAndUseSecretUser2Params = [secretId: string, calldata: number[], config?: {ttl?: number}] | [peer: IFluenceClient$$, secretId: string, calldata: number[], config?: {ttl?: number}];

export type GetAndUseSecretUser2Result = Promise<GetAndUseSecretUser2ResultType>;

export function getAndUseSecretUser2(...args: GetAndUseSecretUser2Params): GetAndUseSecretUser2Result {
    return callFunction$$(
        args,
        {
    "functionName": "getAndUseSecretUser2",
    "arrow": {
        "domain": {
            "fields": {
                "secretId": {
                    "name": "string",
                    "tag": "scalar"
                },
                "calldata": {
                    "type": {
                        "name": "u8",
                        "tag": "scalar"
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
                        "name": "UseSecretResult",
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
                                "name": "UseSecret",
                                "fields": {
                                    "result": {
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
                },
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
        getAndUseSecretUser2_script
    );
}
