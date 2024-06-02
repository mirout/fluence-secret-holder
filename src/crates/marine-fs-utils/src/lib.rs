use std::{
    fs,
    path::{Path, PathBuf},
};

use marine_error::Error;
use marine_rs_sdk::ParticleParameters;

pub const SERVICE_TEMP_DIR: &str = "/tmp";
pub const MODULE_TEMP_DIR: &str = "/tmp/module";
pub const PARTICLE_VAULT_DIR: &str = "/tmp/vault";
pub const SERVICE_PERMANENT_DIR: &str = "/storage";
pub const MODULE_PERMANENT_DIR: &str = "/storage/module";

fn save<P>(directory: P, file_name: &str, data: &[u8]) -> Result<(), Error>
where
    P: AsRef<Path> + std::fmt::Display,
{
    let path = PathBuf::from(format!("{}/{}", directory, file_name));
    fs::write(path, data).map_err(|e| Error::new(format!("failed to save file: {}", e)))
}

fn read<P>(directory: P, file_name: &str) -> Result<Vec<u8>, Error>
where
    P: AsRef<Path> + std::fmt::Display,
{
    let path = PathBuf::from(format!("{}/{}", directory, file_name));
    fs::read(path).map_err(|e| Error::new(format!("failed to read file: {}", e)))
}

fn delete<P>(directory: P, file_name: &str) -> Result<(), Error>
where
    P: AsRef<Path> + std::fmt::Display,
{
    let path = PathBuf::from(format!("{}/{}", directory, file_name));
    fs::remove_file(path).map_err(|e| Error::new(format!("failed to delete file: {}", e)))
}

pub trait MarineDir {
    const DIRECTORY: &'static str;
    const ERROR_CONTEXT: &'static str;

    fn save(&self, file_name: &str, data: &[u8]) -> Result<(), Error> {
        save(Self::DIRECTORY, file_name, data)
            .map_err(|e| e.with_context(Self::ERROR_CONTEXT.to_string()))
    }
    fn read(&self, file_name: &str) -> Result<Vec<u8>, Error> {
        read(Self::DIRECTORY, file_name)
            .map_err(|e| e.with_context(Self::ERROR_CONTEXT.to_string()))
    }
    fn delete(&self, file_name: &str) -> Result<(), Error> {
        delete(Self::DIRECTORY, file_name)
            .map_err(|e| e.with_context(Self::ERROR_CONTEXT.to_string()))
    }
    fn get_host_path(&self) -> Result<String, Error> {
        std::env::var(Self::DIRECTORY).map_err(|e| Error::new(e.to_string()))
    }
}

#[derive(Default)]
pub struct ServiceTempDir;

impl MarineDir for ServiceTempDir {
    const DIRECTORY: &'static str = SERVICE_TEMP_DIR;
    const ERROR_CONTEXT: &'static str = "service temp dir";
}

#[derive(Default)]
pub struct ModuleTempDir;

impl MarineDir for ModuleTempDir {
    const DIRECTORY: &'static str = MODULE_TEMP_DIR;
    const ERROR_CONTEXT: &'static str = "module temp dir";
}

#[derive(Default)]
pub struct ServicePermanentDir;

impl MarineDir for ServicePermanentDir {
    const DIRECTORY: &'static str = SERVICE_PERMANENT_DIR;
    const ERROR_CONTEXT: &'static str = "service permanent dir";
}

#[derive(Default)]
pub struct ModulePermanentDir;

impl MarineDir for ModulePermanentDir {
    const DIRECTORY: &'static str = MODULE_PERMANENT_DIR;
    const ERROR_CONTEXT: &'static str = "module permanent dir";
}

pub struct ParticleVaultDir {
    particle_dir: String,
    particle: ParticleParameters,
}

impl ParticleVaultDir {
    pub fn new(particle: ParticleParameters) -> Self {
        let directory = format!("{}/{}/", Self::DIRECTORY, format_particle_dir(&particle));
        Self {
            particle_dir: directory,
            particle,
        }
    }

    pub fn get_host_path(&self) -> Result<String, Error> {
        std::env::var(Self::DIRECTORY)
            .map(|dir| format!("{}/{}", dir, format_particle_dir(&self.particle)))
            .map_err(|e| Error::new(e.to_string()))
    }
}

impl MarineDir for ParticleVaultDir {
    const DIRECTORY: &'static str = PARTICLE_VAULT_DIR;
    const ERROR_CONTEXT: &'static str = "particle vault dir";

    fn save(&self, file_name: &str, data: &[u8]) -> Result<(), Error> {
        save(&self.particle_dir, file_name, data)
            .map_err(|e| e.with_context(Self::ERROR_CONTEXT.to_string()))
    }

    fn read(&self, file_name: &str) -> Result<Vec<u8>, Error> {
        read(&self.particle_dir, file_name)
            .map_err(|e| e.with_context(Self::ERROR_CONTEXT.to_string()))
    }

    fn delete(&self, file_name: &str) -> Result<(), Error> {
        delete(&self.particle_dir, file_name)
            .map_err(|e| e.with_context(Self::ERROR_CONTEXT.to_string()))
    }
}

fn format_particle_dir(particle: &ParticleParameters) -> String {
    format!("{}-{}", particle.id, particle.token)
}
