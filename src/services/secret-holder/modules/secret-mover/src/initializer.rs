use crypto_utils::{
    apply_private_key,
    types::{KeyPair, SharedKey},
};
use marine_error::Error;
use marine_fs_utils::MarineDir;
use marine_rs_sdk::ParticleParameters;

use crate::types::Handshake;

fn save_keys(secret_id: &str, keys: &KeyPair) -> Result<(), Error> {
    let file_name = format!("key_{}", secret_id);
    marine_fs_utils::ModuleTempDir
        .save(
            &file_name,
            &serde_json::to_vec(keys).map_err(|e| Error::new(e.to_string()))?,
        )
        .map_err(|e| e.with_context(format!("saving keys to file {}", file_name)))
}

fn get_keys(secret_id: &str, should_generate_keys: bool) -> Result<KeyPair, Error> {
    if should_generate_keys {
        let keys = crypto_utils::generate_random_key();
        save_keys(secret_id, &keys)?;
        return Ok(keys);
    }
    let file_name = format!("key_{}", secret_id);
    let read_result = marine_fs_utils::ModuleTempDir
        .read(&file_name)
        .map_err(|e| e.with_context(format!("reading keys from file {}", file_name)))?;
    serde_json::from_slice(&read_result).map_err(|e| Error::new(e.to_string()))
}

fn get_previous_step(
    particle: &ParticleParameters,
    secret_id: &str,
    iteration: u8,
) -> Result<Vec<SharedKey>, Error> {
    if iteration == 0 {
        return Ok(Vec::default());
    }

    let file_name = format!("secret_{}_{}", secret_id, iteration - 1);
    let read_vault_result = marine_fs_utils::ParticleVaultDir::new(particle.clone())
        .read(&file_name)
        .map_err(|e| e.with_context(format!("reading previous step from file {}", file_name)))?;
    serde_json::from_slice(&read_vault_result).map_err(|e| Error::new(e.to_string()))
}

pub fn secret_initiate_handshake(
    secret_id: &str,
    users_count: u8,
    iteration: u8,
) -> Result<Handshake, Error> {
    let should_generate_keys = iteration < users_count;
    let keys = get_keys(secret_id, should_generate_keys)?;

    let particle = marine_rs_sdk::get_call_parameters().particle;
    let previous_step = get_previous_step(&particle, secret_id, iteration)?;

    let mut cur = apply_private_key(previous_step, keys.private_key, iteration < users_count)?;

    let is_complete = iteration >= users_count - 1;

    let result = if is_complete {
        let secret = cur.remove(0);
        Handshake::new(secret.key.into())
    } else {
        Handshake::default()
    };

    let file_name = format!("secret_{}_{}", secret_id, iteration);
    marine_fs_utils::ParticleVaultDir::new(particle)
        .save(
            &file_name,
            &serde_json::to_vec(&cur).map_err(|e| Error::new(e.to_string()))?,
        )
        .map_err(|e| e.with_context(format!("saving current step to file {}", file_name)))?;

    Ok(result)
}
