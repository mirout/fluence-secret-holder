build-service:
	fluence build || true

copy-wasm:
	rm artifacts/* || true
	mkdir -p artifacts

	cp ./target/wasm32-wasi/release/localfile_adapter.wasm artifacts/
	cp ./target/wasm32-wasi/release/crypto_module.wasm artifacts/
	cp ./target/wasm32-wasi/release/secret_facade.wasm artifacts/
	cp ./target/wasm32-wasi/release/secret_saver_adapter.wasm artifacts/
	cp ./target/wasm32-wasi/release/secret_mover.wasm artifacts/
	cp ./target/wasm32-wasi/release/secret_user.wasm artifacts/
	cp ./.fluence/sqlite3/sqlite3.wasm artifacts/

build-service-wasm: build-service copy-wasm

test-service: build-service-wasm
	cargo +nightly test

download-sqlite:
	mkdir -p ./.fluence/sqlite3
	cd ./.fluence/sqlite3 && wget https://github.com/fluencelabs/sqlite/releases/download/sqlite-wasm-v0.18.2/sqlite3.wasm -O sqlite3.wasm 

build-wasm-crypto: 
	wasm-pack build src/crates/crypto-utils --out-dir ../../../src/secret-holder-client/crypto-utils --target nodejs

build-secret-user-with-use:
	marine build --manifest-path ./src/services/modules/secret-user/Cargo.toml --release --all-features
	cp ./target/wasm32-wasi/release/secret_user.wasm src/services/modules/secret-user-with-use/secret_user_with_use.wasm

build-secret-user-without-use:
	marine build --manifest-path ./src/services/modules/secret-user/Cargo.toml --release
	cp ./target/wasm32-wasi/release/secret_user.wasm src/services/modules/secret-user-default/secret_user_default.wasm

build-secret-user: build-secret-user-with-use build-secret-user-without-use
