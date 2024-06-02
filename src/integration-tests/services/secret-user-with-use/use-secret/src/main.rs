use marine_error::Error;
use marine_error_derive::wrap_marine_result;
use marine_rs_sdk::{marine, module_manifest};
use secret_user::types::{UseSecret, UseSecretResult};

module_manifest!();

fn main() {}

#[wrap_marine_result("use_secret")]
pub fn use_secret_internal(secret: Vec<u8>, calldata: Vec<u8>) -> Result<UseSecret, Error> {
    let mut result = Vec::new();
    result.extend(secret);
    result.extend(calldata);
    Ok(UseSecret { result })
}
