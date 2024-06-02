use crypto_utils::types::KeyVec;
#[allow(unused_imports)] // reason = "Used during code generation"s
use marine_error::Error;
use marine_error_derive::MarineResult;
use marine_rs_sdk::marine;
use serde::{Deserialize, Serialize};

#[marine]
#[derive(Default, MarineResult)]
pub struct Handshake {
    pub shared_secret: KeyVec,
    pub is_complete: bool,
}

impl Handshake {
    pub fn new(shared_secret: KeyVec) -> Self {
        Self {
            shared_secret,
            is_complete: true,
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct EncryptedSecret {
    pub secret_id: String,
    pub ciphertext: Vec<u8>,
    pub nonce: i64,
}
