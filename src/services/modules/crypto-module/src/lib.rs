pub mod types {
    use crypto_utils::types::KeyVec;
    #[allow(unused_imports)] // reason = "Used during code generation"s
    use marine_error::Error;
    use marine_error_derive::MarineResult;
    use marine_rs_sdk::marine;

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct PrepareHandshake {
        pub public_key: KeyVec,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct FacadeDecrypt {
        pub ciphertext: Vec<u8>,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct FacadeEncrypt {
        pub ciphertext: Vec<u8>,
        pub nonce: Vec<u8>,
    }

    #[marine]
    pub struct CryptoHashResult {
        pub hash: Vec<u8>,
    }
}
