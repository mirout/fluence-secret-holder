pub mod imports {
    use crypto_module::types::{
        CryptoHashResult, FacadeDecryptResult, FacadeEncryptResult, PrepareHandshakeResult,
    };
    use crypto_utils::types::KeyVec;
    use marine_rs_sdk::marine;

    #[marine]
    #[link(wasm_import_module = "crypto_module")]
    #[module_import("crypto_module")]
    extern "C" {
        pub fn prepare_for_handshake() -> PrepareHandshakeResult;
        pub fn encrypt_message(
            self_public_key: KeyVec,
            other_public_key: KeyVec,
            message: Vec<u8>,
        ) -> FacadeEncryptResult;
        pub fn decrypt_message(
            self_public_key: KeyVec,
            other_public_key: KeyVec,
            nonce: Vec<u8>,
            ciphertext: Vec<u8>,
        ) -> FacadeDecryptResult;
        pub fn hash_data(data: Vec<u8>) -> CryptoHashResult;
    }
}
