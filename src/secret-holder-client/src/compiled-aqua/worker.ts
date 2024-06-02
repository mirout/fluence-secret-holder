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
export const getWorkerServices_script = `
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
             (new $services
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
                      (call w-0.$.worker_id.[0] ("srv" "list") [] ret)
                     )
                     (fold ret s-0
                      (seq
                       (seq
                        (seq
                         (seq
                          (call w-0.$.worker_id.[0] ("srv" "info") [s-0.$.id] ret-0)
                          (new %Id_obj_map
                           (seq
                            (ap ("id" s-0.$.id) %Id_obj_map)
                            (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                           )
                          )
                         )
                         (new %ServiceIdAlias_obj_map
                          (seq
                           (seq
                            (ap ("aliases" s-0.$.aliases) %ServiceIdAlias_obj_map)
                            (ap ("serviceId" Id_obj) %ServiceIdAlias_obj_map)
                           )
                           (canon w-0.$.worker_id.[0] %ServiceIdAlias_obj_map  ServiceIdAlias_obj)
                          )
                         )
                        )
                        (ap ServiceIdAlias_obj $services)
                       )
                       (next s-0)
                      )
                      (null)
                     )
                    )
                    (par
                     (new %Error_obj_map
                      (seq
                       (seq
                        (ap ("is_ok" true) %Error_obj_map)
                        (ap ("message" "") %Error_obj_map)
                       )
                       (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                      )
                     )
                     (seq
                      (new %Id_obj-0_map
                       (seq
                        (ap ("id" w-0.$.worker_id.[0]) %Id_obj-0_map)
                        (canon w-0.$.worker_id.[0] %Id_obj-0_map  Id_obj-0)
                       )
                      )
                      (new %WorkerWithServicesId_obj_map
                       (seq
                        (seq
                         (seq
                          (canon w-0.$.worker_id.[0] $services  #services_canon)
                          (ap ("services" #services_canon) %WorkerWithServicesId_obj_map)
                         )
                         (ap ("workerId" Id_obj-0) %WorkerWithServicesId_obj_map)
                        )
                        (canon w-0.$.worker_id.[0] %WorkerWithServicesId_obj_map  WorkerWithServicesId_obj)
                       )
                      )
                     )
                    )
                   )
                   (new %GetWorkerServicesServicesResult_obj_map
                    (seq
                     (seq
                      (ap ("error" Error_obj) %GetWorkerServicesServicesResult_obj_map)
                      (ap ("value" WorkerWithServicesId_obj) %GetWorkerServicesServicesResult_obj_map)
                     )
                     (canon w-0.$.worker_id.[0] %GetWorkerServicesServicesResult_obj_map  GetWorkerServicesServicesResult_obj)
                    )
                   )
                  )
                  (ap GetWorkerServicesServicesResult_obj $res)
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
                (seq
                 (seq
                  (seq
                   (new %Error_obj-0_map
                    (seq
                     (seq
                      (ap ("is_ok" false) %Error_obj-0_map)
                      (ap ("message" "Worker id is nil") %Error_obj-0_map)
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
                  (new %WorkerWithServicesId_obj-0_map
                   (seq
                    (seq
                     (ap ("services" []) %WorkerWithServicesId_obj-0_map)
                     (ap ("workerId" Id_obj-1) %WorkerWithServicesId_obj-0_map)
                    )
                    (canon %init_peer_id% %WorkerWithServicesId_obj-0_map  WorkerWithServicesId_obj-0)
                   )
                  )
                 )
                 (new %GetWorkerServicesServicesResult_obj-0_map
                  (seq
                   (seq
                    (ap ("error" Error_obj-0) %GetWorkerServicesServicesResult_obj-0_map)
                    (ap ("value" WorkerWithServicesId_obj-0) %GetWorkerServicesServicesResult_obj-0_map)
                   )
                   (canon %init_peer_id% %GetWorkerServicesServicesResult_obj-0_map  GetWorkerServicesServicesResult_obj-0)
                  )
                 )
                )
                (ap GetWorkerServicesServicesResult_obj-0 $res)
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

export type GetWorkerServicesParams = [workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], config?: {ttl?: number}];

export type GetWorkerServicesResult = Promise<{ error: { is_ok: boolean; message: string; }; value: { services: { aliases: string[]; serviceId: { id: string; }; }[]; workerId: { id: string; }; }; }[]>;

export function getWorkerServices(...args: GetWorkerServicesParams): GetWorkerServicesResult {
    return callFunction$$(
        args,
        {
    "functionName": "getWorkerServices",
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
                        "name": "GetWorkerServicesServicesResult",
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
                                "name": "WorkerWithServicesId",
                                "fields": {
                                    "services": {
                                        "type": {
                                            "name": "ServiceIdAlias",
                                            "fields": {
                                                "aliases": {
                                                    "type": {
                                                        "name": "string",
                                                        "tag": "scalar"
                                                    },
                                                    "tag": "array"
                                                },
                                                "serviceId": {
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
        getWorkerServices_script
    );
}

export const getWorkerServiceSignature_script = `
(xor
 (new $res
  (seq
   (seq
    (seq
     (seq
      (seq
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "input") [] -input-arg-)
      )
      (fold -input-arg- w-0
       (seq
        (new -if-else-error-
         (new -else-error-
          (new -if-error-
           (xor
            (mismatch w-0.$.worker.worker_id []
             (new $signatures
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
                        (canon w-0.$.worker.host_id $-hop-  #-hopc-)
                       )
                      )
                     )
                     (fold w-0.$.serviceIds srvId-0
                      (seq
                       (seq
                        (seq
                         (call w-0.$.worker.worker_id.[0] ("srv" "get_interface") [srvId-0.$.id] ret)
                         (new %ServiceWithSignatures_obj_map
                          (seq
                           (seq
                            (ap ("interface" ret.$.function_signatures) %ServiceWithSignatures_obj_map)
                            (ap ("serviceId" srvId-0) %ServiceWithSignatures_obj_map)
                           )
                           (canon w-0.$.worker.worker_id.[0] %ServiceWithSignatures_obj_map  ServiceWithSignatures_obj)
                          )
                         )
                        )
                        (ap ServiceWithSignatures_obj $signatures)
                       )
                       (next srvId-0)
                      )
                      (null)
                     )
                    )
                    (par
                     (new %Error_obj_map
                      (seq
                       (seq
                        (ap ("is_ok" true) %Error_obj_map)
                        (ap ("message" "") %Error_obj_map)
                       )
                       (canon w-0.$.worker.worker_id.[0] %Error_obj_map  Error_obj)
                      )
                     )
                     (seq
                      (new %Id_obj_map
                       (seq
                        (ap ("id" w-0.$.worker.worker_id.[0]) %Id_obj_map)
                        (canon w-0.$.worker.worker_id.[0] %Id_obj_map  Id_obj)
                       )
                      )
                      (new %WorkerServices_obj_map
                       (seq
                        (seq
                         (seq
                          (canon w-0.$.worker.worker_id.[0] $signatures  #signatures_canon)
                          (ap ("services" #signatures_canon) %WorkerServices_obj_map)
                         )
                         (ap ("workerId" Id_obj) %WorkerServices_obj_map)
                        )
                        (canon w-0.$.worker.worker_id.[0] %WorkerServices_obj_map  WorkerServices_obj)
                       )
                      )
                     )
                    )
                   )
                   (new %GetWorkerServiceSignaturesResult_obj_map
                    (seq
                     (seq
                      (ap ("error" Error_obj) %GetWorkerServiceSignaturesResult_obj_map)
                      (ap ("value" WorkerServices_obj) %GetWorkerServiceSignaturesResult_obj_map)
                     )
                     (canon w-0.$.worker.worker_id.[0] %GetWorkerServiceSignaturesResult_obj_map  GetWorkerServiceSignaturesResult_obj)
                    )
                   )
                  )
                  (ap GetWorkerServiceSignaturesResult_obj $res)
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon w-0.$.worker.host_id $-hop-  #-hopc-)
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
                    (canon w-0.$.worker.host_id $-hop-  #-hopc-)
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
                (seq
                 (seq
                  (seq
                   (new %Error_obj-0_map
                    (seq
                     (seq
                      (ap ("is_ok" false) %Error_obj-0_map)
                      (ap ("message" "Worker id is nil") %Error_obj-0_map)
                     )
                     (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
                    )
                   )
                   (new %Id_obj-0_map
                    (seq
                     (ap ("id" "") %Id_obj-0_map)
                     (canon %init_peer_id% %Id_obj-0_map  Id_obj-0)
                    )
                   )
                  )
                  (new %WorkerServices_obj-0_map
                   (seq
                    (seq
                     (ap ("services" []) %WorkerServices_obj-0_map)
                     (ap ("workerId" Id_obj-0) %WorkerServices_obj-0_map)
                    )
                    (canon %init_peer_id% %WorkerServices_obj-0_map  WorkerServices_obj-0)
                   )
                  )
                 )
                 (new %GetWorkerServiceSignaturesResult_obj-0_map
                  (seq
                   (seq
                    (ap ("error" Error_obj-0) %GetWorkerServiceSignaturesResult_obj-0_map)
                    (ap ("value" WorkerServices_obj-0) %GetWorkerServiceSignaturesResult_obj-0_map)
                   )
                   (canon %init_peer_id% %GetWorkerServiceSignaturesResult_obj-0_map  GetWorkerServiceSignaturesResult_obj-0)
                  )
                 )
                )
                (ap GetWorkerServiceSignaturesResult_obj-0 $res)
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
     (canon %init_peer_id% $res  #-res-fix-1)
    )
    (ap #-res-fix-1 -res-flat-1)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-res-flat-1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetWorkerServiceSignatureParams = [input: { serviceIds: { id: string; }[]; worker: { host_id: string; pat_id: string; worker_id: string | null; }; }[], config?: {ttl?: number}] | [peer: IFluenceClient$$, input: { serviceIds: { id: string; }[]; worker: { host_id: string; pat_id: string; worker_id: string | null; }; }[], config?: {ttl?: number}];

export type GetWorkerServiceSignatureResult = Promise<{ error: { is_ok: boolean; message: string; }; value: { services: { interface: { arguments: string[][]; name: string; output_types: string[]; }[]; serviceId: { id: string; }; }[]; workerId: { id: string; }; }; }[]>;

export function getWorkerServiceSignature(...args: GetWorkerServiceSignatureParams): GetWorkerServiceSignatureResult {
    return callFunction$$(
        args,
        {
    "functionName": "getWorkerServiceSignature",
    "arrow": {
        "domain": {
            "fields": {
                "input": {
                    "type": {
                        "name": "WorkerWithServiceIds",
                        "fields": {
                            "serviceIds": {
                                "type": {
                                    "name": "Id",
                                    "fields": {
                                        "id": {
                                            "name": "string",
                                            "tag": "scalar"
                                        }
                                    },
                                    "tag": "struct"
                                },
                                "tag": "array"
                            },
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
                        "name": "GetWorkerServiceSignaturesResult",
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
                                "name": "WorkerServices",
                                "fields": {
                                    "services": {
                                        "type": {
                                            "name": "ServiceWithSignatures",
                                            "fields": {
                                                "interface": {
                                                    "type": {
                                                        "name": "FunctionSignature",
                                                        "fields": {
                                                            "arguments": {
                                                                "type": {
                                                                    "type": {
                                                                        "name": "string",
                                                                        "tag": "scalar"
                                                                    },
                                                                    "tag": "array"
                                                                },
                                                                "tag": "array"
                                                            },
                                                            "name": {
                                                                "name": "string",
                                                                "tag": "scalar"
                                                            },
                                                            "output_types": {
                                                                "type": {
                                                                    "name": "string",
                                                                    "tag": "scalar"
                                                                },
                                                                "tag": "array"
                                                            }
                                                        },
                                                        "tag": "struct"
                                                    },
                                                    "tag": "array"
                                                },
                                                "serviceId": {
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
        getWorkerServiceSignature_script
    );
}

export const getWorkerServiceSignatureByAlias_script = `
(xor
 (new $res
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "workers") [] -workers-arg-)
       )
       (call %init_peer_id% ("getDataSrv" "aliases") [] -aliases-arg-)
      )
      (fold -workers-arg- w-0
       (seq
        (new -if-else-error-
         (new -else-error-
          (new -if-error-
           (xor
            (mismatch w-0.$.worker_id []
             (new $signatures
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
                     (fold -aliases-arg- a-0
                      (seq
                       (seq
                        (seq
                         (seq
                          (call w-0.$.worker_id.[0] ("srv" "resolve_alias") [a-0] ret)
                          (call w-0.$.worker_id.[0] ("srv" "get_interface") [ret] ret-0)
                         )
                         (new %ServiceAliasWithSignatures_obj_map
                          (seq
                           (seq
                            (ap ("interface" ret-0.$.function_signatures) %ServiceAliasWithSignatures_obj_map)
                            (ap ("serviceAlias" a-0) %ServiceAliasWithSignatures_obj_map)
                           )
                           (canon w-0.$.worker_id.[0] %ServiceAliasWithSignatures_obj_map  ServiceAliasWithSignatures_obj)
                          )
                         )
                        )
                        (ap ServiceAliasWithSignatures_obj $signatures)
                       )
                       (next a-0)
                      )
                      (null)
                     )
                    )
                    (par
                     (new %Error_obj_map
                      (seq
                       (seq
                        (ap ("is_ok" true) %Error_obj_map)
                        (ap ("message" "") %Error_obj_map)
                       )
                       (canon w-0.$.worker_id.[0] %Error_obj_map  Error_obj)
                      )
                     )
                     (seq
                      (new %Id_obj_map
                       (seq
                        (ap ("id" w-0.$.worker_id.[0]) %Id_obj_map)
                        (canon w-0.$.worker_id.[0] %Id_obj_map  Id_obj)
                       )
                      )
                      (new %WorkerServicesAlias_obj_map
                       (seq
                        (seq
                         (seq
                          (canon w-0.$.worker_id.[0] $signatures  #signatures_canon)
                          (ap ("services" #signatures_canon) %WorkerServicesAlias_obj_map)
                         )
                         (ap ("workerId" Id_obj) %WorkerServicesAlias_obj_map)
                        )
                        (canon w-0.$.worker_id.[0] %WorkerServicesAlias_obj_map  WorkerServicesAlias_obj)
                       )
                      )
                     )
                    )
                   )
                   (new %GetWorkerServiceSignaturesByAliasResult_obj_map
                    (seq
                     (seq
                      (ap ("error" Error_obj) %GetWorkerServiceSignaturesByAliasResult_obj_map)
                      (ap ("value" WorkerServicesAlias_obj) %GetWorkerServiceSignaturesByAliasResult_obj_map)
                     )
                     (canon w-0.$.worker_id.[0] %GetWorkerServiceSignaturesByAliasResult_obj_map  GetWorkerServiceSignaturesByAliasResult_obj)
                    )
                   )
                  )
                  (ap GetWorkerServiceSignaturesByAliasResult_obj $res)
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
                (seq
                 (seq
                  (seq
                   (new %Error_obj-0_map
                    (seq
                     (seq
                      (ap ("is_ok" false) %Error_obj-0_map)
                      (ap ("message" "Worker id is nil") %Error_obj-0_map)
                     )
                     (canon %init_peer_id% %Error_obj-0_map  Error_obj-0)
                    )
                   )
                   (new %Id_obj-0_map
                    (seq
                     (ap ("id" "") %Id_obj-0_map)
                     (canon %init_peer_id% %Id_obj-0_map  Id_obj-0)
                    )
                   )
                  )
                  (new %WorkerServicesAlias_obj-0_map
                   (seq
                    (seq
                     (ap ("services" []) %WorkerServicesAlias_obj-0_map)
                     (ap ("workerId" Id_obj-0) %WorkerServicesAlias_obj-0_map)
                    )
                    (canon %init_peer_id% %WorkerServicesAlias_obj-0_map  WorkerServicesAlias_obj-0)
                   )
                  )
                 )
                 (new %GetWorkerServiceSignaturesByAliasResult_obj-0_map
                  (seq
                   (seq
                    (ap ("error" Error_obj-0) %GetWorkerServiceSignaturesByAliasResult_obj-0_map)
                    (ap ("value" WorkerServicesAlias_obj-0) %GetWorkerServiceSignaturesByAliasResult_obj-0_map)
                   )
                   (canon %init_peer_id% %GetWorkerServiceSignaturesByAliasResult_obj-0_map  GetWorkerServiceSignaturesByAliasResult_obj-0)
                  )
                 )
                )
                (ap GetWorkerServiceSignaturesByAliasResult_obj-0 $res)
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
     (canon %init_peer_id% $res  #-res-fix-2)
    )
    (ap #-res-fix-2 -res-flat-2)
   )
   (call %init_peer_id% ("callbackSrv" "response") [-res-flat-2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type GetWorkerServiceSignatureByAliasParams = [workers: { host_id: string; pat_id: string; worker_id: string | null; }[], aliases: string[], config?: {ttl?: number}] | [peer: IFluenceClient$$, workers: { host_id: string; pat_id: string; worker_id: string | null; }[], aliases: string[], config?: {ttl?: number}];

export type GetWorkerServiceSignatureByAliasResult = Promise<{ error: { is_ok: boolean; message: string; }; value: { services: { interface: { arguments: string[][]; name: string; output_types: string[]; }[]; serviceAlias: string; }[]; workerId: { id: string; }; }; }[]>;

export function getWorkerServiceSignatureByAlias(...args: GetWorkerServiceSignatureByAliasParams): GetWorkerServiceSignatureByAliasResult {
    return callFunction$$(
        args,
        {
    "functionName": "getWorkerServiceSignatureByAlias",
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
                "aliases": {
                    "type": {
                        "name": "string",
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
                        "name": "GetWorkerServiceSignaturesByAliasResult",
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
                                "name": "WorkerServicesAlias",
                                "fields": {
                                    "services": {
                                        "type": {
                                            "name": "ServiceAliasWithSignatures",
                                            "fields": {
                                                "interface": {
                                                    "type": {
                                                        "name": "FunctionSignature",
                                                        "fields": {
                                                            "arguments": {
                                                                "type": {
                                                                    "type": {
                                                                        "name": "string",
                                                                        "tag": "scalar"
                                                                    },
                                                                    "tag": "array"
                                                                },
                                                                "tag": "array"
                                                            },
                                                            "name": {
                                                                "name": "string",
                                                                "tag": "scalar"
                                                            },
                                                            "output_types": {
                                                                "type": {
                                                                    "name": "string",
                                                                    "tag": "scalar"
                                                                },
                                                                "tag": "array"
                                                            }
                                                        },
                                                        "tag": "struct"
                                                    },
                                                    "tag": "array"
                                                },
                                                "serviceAlias": {
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
        getWorkerServiceSignatureByAlias_script
    );
}
