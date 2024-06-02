use std::borrow::Borrow;

use crypto_utils::types::KeyVec;
use marine_error::Error;
use marine_error::MarineResult;
use marine_error_derive::wrap_marine_result;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;
use secret_holder_utils::hexer;

use crypto_module::types::*;
use serde::{Deserialize, Serialize};

module_manifest!();

fn main() {}

fn get_file_name(bytes: &[u8]) -> String {
    format!("key_{}", hexer(bytes))
}

#[derive(Serialize, Deserialize)]
struct ParticleKey {
    particle_id: String,
    private_key: Vec<u8>,
}

#[wrap_marine_result("prepare_for_handshake")]
pub fn prepare_for_handshake_internal() -> Result<PrepareHandshake, Error> {
    let particle_id = marine_rs_sdk::get_call_parameters().particle.id;
    let keys = crypto_utils::generate_random_key();

    let particle_key = ParticleKey {
        particle_id,
        private_key: keys.private_key.key,
    };

    let result: MarineResult<_> = localfile_adapter_bindings::save_file(
        get_file_name(keys.public_key.borrow()),
        serde_json::to_vec(&particle_key).unwrap(),
    )
    .into();

    result
        .map(|_| PrepareHandshake {
            public_key: keys.public_key,
        })
        .map_err(|e| e.with_context("saving private key".to_string()))
}

fn read_key(particle_id: &str, self_public_key: KeyVec) -> Result<KeyVec, Error> {
    let load_result: MarineResult<_> =
        localfile_adapter_bindings::load_file(get_file_name(self_public_key.borrow())).into();
    let load_result = load_result.map_err(|e| e.with_context("loading private key".to_string()))?;

    let data: ParticleKey = serde_json::from_slice(&load_result.data)
        .map_err(|e| Error::new(format!("failed to parse private key: {}", e)))?;

    if data.particle_id != particle_id {
        return Err(Error::new("particle id mismatch".into()));
    }

    Ok(KeyVec::new(data.private_key))
}

#[wrap_marine_result("encrypt_message")]
pub fn encrypt_message_internal(
    self_public_key: KeyVec,
    other_public_key: KeyVec,
    message: Vec<u8>,
) -> Result<FacadeEncrypt, Error> {
    let private_key = read_key(
        marine_rs_sdk::get_call_parameters().particle.id.as_ref(),
        self_public_key,
    )?;

    let result: MarineResult<_> = crypto_utils::encrypt(message, private_key, other_public_key);

    result
        .map(|res| FacadeEncrypt {
            nonce: res.nonce,
            ciphertext: res.ciphertext,
        })
        .map_err(|e| e.with_context("encrypting message".to_string()))
}

#[wrap_marine_result("decrypt_message")]
pub fn decrypt_message_internal(
    self_public_key: KeyVec,
    other_public_key: KeyVec,
    nonce: Vec<u8>,
    ciphertext: Vec<u8>,
) -> Result<FacadeDecrypt, Error> {
    let private_key = read_key(
        marine_rs_sdk::get_call_parameters().particle.id.as_ref(),
        self_public_key,
    )?;

    let result: MarineResult<_> =
        crypto_utils::decrypt(ciphertext, nonce, private_key, other_public_key);

    result
        .map(|res| FacadeDecrypt {
            ciphertext: res.ciphertext,
        })
        .map_err(|e| e.with_context("decrypting message".to_string()))
}

#[marine]
pub fn hash_data(data: Vec<u8>) -> CryptoHashResult {
    let result = crypto_utils::hash_data(data);
    CryptoHashResult { hash: result.hash }
}

mod localfile_adapter_bindings {
    use localfile_adapter::types::LoadResult;
    use marine_error::Error;
    use marine_rs_sdk::marine;

    #[marine]
    #[link(wasm_import_module = "localfile_adapter")]
    #[module_import("localfile_adapter")]
    extern "C" {
        pub fn save_file(file_name: String, data: Vec<u8>) -> Error;
        pub fn load_file(file_name: String) -> LoadResult;
        pub fn delete_file(file_name: String) -> Error;
    }
}

#[cfg(test)]
mod tests {
    use marine_rs_sdk_test::marine_test;
    use marine_rs_sdk_test::CallParameters;

    #[marine_test(config_path = "../../../../../.fluence/test-configs/secret-holder_Config.toml")]
    fn test_handshake_no_error(facade: marine_test_env::crypto_module::ModuleInterface) {
        let result = facade.prepare_for_handshake();
        assert!(result.error.is_ok);
    }

    #[marine_test(config_path = "../../../../../.fluence/test-configs/secret-holder_Config.toml")]
    fn test_encrypt_decrypt_no_error(facade: marine_test_env::crypto_module::ModuleInterface) {
        let alice_handshake = facade.prepare_for_handshake();
        assert!(alice_handshake.error.is_ok);

        let bob_handshake = facade.prepare_for_handshake();
        assert!(bob_handshake.error.is_ok);

        let message = "Hello, world!".as_bytes().to_vec();

        let encrypted = facade.encrypt_message(
            alice_handshake.value.public_key.clone(),
            bob_handshake.value.public_key.clone(),
            message.clone(),
        );
        assert!(encrypted.error.is_ok);

        let decrypted = facade.decrypt_message(
            bob_handshake.value.public_key,
            alice_handshake.value.public_key,
            encrypted.value.nonce,
            encrypted.value.ciphertext,
        );
        assert!(decrypted.error.is_ok);
        assert_eq!(decrypted.value.ciphertext, message);
    }

    #[marine_test(config_path = "../../../../../.fluence/test-configs/secret-holder_Config.toml")]
    fn access_denied_if_wrong_particle_id(facade: marine_test_env::crypto_module::ModuleInterface) {
        let alice_handshake = facade.prepare_for_handshake();
        assert!(alice_handshake.error.is_ok);

        let mut bob_cp = CallParameters::default();
        bob_cp.particle.id = "bob".to_string();

        let bob_handshake = facade.prepare_for_handshake_cp(bob_cp.clone());
        assert!(bob_handshake.error.is_ok);

        bob_cp.particle.id = "alice".to_string();

        let encrypted = facade.encrypt_message_cp(
            bob_handshake.value.public_key.clone(),
            alice_handshake.value.public_key.clone(),
            "Hello, world!".as_bytes().to_vec(),
            bob_cp,
        );

        assert!(!encrypted.error.is_ok);
        assert!(encrypted.error.message.contains("particle id mismatch"));
    }

    #[marine_test(config_path = "../../../../../.fluence/test-configs/secret-holder_Config.toml")]
    fn test_hash_data(facade: marine_test_env::crypto_module::ModuleInterface) {
        let data = "Hello, world!".as_bytes().to_vec();
        let hash = facade.hash_data(data.clone());
        assert_eq!(hash.hash.len(), 32);
        assert!(hash.hash.iter().any(|&x| x != 0));
    }
}
