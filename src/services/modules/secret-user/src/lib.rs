pub mod types {
    #[allow(unused_imports)] // reason = "Used during code generation"
    use marine_error::Error;
    use marine_error_derive::MarineResult;
    use marine_rs_sdk::marine;

    #[marine]
    #[derive(Default, Debug, MarineResult)]
    pub struct GetSecretForUse {
        pub secret: Vec<u8>,
    }

    #[cfg(feature = "get_and_use_secret")]
    #[marine]
    #[derive(Default, Debug, MarineResult)]
    pub struct UseSecret {
        pub result: Vec<u8>,
    }
}
