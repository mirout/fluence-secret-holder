pub mod types {
    use crypto_utils::types::KeyVec;
    #[allow(unused_imports)] // reason = "Used during code generation"
    use marine_error::Error;
    use marine_error_derive::MarineResult;
    use marine_rs_sdk::marine;

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct StartHandshake {
        pub public_key: KeyVec,
    }

    #[marine]
    pub struct CryptoMetadata {
        pub self_public_key: KeyVec,
        pub other_public_key: KeyVec,
        pub nonce: Vec<u8>,
    }

    #[marine]
    pub struct SaveSecretRequest {
        pub ciphertext: Vec<u8>,
        pub expired_at: u64,
        pub metadata: CryptoMetadata,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct SaveSecret {
        pub secret_id: String,
    }

    #[marine]
    pub struct GetSecretRequest {
        pub secret_id: String,
        pub metadata: CryptoMetadata,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct GetSecret {
        pub secret: Vec<u8>,
        pub nonce: Vec<u8>,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct SecretMetadata {
        pub is_anyone_can_use: bool,
        pub expired_at: u64,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct GetAllAvailableSecrets {
        pub secret_ids: Vec<String>,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct GetUserRole {
        pub role: String,
    }
}
