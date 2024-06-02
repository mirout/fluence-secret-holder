use std::borrow::Borrow;

use marine_error::Error;
use marine_rs_sdk::marine;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use x25519_dalek::{PublicKey, StaticSecret};

use crate::KEY_LEN;

#[marine]
#[wasm_bindgen(getter_with_clone)]
#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq, Eq)]
pub struct KeyVec {
    pub key: Vec<u8>,
}

#[wasm_bindgen]
impl KeyVec {
    #[wasm_bindgen(constructor)]
    pub fn new(key: Vec<u8>) -> Self {
        KeyVec { key }
    }
}

impl Borrow<[u8]> for KeyVec {
    fn borrow(&self) -> &[u8] {
        &self.key
    }
}

impl From<[u8; 32]> for KeyVec {
    fn from(bytes: [u8; 32]) -> Self {
        KeyVec::new(bytes.to_vec())
    }
}

impl TryInto<[u8; 32]> for KeyVec {
    type Error = Error;

    fn try_into(self) -> Result<[u8; 32], Self::Error> {
        match self.key.try_into() {
            Ok(bytes) => Ok(bytes),
            Err(_) => Err(Error::new("Invalid key length".to_string())),
        }
    }
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Default, Serialize, Deserialize)]
pub struct KeyPair {
    pub private_key: KeyVec,
    pub public_key: KeyVec,
}

impl KeyPair {
    pub fn new(private_key: KeyVec, public_key: KeyVec) -> Self {
        Self {
            private_key,
            public_key,
        }
    }
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Default)]
pub struct Decrypt {
    pub ciphertext: Vec<u8>,
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Default)]
pub struct Encrypt {
    pub ciphertext: Vec<u8>,
    pub nonce: Vec<u8>,
}

pub struct HashResult {
    pub hash: Vec<u8>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SharedKey {
    pub key: [u8; KEY_LEN],
    pub len: usize,
}

impl SharedKey {
    pub fn from_public_key(key: [u8; KEY_LEN]) -> Self {
        Self { key, len: 1 }
    }

    pub(crate) fn mul(self, self_private_key: [u8; KEY_LEN]) -> Self {
        let secret = StaticSecret::from(self_private_key);
        let public = PublicKey::from(self.key);

        let shared_secret = secret.diffie_hellman(&public);

        Self {
            key: *shared_secret.as_bytes(),
            len: self.len + 1,
        }
    }
}
