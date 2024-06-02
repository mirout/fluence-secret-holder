use marine_error::Error;
use marine_error_derive::wrap_marine_result;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

use secret_holder_utils::hexer;

use secret_saver_adapter::types::*;

module_manifest!();

fn main() {}

#[wrap_marine_result("initialize_db")]
pub fn initialize() -> Result<(), Error> {
    secret_saver_adapter::storage::initialize_db()
}

#[wrap_marine_result("save_secret")]
pub fn save_secret_internal(secret: Vec<u8>, expired_at: u64) -> Result<SecretSaverSave, Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let particle_id = call_parameters.particle.id.as_bytes();
    let init_peer_id = call_parameters.particle.init_peer_id;
    let chain = particle_id
        .iter()
        .chain(init_peer_id.as_bytes().iter())
        .chain(&secret)
        .cloned()
        .collect();
    let secret_id = crypto_utils::hash_data(chain).hash;

    let secret_id = hexer(&secret_id);

    let secret_model = SecretModel {
        id: secret_id.clone(),
        secret,
        shared_secret: Vec::new(),
        nonce: 0,
        is_anyone_can_use: false,
        expired_at,
    };

    secret_saver_adapter::storage::save_secret(secret_model)?;
    secret_saver_adapter::storage::permit_role(None, &init_peer_id, &secret_id, &Role::Owner)?;

    Ok(SecretSaverSave { secret_id })
}

#[wrap_marine_result("get_secret")]
pub fn get_secret_internal(secret_id: String, only_owner: bool) -> Result<SecretSaverGet, Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    let secret = secret_saver_adapter::storage::get_secret(&secret_id, &init_peer_id, only_owner)?;
    Ok(SecretSaverGet { model: secret })
}

#[wrap_marine_result("update_secret")]
pub fn update_secret_internal(secret_id: String, secret: Vec<u8>) -> Result<(), Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    secret_saver_adapter::storage::update_secret(&secret_id, secret, &init_peer_id)?;
    Ok(())
}

#[wrap_marine_result("delete_secret")]
pub fn delete_secret_internal(secret_id: String) -> Result<(), Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    secret_saver_adapter::storage::delete_secret(&secret_id, &init_peer_id)?;
    Ok(())
}

#[wrap_marine_result("get_all_secrets")]
pub fn all_available_secrets_internal(only_owner: bool) -> Result<AllAvailableSecrets, Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    let secrets =
        secret_saver_adapter::storage::get_all_available_secrets(&init_peer_id, only_owner)?;
    Ok(AllAvailableSecrets { secrets })
}

#[wrap_marine_result("change_visibility")]
pub fn change_visibility_internal(secret_id: String, is_anyone_can_use: bool) -> Result<(), Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    secret_saver_adapter::storage::change_visibility(&secret_id, is_anyone_can_use, &init_peer_id)?;
    Ok(())
}

#[wrap_marine_result("increase_secret_nonce")]
pub fn increase_secret_nonce_internal(secret_id: String) -> Result<(), Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    secret_saver_adapter::storage::increase_nonce(&secret_id, &init_peer_id)?;
    Ok(())
}

#[wrap_marine_result("change_secret_shared_secret")]
pub fn change_secret_shared_secret_internal(
    secret_id: String,
    shared_secret: Vec<u8>,
) -> Result<(), Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    secret_saver_adapter::storage::change_secret_shared_secret(
        &secret_id,
        shared_secret,
        &init_peer_id,
    )?;
    Ok(())
}

#[wrap_marine_result("update_expiration")]
pub fn update_expiration_internal(secret_id: String, expired_at: u64) -> Result<(), Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    secret_saver_adapter::storage::update_expiration(&secret_id, expired_at, &init_peer_id)?;
    Ok(())
}

#[wrap_marine_result("permit_role")]
pub fn permit_role_internal(secret_id: String, user_id: String, role: String) -> Result<(), Error> {
    let role = Role::from(role.as_str());
    if role == Role::Unknown {
        return Err(Error::new("unknown role".to_string()));
    }
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    secret_saver_adapter::storage::permit_role(Some(init_peer_id), &user_id, &secret_id, &role)?;
    Ok(())
}

#[wrap_marine_result("revoke_role")]
pub fn revoke_role_internal(secret_id: String, user_id: String) -> Result<(), Error> {
    let call_parameters = marine_rs_sdk::get_call_parameters();
    let init_peer_id = call_parameters.particle.init_peer_id;

    if init_peer_id == user_id {
        return Err(Error::new("you can't revoke your own role".to_string()));
    }

    secret_saver_adapter::storage::revoke_role(&init_peer_id, &user_id, &secret_id)?;
    Ok(())
}

#[wrap_marine_result("get_user_role")]
pub fn get_user_role_internal(secret_id: String, user_id: String) -> Result<GetRole, Error> {
    let role = secret_saver_adapter::storage::get_user_role(&user_id, &secret_id)?;
    Ok(GetRole {
        role: role.as_ref().to_string(),
    })
}
