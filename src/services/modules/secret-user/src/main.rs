use crypto_utils::types::KeyVec;
use marine_error::Error;
use marine_error_derive::wrap_marine_result;
use marine_fs_utils::MarineDir;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;
use secret_user::types::*;

module_manifest!();

fn main() {}

fn save_shared_secret(secret_id: &str, secret: KeyVec) -> Result<(), Error> {
    let file_name = format!("secret_{}", secret_id);
    marine_fs_utils::ModulePermanentDir
        .save(&file_name, &serde_json::to_vec(&secret).unwrap())
        .map_err(|e| e.with_context(format!("saving secret to file {}", file_name)))
}

#[wrap_marine_result("secret_initiate_handshake")]
pub fn secret_initiate_handshake_internal(
    secret_id: String,
    iteration: u8,
    users_count: u8,
) -> Result<(), Error> {
    let result =
        secret_mover::initializer::secret_initiate_handshake(&secret_id, users_count, iteration)?;
    if result.is_complete {
        save_shared_secret(&secret_id, result.shared_secret)?;
    };
    Ok(())
}

#[wrap_marine_result("get_secret")]
pub fn get_secret_internal(secret_id: String) -> Result<GetSecretForUse, Error> {
    let particle = marine_rs_sdk::get_call_parameters().particle;
    let shared_secret_data = marine_fs_utils::ModulePermanentDir
        .read(&format!("secret_{}", secret_id))
        .map_err(|e| e.with_context("reading secret from file".to_string()))?;

    let shared_secret: KeyVec =
        serde_json::from_slice(&shared_secret_data).map_err(|e| Error::new(e.to_string()))?;
    let shared_secret: [u8; 32] = shared_secret
        .key
        .try_into()
        .map_err(|_| Error::new("invalid key length".to_string()))?;

    let secret_data = marine_fs_utils::ParticleVaultDir::new(particle)
        .read(&secret_id)
        .map_err(|e| e.with_context("reading secret from vault".to_string()))?;

    let encrypted_secret: secret_mover::types::EncryptedSecret =
        serde_json::from_slice(&secret_data).map_err(|e| Error::new(e.to_string()))?;

    let nonce = encrypted_secret.nonce.to_be_bytes().to_vec();
    let secret =
        crypto_utils::decrypt_by_shared_secret(encrypted_secret.ciphertext, &shared_secret, nonce)
            .map_err(|e| Error::new(e.to_string()))?;

    Ok(GetSecretForUse {
        secret: secret.ciphertext,
    })
}

#[cfg(feature = "get_and_use_secret")]
#[wrap_marine_result("get_and_use_secret")]
pub fn get_and_use_secret_internal(
    secret_id: String,
    calldata: Vec<u8>,
) -> Result<UseSecret, Error> {
    let secret = get_secret_internal(secret_id)?;
    use_secret(secret.secret, calldata).into()
}

#[cfg(feature = "get_and_use_secret")]
#[marine]
#[link(wasm_import_module = "use_secret_module")]
#[module_import("use_secret_module")]
extern "C" {
    pub fn use_secret(secret: Vec<u8>, calldata: Vec<u8>) -> UseSecretResult;
}
