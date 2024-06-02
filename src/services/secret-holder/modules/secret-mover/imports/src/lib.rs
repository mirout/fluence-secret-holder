pub mod imports {
    use marine_error::Error;
    use marine_rs_sdk::marine;
    use secret_mover::types::*;

    #[marine]
    #[link(wasm_import_module = "secret_mover")]
    #[module_import("secret_mover")]
    extern "C" {
        pub fn secret_initiate_handshake(
            secret_id: String,
            users_count: u8,
            iteration: u8,
        ) -> HandshakeResult;
        pub fn save_to_particle_vault(secret_id: String, secret: Vec<u8>, nonce: i64) -> Error;
    }
}
