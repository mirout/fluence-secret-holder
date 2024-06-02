use marine_error::Error;
use marine_error_derive::wrap_marine_result;
use marine_fs_utils::MarineDir;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;
use secret_mover::types::*;

module_manifest!();

fn main() {}

#[wrap_marine_result("secret_initiate_handshake")]
pub fn secret_initiate_handshake_internal(
    secret_id: String,
    users_count: u8,
    iteration: u8,
) -> Result<Handshake, Error> {
    secret_mover::initializer::secret_initiate_handshake(&secret_id, users_count, iteration)
}

#[wrap_marine_result("save_to_particle_vault")]
pub fn save_to_particle_vault_internal(
    secret_id: String,
    secret: Vec<u8>,
    nonce: i64,
) -> Result<(), Error> {
    let particle = marine_rs_sdk::get_call_parameters().particle;
    let secret = secret_mover::types::EncryptedSecret {
        secret_id: secret_id.clone(),
        ciphertext: secret,
        nonce,
    };
    marine_fs_utils::ParticleVaultDir::new(particle).save(
        &secret_id,
        &serde_json::to_vec(&secret).map_err(|e| Error::new(e.to_string()))?,
    )
}

#[cfg(test)]
mod tests {
    use std::fs;
    use std::io::Error as IoError;

    use crypto_utils::types::KeyVec;
    use crypto_utils::types::SharedKey;
    use marine_rs_sdk_test::marine_test;
    use marine_rs_sdk_test::CallParameters;

    fn get_call_parameters(id: &str, token: &str) -> CallParameters {
        let mut cp = CallParameters::default();
        cp.particle.id = id.to_string();
        cp.particle.token = token.to_string();
        cp.particle.init_peer_id = "test".to_string();
        cp
    }

    fn prepare_vault(cp: &CallParameters) -> Result<(), IoError> {
        let path = format!("./tmp/vault/{}-{}", cp.particle.id, cp.particle.token);
        fs::create_dir_all(path)
    }

    #[marine_test(
        config_path = "../../../../../../.fluence/test-configs/secret-holder_Config.toml"
    )]
    fn secret_initiate_handshake(module: marine_test_env::secret_mover::ModuleInterface) {
        let cp = get_call_parameters("handshake_test", "token");
        prepare_vault(&cp).unwrap();

        let iteration_0_res =
            module.secret_initiate_handshake_cp("secret_id".to_string(), 2, 0, cp.clone());
        println!("{:?}", iteration_0_res);
        assert!(iteration_0_res.error.is_ok);

        let shared_0: Vec<SharedKey> = serde_json::from_slice(
            fs::read("./tmp/vault/handshake_test-token/secret_secret_id_0")
                .unwrap()
                .as_slice(),
        )
        .unwrap();

        let iteration_1_keys = crypto_utils::generate_random_key();
        let mut iteration_1_res =
            crypto_utils::apply_private_key(shared_0, iteration_1_keys.private_key, true).unwrap();
        let secret = iteration_1_res.remove(0);

        fs::write(
            "./tmp/vault/handshake_test-token/secret_secret_id_1",
            serde_json::to_vec(&iteration_1_res).unwrap(),
        )
        .unwrap();

        let iteration_2_res =
            module.secret_initiate_handshake_cp("secret_id".to_string(), 2, 2, cp);
        assert!(iteration_2_res.error.is_ok);

        let key: KeyVec = secret.key.into();
        assert_eq!(key.key, iteration_2_res.value.shared_secret.key);
    }
}
