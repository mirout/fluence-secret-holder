pub mod types {
    #[allow(unused_imports)] // reason = "Used during code generation"
    use marine_error::Error;
    use marine_error_derive::MarineResult;
    use marine_rs_sdk::marine;

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct SecretSaverSave {
        pub secret_id: String,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct SecretSaverGet {
        pub model: SecretModel,
    }

    pub type UpdateSecret = ();

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct AllAvailableSecrets {
        pub secrets: Vec<SecretModel>,
    }

    #[marine]
    #[derive(Default)]
    pub struct SecretModel {
        pub id: String,
        pub secret: Vec<u8>,
        pub shared_secret: Vec<u8>,
        pub nonce: i64,
        pub is_anyone_can_use: bool,
        pub expired_at: u64,
    }

    #[derive(Debug, Clone, PartialEq, Eq)]
    pub enum Role {
        Unknown,
        Owner,
        User,
    }

    impl AsRef<str> for Role {
        fn as_ref(&self) -> &str {
            match self {
                Self::Owner => "owner",
                Self::User => "user",
                Self::Unknown => "unknown",
            }
        }
    }

    impl From<&str> for Role {
        fn from(s: &str) -> Self {
            match s {
                "owner" => Self::Owner,
                "user" => Self::User,
                _ => Self::Unknown,
            }
        }
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct GetRole {
        pub role: String,
    }
}

pub mod storage;
