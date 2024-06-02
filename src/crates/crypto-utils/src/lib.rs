pub mod constant;
pub mod types;

use crate::constant::*;
use crate::types::*;
use marine_error::Error;
use scrypt::password_hash::PasswordHasher;
use scrypt::password_hash::SaltString;
use scrypt::Params;
use scrypt::Scrypt;
use sha3::{Digest, Sha3_256};
use wasm_bindgen::prelude::*;
use x25519_dalek::{PublicKey, StaticSecret};

use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Key, Nonce,
};

#[wasm_bindgen]
pub fn generate_random_key() -> KeyPair {
    let secret = StaticSecret::random();
    let public = PublicKey::from(&secret);

    KeyPair::new(
        KeyVec::from(secret.to_bytes()),
        KeyVec::from(public.to_bytes()),
    )
}

pub fn apply_private_key(
    keys: Vec<SharedKey>,
    private_key: KeyVec,
    should_add_public: bool,
) -> Result<Vec<SharedKey>, Error> {
    let private_key: [u8; KEY_LEN] = private_key.try_into()?;

    let mut res: Vec<_> = keys.into_iter().map(|key| key.mul(private_key)).collect();
    if should_add_public {
        res.push(SharedKey::from_public_key(
            PublicKey::from(&StaticSecret::from(private_key)).to_bytes(),
        ));
    }
    Ok(res)
}

struct KdfResult {
    key: Key<Aes256Gcm>,
    nonce: Vec<u8>,
}

fn apply_kdf(shared_key: &[u8; 32], salt: SaltString) -> KdfResult {
    let params = Params::new(
        Params::RECOMMENDED_LOG_N,
        Params::RECOMMENDED_R,
        Params::RECOMMENDED_P,
        SCRYPT_KEY_LEN,
    )
    .unwrap();

    let scrypt = Scrypt
        .hash_password_customized(shared_key, None, None, params, &salt)
        .unwrap();

    let output = scrypt.hash.unwrap();

    let (key, nonce) = output.as_bytes().split_at(KEY_LEN);
    KdfResult {
        key: Key::<Aes256Gcm>::clone_from_slice(key),
        nonce: nonce.to_vec(),
    }
}

fn key_agreement(private_key: [u8; KEY_LEN], public_key: [u8; KEY_LEN]) -> [u8; KEY_LEN] {
    let secret = StaticSecret::from(private_key);
    let public = PublicKey::from(public_key);

    secret.diffie_hellman(&public).to_bytes()
}

#[wasm_bindgen]
pub fn encrypt_wrapper(
    message: Vec<u8>,
    self_private_key: KeyVec,
    other_public_key: KeyVec,
) -> Result<Encrypt, JsError> {
    encrypt(message, self_private_key, other_public_key).map_err(|e| JsError::new(&e.to_string()))
}

pub fn encrypt(
    message: Vec<u8>,
    self_private_key: KeyVec,
    other_public_key: KeyVec,
) -> Result<Encrypt, Error> {
    let secret: [u8; KEY_LEN] = self_private_key
        .try_into()
        .map_err(|e: Error| e.with_context("invalid private key".to_string()))?;
    let public: [u8; KEY_LEN] = other_public_key
        .try_into()
        .map_err(|e: Error| e.with_context("invalid public key".to_string()))?;

    let shared_secret = key_agreement(secret, public);
    let salt_bytes = generate_random_bytes(32);

    encrypt_by_shared_secret(message, &shared_secret, salt_bytes)
}

pub fn encrypt_by_shared_secret(
    message: Vec<u8>,
    shared_secret: &[u8; 32],
    nonce_bytes: Vec<u8>,
) -> Result<Encrypt, Error> {
    let salt = SaltString::encode_b64(&nonce_bytes).unwrap();
    let key = apply_kdf(shared_secret, salt);

    let nonce = Nonce::from_slice(&key.nonce);
    let cipher = Aes256Gcm::new(&key.key);

    match cipher.encrypt(nonce, message.as_ref()) {
        Ok(ciphertext) => Ok(Encrypt {
            ciphertext: ciphertext.to_vec(),
            nonce: nonce_bytes,
        }),
        Err(e) => Err(Error::new(format!("encryption error: {}", e))),
    }
}

#[wasm_bindgen]
pub fn decrypt_wrapper(
    ciphertext: Vec<u8>,
    nonce: Vec<u8>,
    self_private_key: KeyVec,
    other_public_key: KeyVec,
) -> Result<Decrypt, JsError> {
    decrypt(ciphertext, nonce, self_private_key, other_public_key)
        .map_err(|e| JsError::new(&e.to_string()))
}

pub fn decrypt(
    ciphertext: Vec<u8>,
    nonce: Vec<u8>,
    self_private_key: KeyVec,
    other_public_key: KeyVec,
) -> Result<Decrypt, Error> {
    let secret: [u8; KEY_LEN] = self_private_key
        .try_into()
        .map_err(|e: Error| e.with_context("private key".to_string()))?;
    let public: [u8; KEY_LEN] = other_public_key
        .try_into()
        .map_err(|e: Error| e.with_context("public key".to_string()))?;

    let shared_secret = key_agreement(secret, public);

    decrypt_by_shared_secret(ciphertext, &shared_secret, nonce)
}

pub fn decrypt_by_shared_secret(
    ciphertext: Vec<u8>,
    shared_secret: &[u8; 32],
    nonce: Vec<u8>,
) -> Result<Decrypt, Error> {
    let salt = SaltString::encode_b64(&nonce).unwrap();
    let key = apply_kdf(shared_secret, salt);

    let nonce = Nonce::from_slice(&key.nonce);
    let cipher = Aes256Gcm::new(&key.key);

    match cipher.decrypt(nonce, ciphertext.as_ref()) {
        Ok(decrypted) => Ok(Decrypt {
            ciphertext: decrypted.to_vec(),
        }),
        Err(e) => Err(Error::new(format!("decryption error: {}", e))),
    }
}

pub fn hash_data(data: Vec<u8>) -> HashResult {
    let mut hasher = Sha3_256::new();
    hasher.update(&data);
    HashResult {
        hash: hasher.finalize().to_vec(),
    }
}

pub fn generate_random_bytes(len: u32) -> Vec<u8> {
    let mut bytes = vec![0; len as usize];
    getrandom::getrandom(&mut bytes).unwrap();
    bytes
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_generate_random_bytes() {
        let result = crate::generate_random_bytes(32);
        assert_eq!(result.len(), 32);
    }

    #[test]
    fn test_generate_random_key() {
        let result = crate::generate_random_key();
        assert_eq!(result.private_key.key.len(), 32);
        assert_eq!(result.public_key.key.len(), 32);
    }

    #[test]
    fn test_encrypt_decrypt() {
        let message = "Hello, world!".as_bytes().to_vec();

        let result = crate::generate_random_key();
        let self_private_key = result.private_key;
        let self_public_key = result.public_key;

        let result = crate::generate_random_key();
        let other_private_key = result.private_key;
        let other_public_key = result.public_key;

        let encrypted = crate::encrypt(message.clone(), self_private_key, other_public_key);
        assert!(encrypted.is_ok());
        let encrypted = encrypted.unwrap();

        let decrypted = crate::decrypt(
            encrypted.ciphertext,
            encrypted.nonce,
            other_private_key,
            self_public_key,
        );
        assert!(decrypted.is_ok());
        assert_eq!(decrypted.unwrap().ciphertext, message);
    }

    #[test]
    fn test_encrypt_decrypt_invalid_key() {
        let message = "Hello, world!".as_bytes().to_vec();

        let result = crate::generate_random_key();
        let self_private_key = result.private_key;

        let result = crate::generate_random_key();
        let other_public_key = result.public_key;
        let other_private_key = result.private_key;

        let result = crate::generate_random_key();
        let bad_public_key = result.public_key;

        let encrypted = crate::encrypt(
            message.clone(),
            self_private_key.clone(),
            other_public_key.clone(),
        );
        assert!(encrypted.is_ok());
        let encrypted = encrypted.unwrap();

        let decrypted = crate::decrypt(
            encrypted.ciphertext,
            encrypted.nonce,
            other_private_key,
            bad_public_key,
        );
        assert!(decrypted.is_err());
    }

    #[test]
    fn test_encrypt_decrypt_invalid_nonce() {
        let message = "Hello, world!".as_bytes().to_vec();

        let result = crate::generate_random_key();
        let self_private_key = result.private_key;
        let self_public_key = result.public_key;

        let result = crate::generate_random_key();
        let other_private_key = result.private_key;
        let other_public_key = result.public_key;

        let encrypted = crate::encrypt(message.clone(), self_private_key, other_public_key);
        assert!(encrypted.is_ok());
        let encrypted = encrypted.unwrap();

        let decrypted = crate::decrypt(
            encrypted.ciphertext,
            vec![0; 12],
            other_private_key,
            self_public_key,
        );
        assert!(decrypted.is_err());
    }

    #[test]
    fn test_multi_shared_secret_generate() {
        let alice_keys = crate::generate_random_key();
        let bob_keys = crate::generate_random_key();
        let charlie_keys = crate::generate_random_key();

        let alice = crate::apply_private_key(vec![], alice_keys.private_key.clone(), true).unwrap();
        assert_eq!(alice.len(), 1);

        let bob = crate::apply_private_key(alice, bob_keys.private_key.clone(), true).unwrap();
        assert_eq!(bob.len(), 2);

        let mut charlie =
            crate::apply_private_key(bob, charlie_keys.private_key.clone(), true).unwrap();
        assert_eq!(charlie.len(), 3);
        let charlie_secret = charlie.remove(0);

        let mut alice = crate::apply_private_key(charlie, alice_keys.private_key, false).unwrap();
        assert_eq!(alice.len(), 2);
        let alice_secret = alice.remove(0);

        assert_eq!(alice_secret.key, charlie_secret.key);

        let mut bob = crate::apply_private_key(alice, bob_keys.private_key, false).unwrap();
        assert_eq!(bob.len(), 1);
        let bob_secret = bob.remove(0);

        assert_eq!(bob_secret.key, charlie_secret.key);
    }
}
