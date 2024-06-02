use curl_effector_imports as curl_effector;
use marine_fs_utils::MarineDir;
use marine_rs_sdk::{marine, module_manifest};
use secret_user_imports::{generate_secret_initiate, imports as secret_user};
use serde::{Deserialize, Serialize};

module_manifest!();

fn main() {}

generate_secret_initiate!();

#[marine]
#[derive(Default, Serialize, Deserialize)]
pub struct AlchemyRpcResponse {
    pub jsonrpc: String,
    pub id: u8,
    pub result: String,
}

#[marine]
pub struct AlchemyRpcResult {
    pub is_ok: bool,
    pub error: String,
    pub response: AlchemyRpcResponse,
}

fn make_request(method: &str, params: &str) -> String {
    format!("{{\"jsonrpc\":\"2.0\",\"method\":\"{method}\",\"params\":[{params}],\"id\":0}}",)
}

fn curl_request(url: &curl_effector::CurlRequest, request: &str) -> AlchemyRpcResult {
    let request_file = "request";
    let response_file = "response";

    let vault =
        marine_fs_utils::ParticleVaultDir::new(marine_rs_sdk::get_call_parameters().particle);

    let save_request = vault.save(request_file, request.as_bytes());
    if save_request.is_err() {
        return AlchemyRpcResult {
            is_ok: false,
            error: "Error saving request".to_string(),
            response: AlchemyRpcResponse::default(),
        };
    }

    curl_effector::curl_post(
        url.clone(),
        request_file.to_string(),
        response_file.to_string(),
    );

    let file = vault.read(response_file);
    if file.is_err() {
        return AlchemyRpcResult {
            is_ok: false,
            error: "Error reading response".to_string(),
            response: AlchemyRpcResponse::default(),
        };
    }

    let response = serde_json::from_slice(&file.unwrap());
    if response.is_err() {
        return AlchemyRpcResult {
            is_ok: false,
            error: "Error parsing response".to_string(),
            response: AlchemyRpcResponse::default(),
        };
    }

    AlchemyRpcResult {
        is_ok: true,
        error: "".to_string(),
        response: response.unwrap(),
    }
}

fn format_curl_request(api_key: &str) -> curl_effector::CurlRequest {
    let key = secret_user::get_secret(api_key.to_string());
    assert!(key.error.is_ok);
    let key = String::from_utf8_lossy(&key.value.secret).to_string();
    curl_effector::CurlRequest {
        url: format!("https://eth-mainnet.g.alchemy.com/v2/{}", key),
        headers: vec![],
    }
}

#[marine]
pub fn get_last_block(api_key: String) -> AlchemyRpcResult {
    let request = format_curl_request(&api_key);
    let rpc_request = make_request("eth_blockNumber", "");
    curl_request(&request, &rpc_request)
}

#[marine]
pub fn get_eth_hashrate(api_key: String) -> AlchemyRpcResult {
    let request = format_curl_request(&api_key);

    let rpc_request = make_request("eth_hashrate", "");
    curl_request(&request, &rpc_request)
}

#[marine]
pub fn get_eth_gas_price(api_key: String) -> AlchemyRpcResult {
    let request = format_curl_request(&api_key);

    let rpc_request = make_request("eth_gasPrice", "");
    curl_request(&request, &rpc_request)
}
#[marine]
pub fn get_eth_get_balance(api_key: String, address: String, block: String) -> AlchemyRpcResult {
    let request = format_curl_request(&api_key);

    let rpc_request = make_request("eth_getBalance", &format!("\"{}\", \"{}\"", address, block));
    curl_request(&request, &rpc_request)
}

#[marine]
pub fn get_eth_get_storage_at(
    api_key: String,
    address: String,
    position: String,
    block: String,
) -> AlchemyRpcResult {
    let request = format_curl_request(&api_key);

    let rpc_request = make_request(
        "eth_getStorageAt",
        &format!("\"{}\", \"{}\", \"{}\"", address, position, block),
    );
    curl_request(&request, &rpc_request)
}
