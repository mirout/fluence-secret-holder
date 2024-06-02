use crypto_imports::imports as crypto;
use crypto_utils::types::KeyVec;
use marine_error::Error;
use marine_error::MarineResult;
use marine_error_derive::wrap_marine_result;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;
use secret_mover_imports::imports as secret_mover;

use secret_facade::types::*;

module_manifest!();

fn main() {}

#[wrap_marine_result("initialize")]
pub fn initialize_internal() -> Result<(), Error> {
    secret_saver_adapter_bindings::initialize_db().into()
}

#[wrap_marine_result("start_handshake")]
pub fn start_handshake_internal() -> Result<StartHandshake, Error> {
    let result: Result<_, Error> = crypto::prepare_for_handshake().into();
    result.map(|res| StartHandshake {
        public_key: res.public_key,
    })
}

#[wrap_marine_result("save_secret")]
pub fn save_secret_internal(input: SaveSecretRequest) -> Result<SaveSecret, Error> {
    let secret: Result<_, Error> = crypto::decrypt_message(
        input.metadata.self_public_key,
        input.metadata.other_public_key,
        input.metadata.nonce,
        input.ciphertext,
    )
    .into();
    let secret = secret.map_err(|e| e.with_context("decrypting message".to_string()))?;

    let result: MarineResult<_> =
        secret_saver_adapter_bindings::create_secret_effect(secret.ciphertext, input.expired_at)
            .into();

    result
        .map(|val| SaveSecret {
            secret_id: val.secret_id,
        })
        .map_err(|e| e.with_context("saving secret".to_string()))
}

#[wrap_marine_result("get_secret")]
pub fn get_secret_internal(input: GetSecretRequest) -> Result<GetSecret, Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::get_secret_effect(input.secret_id, true).into();
    let result = result.map_err(|e| e.with_context("getting secret".to_string()))?;

    let secret: Result<_, Error> = crypto::encrypt_message(
        input.metadata.self_public_key,
        input.metadata.other_public_key,
        result.model.secret,
    )
    .into();

    secret
        .map(|res| GetSecret {
            secret: res.ciphertext,
            nonce: res.nonce,
        })
        .map_err(|e| e.with_context("encrypting message".to_string()))
}

#[wrap_marine_result("delete_secret")]
pub fn delete_secret_internal(secret_id: String) -> Result<(), Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::delete_secret(secret_id.clone()).into();
    result.map_err(|e| e.with_context("deleting secret".to_string()))?;
    Ok(())
}

#[wrap_marine_result("prepare_to_use")]
pub fn prepare_to_use_internal(secret_id: String) -> Result<(), Error> {
    let secret: MarineResult<_> =
        secret_saver_adapter_bindings::get_secret_effect(secret_id.clone(), false).into();
    let secret = secret
        .map_err(|e| e.with_context("getting secret".to_string()))?
        .model;

    if secret.shared_secret.len() != crypto_utils::constant::KEY_LEN {
        return Err(Error::new("shared secret is not ready".to_string()));
    }

    let call_parameters = marine_rs_sdk::get_call_parameters();

    if secret.expired_at != 0 && secret.expired_at < call_parameters.particle.timestamp {
        return Err(Error::new("secret is expired".to_string()));
    }

    let shared_secret = KeyVec::new(secret.shared_secret);
    let nonce = secret.nonce.to_be_bytes().to_vec();

    let encrypted = crypto_utils::encrypt_by_shared_secret(
        secret.secret,
        &shared_secret.try_into().unwrap(),
        nonce,
    )?;

    let increase: MarineResult<()> =
        secret_saver_adapter_bindings::increase_secret_nonce_effect(secret_id.clone()).into();
    increase.map_err(|e| e.with_context("increasing nonce".to_string()))?;

    let result: MarineResult<_> =
        secret_mover::save_to_particle_vault(secret_id, encrypted.ciphertext, secret.nonce).into();
    result.map_err(|e| e.with_context("saving to particle vault".to_string()))?;

    Ok(())
}

#[wrap_marine_result("secret_key_init")]
pub fn secret_key_init_internal(secret_id: String, step: u8, users_count: u8) -> Result<(), Error> {
    let res: MarineResult<_> =
        secret_mover::secret_initiate_handshake(secret_id.clone(), users_count, step).into();
    let res = res.map_err(|e| e.with_context("initiating handshake".to_string()))?;
    if res.is_complete {
        let key_save_result: MarineResult<_> =
            secret_saver_adapter_bindings::change_secret_shared_secret_effect(
                secret_id.clone(),
                res.shared_secret.key,
            )
            .into();
        key_save_result.map_err(|e| e.with_context("saving shared secret".to_string()))?;
    }
    Ok(())
}

#[wrap_marine_result("is_secret_available_for_use")]
pub fn is_secret_available_for_use_internal(secret_id: String) -> Result<(), Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::get_secret_effect(secret_id.clone(), false).into();
    let result = result.map_err(|e| e.with_context("secret not found".to_string()))?;

    let now = marine_rs_sdk::get_call_parameters().particle.timestamp;
    if result.model.expired_at != 0 && result.model.expired_at < now {
        return Err(Error::new("secret is expired".to_string()));
    }

    Ok(())
}

#[wrap_marine_result("is_secret_owner")]
pub fn is_secret_owner_internal(secret_id: String) -> Result<(), Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::get_secret_effect(secret_id.clone(), false).into();
    result.map_err(|e| e.with_context("getting secret".to_string()))?;
    Ok(())
}

#[wrap_marine_result("get_all_available_for_use_secrets")]
pub fn get_all_available_for_use_internal() -> Result<GetAllAvailableSecrets, Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::get_all_secrets_effect(false).into();
    result
        .map(|res| GetAllAvailableSecrets {
            secret_ids: res.secrets.into_iter().map(|s| s.id).collect(),
        })
        .map_err(|e| e.with_context("getting all available secrets".to_string()))
}

#[wrap_marine_result("get_all_ownable_secrets")]
pub fn get_all_ownable_internal() -> Result<GetAllAvailableSecrets, Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::get_all_secrets_effect(true).into();
    result
        .map(|res| GetAllAvailableSecrets {
            secret_ids: res.secrets.into_iter().map(|s| s.id).collect(),
        })
        .map_err(|e| e.with_context("getting all ownable secrets".to_string()))
}

#[wrap_marine_result("change_visibility")]
pub fn change_visibility_internal(secret_id: String, is_anyone_can_use: bool) -> Result<(), Error> {
    let result: MarineResult<_> = secret_saver_adapter_bindings::change_visibility_effect(
        secret_id.clone(),
        is_anyone_can_use,
    )
    .into();
    result.map_err(|e| e.with_context("changing visibility".to_string()))
}

#[wrap_marine_result("update_expiration")]
pub fn update_expiration_internal(secret_id: String, expired_at: u64) -> Result<(), Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::update_expiration(secret_id.clone(), expired_at).into();
    result.map_err(|e| e.with_context("updating expiration".to_string()))
}

#[wrap_marine_result("get_secret_metadata")]
pub fn get_secret_metadata_internal(secret_id: String) -> Result<SecretMetadata, Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::get_secret_effect(secret_id.clone(), true).into();
    let result = result.map_err(|e| e.with_context("getting secret".to_string()))?;

    Ok(SecretMetadata {
        is_anyone_can_use: result.model.is_anyone_can_use,
        expired_at: result.model.expired_at,
    })
}

#[wrap_marine_result("permit_role")]
pub fn permit_role_internal(secret_id: String, user_id: String, role: String) -> Result<(), Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::permit_role_effect(secret_id, user_id, role).into();
    result.map_err(|e| e.with_context("permitting role".to_string()))
}

#[wrap_marine_result("revoke_role")]
pub fn revoke_role_internal(secret_id: String, user_id: String) -> Result<(), Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::revoke_role_effect(secret_id, user_id).into();
    result.map_err(|e| e.with_context("revoking role".to_string()))
}

#[wrap_marine_result("get_user_role")]
pub fn get_user_role_internal(secret_id: String, user_id: String) -> Result<GetUserRole, Error> {
    let result: MarineResult<_> =
        secret_saver_adapter_bindings::get_user_role_effect(secret_id, user_id).into();

    result
        .map(|res| GetUserRole { role: res.role })
        .map_err(|e| e.with_context("getting user role".to_string()))
}

mod secret_saver_adapter_bindings {
    use marine_error::Error;
    use marine_rs_sdk::marine;
    use secret_saver_adapter::types::AllAvailableSecretsResult;
    use secret_saver_adapter::types::GetRoleResult;
    use secret_saver_adapter::types::SecretSaverGetResult;
    use secret_saver_adapter::types::SecretSaverSaveResult;

    #[marine]
    #[link(wasm_import_module = "secret_saver_adapter")]
    #[module_import("secret_saver_adapter")]
    extern "C" {
        #[link_name = "initialize_db"]
        pub fn initialize_db() -> Error;
        #[link_name = "save_secret"]
        pub fn create_secret_effect(secret: Vec<u8>, expired_at: u64) -> SecretSaverSaveResult;
        #[link_name = "get_secret"]
        pub fn get_secret_effect(secret_id: String, only_owner: bool) -> SecretSaverGetResult;
        #[link_name = "update_secret"]
        pub fn update_secret_effect(secret_id: String, secret: Vec<u8>) -> Error;
        #[link_name = "delete_secret"]
        pub fn delete_secret(secret_id: String) -> Error;

        #[link_name = "get_all_secrets"]
        pub fn get_all_secrets_effect(only_owner: bool) -> AllAvailableSecretsResult;

        #[link_name = "change_secret_shared_secret"]
        pub fn change_secret_shared_secret_effect(
            secret_id: String,
            shared_secret: Vec<u8>,
        ) -> Error;
        #[link_name = "increase_secret_nonce"]
        pub fn increase_secret_nonce_effect(secret_id: String) -> Error;
        #[link_name = "change_visibility"]
        pub fn change_visibility_effect(secret_id: String, is_anyone_can_use: bool) -> Error;
        #[link_name = "update_expiration"]
        pub fn update_expiration(secret_id: String, expired_at: u64) -> Error;

        #[link_name = "permit_role"]
        pub fn permit_role_effect(secret_id: String, user_id: String, role: String) -> Error;
        #[link_name = "revoke_role"]
        pub fn revoke_role_effect(secret_id: String, user_id: String) -> Error;
        #[link_name = "get_user_role"]
        pub fn get_user_role_effect(secret_id: String, user_id: String) -> GetRoleResult;
    }
}

#[cfg(test)]
mod tests {
    use std::cell::RefCell;
    use std::fs;
    use std::io::Error as IoError;
    use std::panic;
    use std::result;
    use std::sync::Mutex;

    use crypto_utils::types::KeyVec;
    use marine_error::Error;
    use marine_rs_sdk_test::marine_test;
    use marine_rs_sdk_test::CallParameters;
    use once_cell::sync::Lazy;

    static FILESYSTEM: Lazy<Mutex<()>> = Lazy::new(Mutex::default);

    fn remove_file_at_dir(path: &str) {
        let dir = fs::read_dir(path);
        if dir.is_err() {
            return;
        }
        dir.unwrap().for_each(|entry| {
            let entry = entry.unwrap();
            let path = entry.path();
            if path.is_dir() {
                remove_file_at_dir(path.to_str().unwrap());
            } else {
                fs::remove_file(path).unwrap();
            }
        });
    }

    fn remove_files() {
        remove_file_at_dir("./tmp")
    }

    fn prepare_vault(cp: &CallParameters) -> Result<(), IoError> {
        let path = format!("./tmp/vault/{}-{}", cp.particle.id, cp.particle.token);
        fs::create_dir_all(path)
    }

    fn get_call_parameters() -> CallParameters {
        let mut cp = CallParameters::default();
        cp.particle.id = "test".to_string();
        cp.particle.init_peer_id = "test".to_string();
        cp
    }

    struct Handshake {
        crypto_public_key: KeyVec,
        crypto_private_key: KeyVec,
        service_public_key: KeyVec,
    }

    fn make_handshake(
        service_handshake: impl Fn(CallParameters) -> KeyVec,
        cp: CallParameters,
    ) -> Handshake {
        let service_handshake = service_handshake(cp.clone());
        let dalek_handshake = crypto_utils::generate_random_key();

        Handshake {
            crypto_public_key: dalek_handshake.public_key,
            crypto_private_key: dalek_handshake.private_key,
            service_public_key: service_handshake,
        }
    }

    fn move_secret_to_storage(
        handshake: impl Fn(CallParameters) -> KeyVec,
        save_secret: impl Fn(Vec<u8>, Vec<u8>, KeyVec, KeyVec, CallParameters) -> Result<String, Error>,
        message: &str,
        cp: &CallParameters,
    ) -> Result<String, Error> {
        let handshake = make_handshake(handshake, cp.clone());

        let encrypted = crypto_utils::encrypt(
            message.as_bytes().to_vec(),
            handshake.crypto_private_key.clone(),
            handshake.service_public_key.clone(),
        )?;

        save_secret(
            encrypted.ciphertext,
            encrypted.nonce,
            handshake.service_public_key,
            handshake.crypto_public_key,
            cp.clone(),
        )
    }

    fn get_secret_from_storage(
        handshake: impl Fn(CallParameters) -> KeyVec,
        get_secret: impl Fn(String, KeyVec, KeyVec, CallParameters) -> Result<(Vec<u8>, Vec<u8>), Error>,
        secret_id: String,
        cp: &CallParameters,
    ) -> Result<Vec<u8>, Error> {
        let handshake = make_handshake(handshake, cp.clone());

        let get_result = get_secret(
            secret_id,
            handshake.service_public_key.clone(),
            handshake.crypto_public_key.clone(),
            cp.clone(),
        )?;
        let decrypted = crypto_utils::decrypt(
            get_result.0,
            get_result.1,
            handshake.crypto_private_key,
            handshake.service_public_key,
        )?;
        Ok(decrypted.ciphertext)
    }

    macro_rules! wrap_handshake_facade {
        ($facade:expr) => {
            |cp| {
                let result = $facade.borrow_mut().start_handshake_cp(cp);
                assert!(result.error.is_ok);
                KeyVec {
                    key: result.value.public_key.key.clone(),
                }
            }
        };
    }

    macro_rules! wrap_save_secret {
        ($facade:expr) => {
            |ciphertext, nonce, self_public_key: KeyVec, other_public_key: KeyVec, cp| {
                let result = $facade.borrow_mut().save_secret_cp(
                    marine_test_env::secret_facade::SaveSecretRequest {
                        ciphertext,
                        expired_at: 0,
                        metadata: marine_test_env::secret_facade::CryptoMetadata {
                            self_public_key: marine_test_env::secret_facade::KeyVec {
                                key: self_public_key.key.clone(),
                            },
                            other_public_key: marine_test_env::secret_facade::KeyVec {
                                key: other_public_key.key.clone(),
                            },
                            nonce,
                        },
                    },
                    cp,
                );
                if result.error.is_ok {
                    Ok(result.value.secret_id)
                } else {
                    Err(Error::new(result.error.message))
                }
            }
        };
    }

    macro_rules! wrap_get_secret {
        ($facade:expr) => {
            |secret_id, self_public_key: KeyVec, other_public_key: KeyVec, cp| {
                let result = $facade.borrow_mut().get_secret_cp(
                    marine_test_env::secret_facade::GetSecretRequest {
                        secret_id,
                        metadata: marine_test_env::secret_facade::CryptoMetadata {
                            self_public_key: marine_test_env::secret_facade::KeyVec {
                                key: self_public_key.key.clone(),
                            },
                            other_public_key: marine_test_env::secret_facade::KeyVec {
                                key: other_public_key.key.clone(),
                            },
                            nonce: Vec::new(),
                        },
                    },
                    cp,
                );
                if result.error.is_ok {
                    Ok((result.value.secret, result.value.nonce))
                } else {
                    Err(Error::new(result.error.message))
                }
            }
        };
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_handshake_no_error(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let result = facade.start_handshake();
        assert!(result.error.is_ok);
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_save_and_get(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);
        let get_fn = wrap_get_secret!(facade);

        let cp = get_call_parameters();
        let secret_id = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp);
        assert!(secret_id.is_ok());
        let secret_id = secret_id.unwrap();

        let secret = get_secret_from_storage(handshake_fn, get_fn, secret_id, &cp);

        println!("{:?}", secret);
        assert!(secret.is_ok());

        assert_eq!(secret.unwrap(), "Hello, world!".as_bytes().to_vec());
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_same_secret_should_have_same_id_in_one_particle(
        facade: marine_test_env::secret_facade::ModuleInterface,
    ) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let cp = get_call_parameters();

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let secret_id_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp);

        assert!(secret_id_1.is_ok());

        let secret_id_2 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp);

        assert!(secret_id_2.is_err());
        assert!(secret_id_2
            .err()
            .unwrap()
            .message
            .contains("secrets.secret_id"))
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_same_secret_not_have_same_id_in_different_particles(
        facade: marine_test_env::secret_facade::ModuleInterface,
    ) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);

        let mut cp_2 = CallParameters::default();
        cp_2.particle.id = "alice".to_string();
        cp_2.particle.init_peer_id = "alice".to_string();

        let secret_2 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_2);

        assert_ne!(secret_1.unwrap(), secret_2.unwrap());
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_update_visibility_only_owner(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();
        prepare_vault(&cp_1).unwrap();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);
        assert!(secret_1.is_ok());
        let secret_1 = secret_1.unwrap();

        let result = facade
            .borrow_mut()
            .change_visibility_cp(secret_1.clone(), true, cp_1.clone());
        assert!(result.is_ok);

        let mut cp_2 = CallParameters::default();
        cp_2.particle.id = "alice".to_string();
        cp_2.particle.init_peer_id = "alice".to_string();
        prepare_vault(&cp_1).unwrap();

        let result = facade
            .borrow_mut()
            .change_visibility_cp(secret_1.clone(), true, cp_2.clone());
        assert!(!result.is_ok);
        assert!(result.message.contains("denied"));
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_get_all_available_secret(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();
        prepare_vault(&cp_1).unwrap();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);
        assert!(secret_1.is_ok());
        let secret_1 = secret_1.unwrap();

        let mut cp_2 = CallParameters::default();
        cp_2.particle.id = "alice".to_string();
        cp_2.particle.init_peer_id = "alice".to_string();

        let secret_2 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_2);
        assert!(secret_2.is_ok());
        let secret_2 = secret_2.unwrap();

        let result = facade
            .borrow_mut()
            .change_visibility_cp(secret_2.clone(), true, cp_2.clone());
        assert!(result.is_ok);

        let secret_3 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world2!", &cp_2);
        println!("{:?}", secret_3);
        assert!(secret_3.is_ok());
        let secret_3 = secret_3.unwrap();

        let result = facade
            .borrow_mut()
            .get_all_available_for_use_secrets_cp(cp_1.clone());
        println!("{:?}", result);
        assert!(result.error.is_ok);
        assert_eq!(result.value.secret_ids.len(), 2);
        assert!(result.value.secret_ids.contains(&secret_1));
        assert!(result.value.secret_ids.contains(&secret_2));

        let result = facade
            .borrow_mut()
            .get_all_available_for_use_secrets_cp(cp_2.clone());
        assert!(result.error.is_ok);
        assert_eq!(result.value.secret_ids.len(), 2);
        assert!(result.value.secret_ids.contains(&secret_2));
        assert!(result.value.secret_ids.contains(&secret_3));
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_is_secret_available(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();
        prepare_vault(&cp_1).unwrap();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);
        assert!(secret_1.is_ok());
        let secret_1 = secret_1.unwrap();

        let mut cp_2 = CallParameters::default();
        cp_2.particle.id = "alice".to_string();
        cp_2.particle.init_peer_id = "alice".to_string();

        let secret_2 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_2);
        assert!(secret_2.is_ok());
        let secret_2 = secret_2.unwrap();

        let result = facade
            .borrow_mut()
            .change_visibility_cp(secret_2.clone(), true, cp_2.clone());
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .is_secret_available_for_use_cp(secret_1.clone(), cp_1.clone());
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .is_secret_available_for_use_cp(secret_2.clone(), cp_1.clone());
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .is_secret_available_for_use_cp(secret_1.clone(), cp_2.clone());
        assert!(!result.is_ok);
        assert!(result.message.contains("not found"));

        let result = facade
            .borrow_mut()
            .is_secret_available_for_use_cp(secret_2.clone(), cp_2.clone());
        assert!(result.is_ok);
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_prepare_to_use(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();
        prepare_vault(&cp_1).unwrap();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);
        assert!(secret_1.is_ok());
        let secret_1 = secret_1.unwrap();

        let result = facade
            .borrow_mut()
            .prepare_to_use_cp(secret_1.clone(), cp_1.clone());
        assert!(!result.is_ok);
        assert!(result.message.contains("shared secret is not ready"));

        let result = facade
            .borrow_mut()
            .secret_key_init_cp(secret_1.clone(), 0, 1, cp_1.clone());
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .prepare_to_use_cp(secret_1.clone(), cp_1.clone());
        assert!(result.is_ok);

        let mut cp_2 = CallParameters::default();
        cp_2.particle.id = "alice".to_string();
        cp_2.particle.init_peer_id = "alice".to_string();
        prepare_vault(&cp_2).unwrap();

        let result = facade
            .borrow_mut()
            .prepare_to_use_cp(secret_1.clone(), cp_2.clone());
        assert!(!result.is_ok);

        let change_result =
            facade
                .borrow_mut()
                .change_visibility_cp(secret_1.clone(), true, cp_1.clone());
        assert!(change_result.is_ok);

        let result = facade
            .borrow_mut()
            .prepare_to_use_cp(secret_1.clone(), cp_2.clone());
        assert!(result.is_ok);
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_delete_secret(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();
        prepare_vault(&cp_1).unwrap();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);
        assert!(secret_1.is_ok());
        let secret_1 = secret_1.unwrap();

        let result = facade
            .borrow_mut()
            .delete_secret_cp(secret_1.clone(), cp_1.clone());
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .is_secret_available_for_use_cp(secret_1.clone(), cp_1.clone());
        assert!(!result.is_ok);
        assert!(result.message.contains("not found"));
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_expiration_setting(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();
        prepare_vault(&cp_1).unwrap();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);
        assert!(secret_1.is_ok());
        let secret_1 = secret_1.unwrap();

        let result = facade
            .borrow_mut()
            .secret_key_init_cp(secret_1.clone(), 0, 1, cp_1.clone());
        println!("{:?}", result);
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .update_expiration_cp(secret_1.clone(), 10, cp_1.clone());
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .is_secret_available_for_use_cp(secret_1.clone(), cp_1.clone());
        assert!(result.is_ok);

        let result = facade
            .borrow_mut()
            .prepare_to_use_cp(secret_1.clone(), cp_1.clone());
        assert!(result.is_ok);

        cp_1.particle.timestamp += 11;

        let result = facade
            .borrow_mut()
            .is_secret_available_for_use_cp(secret_1.clone(), cp_1.clone());
        assert!(!result.is_ok);
        assert!(result.message.contains("expired"));

        let result = facade
            .borrow_mut()
            .prepare_to_use_cp(secret_1.clone(), cp_1.clone());
        assert!(!result.is_ok);
        assert!(result.message.contains("expired"));
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn test_roles(facade: marine_test_env::secret_facade::ModuleInterface) {
        let _lock = FILESYSTEM.lock().unwrap();
        remove_files();
        let init_result = facade.initialize();
        assert!(init_result.is_ok);

        let facade = RefCell::new(facade);
        let handshake_fn = wrap_handshake_facade!(facade);
        let save_fn = wrap_save_secret!(facade);

        let mut cp_1 = CallParameters::default();
        cp_1.particle.id = "bob".to_string();
        cp_1.particle.init_peer_id = "bob".to_string();
        prepare_vault(&cp_1).unwrap();

        let secret_1 = move_secret_to_storage(handshake_fn, save_fn, "Hello, world!", &cp_1);
        assert!(secret_1.is_ok());
        let secret_1 = secret_1.unwrap();

        let result = facade.borrow_mut().permit_role_cp(
            secret_1.clone(),
            "alice".to_string(),
            "owner".to_string(),
            cp_1.clone(),
        );
        assert!(result.is_ok);

        let result = facade.borrow_mut().get_user_role_cp(
            secret_1.clone(),
            "alice".to_string(),
            cp_1.clone(),
        );
        assert!(result.error.is_ok);
        assert_eq!(result.value.role, "owner");

        let result =
            facade
                .borrow_mut()
                .revoke_role_cp(secret_1.clone(), "alice".to_string(), cp_1.clone());
        assert!(result.is_ok);

        let result = facade.borrow_mut().get_user_role_cp(
            secret_1.clone(),
            "alice".to_string(),
            cp_1.clone(),
        );
        assert!(result.error.is_ok);
        assert_eq!(result.value.role, "unknown");

        let result = facade
            .borrow_mut()
            .change_visibility_cp(secret_1.clone(), true, cp_1.clone());
        assert!(result.is_ok);

        let result = facade.borrow_mut().get_user_role_cp(
            secret_1.clone(),
            "alice".to_string(),
            cp_1.clone(),
        );
        assert!(result.error.is_ok);
        assert_eq!(result.value.role, "user");

        let result =
            facade
                .borrow_mut()
                .revoke_role_cp(secret_1.clone(), "bob".to_string(), cp_1.clone());
        assert!(!result.is_ok);
    }
}
