pub mod types {
    #[allow(unused_imports)] // reason = "Used during code generation"
    use marine_error::Error;
    use marine_error_derive::MarineResult;
    use marine_rs_sdk::marine;

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct SomeStruct {
        pub data: Vec<u8>,
    }

    #[marine]
    #[derive(Default, MarineResult)]
    pub struct Load {
        pub data: Vec<u8>,
    }
}
