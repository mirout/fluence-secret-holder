#!/bin/sh

mkdir ./.fluence/sqlite3 && cd ./.fluence/sqlite3

wget https://github.com/fluencelabs/sqlite/releases/download/sqlite-wasm-v0.18.2/sqlite3.wasm -O sqlite3.wasm

cd ../..
