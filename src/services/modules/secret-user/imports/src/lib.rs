pub mod imports {
    use marine_error::Error;
    use marine_rs_sdk::marine;
    use secret_user::types::GetSecretForUseResult;

    #[macro_export]
    macro_rules! generate_secret_initiate {
        () => {
            #[marine]
            pub fn secret_initiate_handshake(
                secret_id: String,
                iteration: u8,
                users_count: u8,
            ) -> ::marine_error::Error {
                ::secret_user_imports::imports::secret_initiate_handshake(
                    secret_id,
                    iteration,
                    users_count,
                )
            }
        };
    }

    #[marine]
    #[link(wasm_import_module = "secret_user_default")]
    #[module_import("secret_user_default")]
    extern "C" {
        pub fn secret_initiate_handshake(
            secret_id: String,
            iteration: u8,
            users_count: u8,
        ) -> Error;
        pub fn get_secret(secret_id: String) -> GetSecretForUseResult;
    }
}
