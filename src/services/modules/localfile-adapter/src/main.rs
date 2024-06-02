use marine_error::Error;
use marine_error_derive::wrap_marine_result;
use marine_fs_utils::MarineDir;
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

use localfile_adapter::types::*;

module_manifest!();

fn main() {}

#[wrap_marine_result("save_file")]
pub fn save(file_name: String, data: Vec<u8>) -> Result<(), Error> {
    marine_fs_utils::ModuleTempDir.save(&file_name, &data)
}

#[wrap_marine_result("load_file")]
pub fn load(file_name: String) -> Result<Load, Error> {
    marine_fs_utils::ModuleTempDir
        .read(&file_name)
        .map(|data| Load { data })
}

#[wrap_marine_result("delete_file")]
pub fn delete(file_name: String) -> Result<(), Error> {
    marine_fs_utils::ModuleTempDir.delete(&file_name)
}

#[cfg(test)]
mod tests {
    use marine_rs_sdk_test::marine_test;

    #[marine_test(config_path = "../../../../../.fluence/test-configs/secret-holder_Config.toml")]
    fn test_save_load_delete(local_file: marine_test_env::localfile_adapter::ModuleInterface) {
        let file_name = "test_file.txt".to_string();
        let data = "test data test_data".as_bytes().to_vec();

        let save_result = local_file.save_file(file_name.clone(), data.clone());
        assert!(save_result.is_ok);

        let load_result = local_file.load_file(file_name.clone());
        assert!(load_result.error.is_ok);
        assert_eq!(load_result.value.data, data);

        let delete_result = local_file.delete_file(file_name.clone());
        assert!(delete_result.is_ok);

        let load_result = local_file.load_file(file_name.clone());
        assert!(!load_result.error.is_ok);
    }
}
