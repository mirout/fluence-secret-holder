#!/bin/sh

# This script builds project to Wasm and puts all created binary Wasm module into the artifacts dir

fluence build || true

rm artifacts/* || true
mkdir -p artifacts

cp ./target/wasm32-wasi/release/localfile_adapter.wasm artifacts/
cp ./target/wasm32-wasi/release/crypto_module.wasm artifacts/
cp ./target/wasm32-wasi/release/secret_facade.wasm artifacts/
cp ./target/wasm32-wasi/release/secret_saver_adapter.wasm artifacts/
cp ./target/wasm32-wasi/release/secret_mover.wasm artifacts/
cp ./target/wasm32-wasi/release/secret_user.wasm artifacts/
cp ./.fluence/sqlite3/sqlite3.wasm artifacts/

# facade/target/wasm32-wasi/release/facade.wasm 