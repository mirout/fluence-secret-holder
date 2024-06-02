fn main() {}

#[cfg(test)]
#[marine_rs_sdk_test::marine_test(
    secret_holder(config_path = "../../../../.fluence/test-configs/secret-holder_Config.toml",),
    secret_user(config_path = "../../../../.fluence/test-configs/secret-user_Config.toml",),
    secret_user_2(config_path = "../../../../.fluence/test-configs/secret-user-2_Config.toml",)
)]
mod tests {
    use crypto_utils::{encrypt, generate_random_key, types::KeyVec};
    use marine_rs_sdk_test::CallParameters;
    use std::fs;
    use std::io::Error as IoError;

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

    #[test]
    fn test() {
        remove_files();

        let mut secret_holder = marine_test_env::secret_holder::ServiceInterface::new();
        let mut secret_user_1 = marine_test_env::secret_user::ServiceInterface::new();
        let mut secret_user_2 = marine_test_env::secret_user_2::ServiceInterface::new();

        let init_result = secret_holder.initialize();
        println!("{:?}", init_result);
        assert!(init_result.is_ok, "Initialization failed");

        let cp = {
            let mut cp = marine_rs_sdk_test::CallParameters::default();
            cp.particle.id = "test".to_string();
            cp.particle.token = "test".to_string();
            cp.particle.init_peer_id = "owner".to_string();
            cp
        };
        prepare_vault(&cp).unwrap();

        let user_key = generate_random_key();
        let handshake_result = secret_holder.start_handshake_cp(cp.clone());
        assert!(handshake_result.error.is_ok, "Handshake failed");

        let message = "Hello, world!";
        let encrypt = encrypt(
            message.as_bytes().to_vec(),
            user_key.private_key,
            KeyVec::new(handshake_result.value.public_key.key.clone()),
        )
        .unwrap();

        let save_result = secret_holder.save_secret_cp(
            marine_test_env::secret_holder::SaveSecretRequest {
                ciphertext: encrypt.ciphertext,
                expired_at: 0,
                metadata: marine_test_env::secret_holder::CryptoMetadata {
                    self_public_key: handshake_result.value.public_key,
                    other_public_key: marine_test_env::secret_holder::KeyVec {
                        key: user_key.public_key.key,
                    },
                    nonce: encrypt.nonce,
                },
            },
            cp.clone(),
        );
        println!("{:?}", save_result);
        assert!(save_result.error.is_ok, "Save secret failed");
        let secret_id: String = save_result.value.secret_id.clone();

        let step_0 = secret_holder.secret_key_init_cp(secret_id.clone(), 0, 3, cp.clone());
        println!("{:?}", step_0);
        assert!(step_0.is_ok, "Secret key init failed");

        let step_1 =
            secret_user_1.secret_initiate_handshake_cp(secret_id.clone(), 1, 3, cp.clone());
        println!("{:?}", step_1);
        assert!(step_1.is_ok, "Secret key init failed");

        let step_2 =
            secret_user_2.secret_initiate_handshake_cp(secret_id.clone(), 2, 3, cp.clone());
        println!("{:?}", step_2);
        assert!(step_2.is_ok, "Secret key init failed");

        let step_3 = secret_holder.secret_key_init_cp(secret_id.clone(), 3, 3, cp.clone());
        println!("{:?}", step_3);
        assert!(step_3.is_ok, "Secret key init failed");

        let step_4 =
            secret_user_1.secret_initiate_handshake_cp(secret_id.clone(), 4, 3, cp.clone());
        println!("{:?}", step_4);
        assert!(step_4.is_ok, "Secret key init failed");

        let secret_user_1_result = fs::read(format!(
            "./tmp/secret-user/storage/module/secret_{}",
            secret_id
        ))
        .unwrap();
        let secret_user_2_result = fs::read(format!(
            "./tmp/secret-user-2/storage/module/secret_{}",
            secret_id
        ))
        .unwrap();

        assert_eq!(secret_user_1_result, secret_user_2_result);

        let cp = {
            let mut cp = marine_rs_sdk_test::CallParameters::default();
            cp.particle.id = "get_secret".to_string();
            cp.particle.token = "get_secret".to_string();
            cp.particle.init_peer_id = "owner".to_string();
            cp
        };
        prepare_vault(&cp).unwrap();

        let request_secret = secret_holder.prepare_to_use_cp(secret_id.clone(), cp.clone());
        println!("{:?}", request_secret);
        assert!(request_secret.is_ok);

        let get_secret_1 = secret_user_1.get_secret_cp(secret_id.clone(), cp.clone());
        println!("{:?}", get_secret_1);
        assert!(get_secret_1.error.is_ok);

        assert_eq!(get_secret_1.value.secret, message.as_bytes().to_vec());

        let get_secret_2 = secret_user_2.get_secret_cp(secret_id.clone(), cp.clone());
        println!("{:?}", get_secret_2);
        assert!(get_secret_2.error.is_ok);

        assert_eq!(get_secret_2.value.secret, message.as_bytes().to_vec());
    }
}
