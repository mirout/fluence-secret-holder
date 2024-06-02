use marine_error::Error;

use crate::types::{self, Role, SecretModel};

const SECRET_STORAGE_DB: &str = "/storage/secrets.db";

pub fn initialize_db() -> Result<(), Error> {
    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    db.execute(
        "CREATE TABLE IF NOT EXISTS secrets (
            secret_id TEXT NOT NULL PRIMARY KEY,
            secret BLOB NOT NULL,
            shared_secret BLOB NOT NULL,
            nonce INTEGER DEFAULT 1,
            is_anyone_can_use INTEGER DEFAULT FALSE,
            expired_at INTEGER DEFAULT 0
        );
        ",
    )
    .map_err(|_| Error::new("Failed to create table".to_owned()))?;

    db.execute(
        "CREATE TABLE IF NOT EXISTS users (
            user_id TEXT NOT NULL,
            secret_id TEXT NOT NULL,
            role TEXT NOT NULL,

            PRIMARY KEY (user_id, secret_id),
            FOREIGN KEY (secret_id) REFERENCES secrets(secret_id) ON DELETE CASCADE
        )",
    )
    .map_err(|_| Error::new("Failed to create table".to_owned()))?;

    Ok(())
}

pub fn permit_role(
    owner: Option<String>,
    user_id: &str,
    secret_id: &str,
    role: &Role,
) -> Result<(), Error> {
    if owner.is_some() {
        let role = get_user_role(&owner.unwrap(), secret_id)?;
        if role != Role::Owner {
            return Err(Error::new("Permission denied".to_owned()));
        }
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("INSERT INTO users (user_id, secret_id, role) VALUES (?, ?, ?)")
        .map_err(|e| {
            Error::new("Failed to prepare statement".to_owned()).with_context(e.to_string())
        })?;

    stmt.bind::<&str>(1, user_id)
        .map_err(|_| Error::new("Failed to bind user_id".to_owned()))?;
    stmt.bind::<&str>(2, secret_id)
        .map_err(|_| Error::new("Failed to bind secret_id".to_owned()))?;
    stmt.bind::<&str>(3, role.as_ref())
        .map_err(|_| Error::new("Failed to bind role".to_owned()))?;

    stmt.next().map_err(|e| {
        Error::new("Failed to execute statement".to_owned()).with_context(e.to_string())
    })?;

    Ok(())
}

pub fn save_secret(model: types::SecretModel) -> Result<(), Error> {
    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("INSERT INTO secrets (secret_id, secret, shared_secret, expired_at) VALUES (?, ?, ?, ?)")
        .map_err(|e| {
            Error::new("Failed to prepare statement".to_owned()).with_context(e.to_string())
        })?;

    stmt.bind::<&str>(1, model.id.as_ref())
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;
    stmt.bind::<&Vec<u8>>(2, model.secret.as_ref())
        .map_err(|_| Error::new("Failed to bind secret".to_owned()))?;
    stmt.bind::<&Vec<u8>>(3, &vec![1])
        .map_err(|_| Error::new("Failed to bind shared_secret".to_owned()))?;
    stmt.bind::<i64>(4, model.expired_at as i64)
        .map_err(|_| Error::new("Failed to bind expired_at".to_owned()))?;

    stmt.next().map_err(|e| {
        Error::new("Failed to execute statement".to_owned()).with_context(e.to_string())
    })?;

    Ok(())
}

fn model_from_row(row: &[marine_sqlite_connector::Value]) -> Result<SecretModel, Error> {
    let id = row[0]
        .as_string()
        .map(|s| s.to_string())
        .ok_or(Error::new("Failed to read id".to_owned()))?;

    let secret = row[1]
        .as_binary()
        .to_owned()
        .map(|b| b.to_vec())
        .ok_or(Error::new("Failed to read secret".to_owned()))?;

    let shared_secret = row[2]
        .as_binary()
        .to_owned()
        .map(|b| b.to_vec())
        .ok_or(Error::new("Failed to read shared_secret".to_owned()))?;

    let nonce = row[3].as_integer().unwrap_or(0);

    let is_anyone_can_use = row[4].as_integer().unwrap_or(0) != 0;

    let expired_at = row[5].as_integer().unwrap_or(0) as u64;

    Ok(SecretModel {
        id,
        secret,
        shared_secret,
        nonce,
        is_anyone_can_use,
        expired_at,
    })
}

pub fn get_secret(id: &str, user: &str, only_owner: bool) -> Result<SecretModel, Error> {
    let role = get_user_role(user, id)?;
    if role == Role::Unknown || role == Role::User && only_owner {
        return Err(Error::new("Permission denied".to_owned()));
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let sql = "SELECT secret_id, secret, shared_secret, nonce, is_anyone_can_use, expired_at
        FROM secrets
        WHERE secrets.secret_id = ?";

    let mut stmt = db.prepare(sql).map_err(|e| {
        Error::new("Failed to prepare statement".to_owned()).with_context(e.to_string())
    })?;

    stmt.bind::<&str>(1, id)
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;

    let mut cursor = stmt.cursor();

    if let Some(row) = cursor
        .next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?
    {
        Ok(model_from_row(row)?)
    } else {
        Err(Error::new("Secret not found".to_owned()))
    }
}

pub fn get_all_available_secrets(owner: &str, only_owner: bool) -> Result<Vec<SecretModel>, Error> {
    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut script = "
    SELECT secrets.secret_id, secret, shared_secret, nonce, is_anyone_can_use, expired_at 
    FROM secrets join users on secrets.secret_id = users.secret_id
    WHERE user_id = ? AND 
    "
    .to_owned();
    if !only_owner {
        script.push_str("(role = 'owner' OR role = 'user') OR is_anyone_can_use = TRUE");
    }

    let mut stmt = db.prepare(&script).map_err(|e| {
        Error::new("Failed to prepare statement".to_owned()).with_context(e.to_string())
    })?;

    stmt.bind::<&str>(1, owner)
        .map_err(|_| Error::new("Failed to bind owner".to_owned()))?;

    let mut cursor = stmt.cursor();

    let mut secrets = Vec::new();

    while let Some(row) = cursor
        .next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?
    {
        secrets.push(model_from_row(row)?);
    }

    Ok(secrets)
}

pub fn update_secret(id: &str, secret: Vec<u8>, owner: &str) -> Result<(), Error> {
    let role = get_user_role(owner, id)?;
    if role != Role::Owner {
        return Err(Error::new("Permission denied".to_owned()));
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("UPDATE secrets SET secret = ? WHERE secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<&Vec<u8>>(1, &secret)
        .map_err(|_| Error::new("Failed to bind secret".to_owned()))?;
    stmt.bind::<&str>(2, id)
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;

    stmt.next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?;

    let changed: usize = db.changes();
    if changed == 0 {
        return Err(Error::new("Secret not found".to_owned()));
    }

    Ok(())
}

pub fn delete_secret(id: &str, owner: &str) -> Result<(), Error> {
    let role = get_user_role(owner, id)?;
    if role != Role::Owner {
        return Err(Error::new("Permission denied".to_owned()));
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("DELETE FROM secrets WHERE secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<&str>(1, id)
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;

    stmt.next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?;

    let changed: usize = db.changes();
    if changed == 0 {
        return Err(Error::new("Secret not found".to_owned()));
    }

    Ok(())
}

pub fn change_secret_shared_secret(
    id: &str,
    shared_secret_key: Vec<u8>,
    owner: &str,
) -> Result<(), Error> {
    let role = get_user_role(owner, id)?;
    if role != Role::Owner {
        return Err(Error::new("Permission denied".to_owned()));
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("UPDATE secrets SET shared_secret = ? WHERE secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<&Vec<u8>>(1, &shared_secret_key)
        .map_err(|_| Error::new("Failed to bind shared_secret".to_owned()))?;
    stmt.bind::<&str>(2, id)
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;

    stmt.next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?;

    let changed: usize = db.changes();
    if changed == 0 {
        return Err(Error::new("Secret not found".to_owned()));
    }

    Ok(())
}

pub fn change_visibility(id: &str, is_anyone_can_use: bool, owner: &str) -> Result<(), Error> {
    let role = get_user_role(owner, id)?;
    if role != Role::Owner {
        return Err(Error::new("Permission denied".to_owned()));
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("UPDATE secrets SET is_anyone_can_use = ? WHERE secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<i64>(1, is_anyone_can_use as i64)
        .map_err(|_| Error::new("Failed to bind is_anyone_can_use".to_owned()))?;
    stmt.bind::<&str>(2, id)
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;

    stmt.next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?;

    let changed: usize = db.changes();
    if changed == 0 {
        return Err(Error::new("Secret not found".to_owned()));
    }

    Ok(())
}

pub fn increase_nonce(id: &str, _: &str) -> Result<(), Error> {
    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("UPDATE secrets SET nonce = nonce + 1 WHERE secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<&str>(1, id)
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;

    stmt.next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?;

    let changed: usize = db.changes();
    if changed == 0 {
        return Err(Error::new("Secret not found".to_owned()));
    }

    Ok(())
}

pub fn update_expiration(id: &str, expired_at: u64, owner: &str) -> Result<(), Error> {
    let role = get_user_role(owner, id)?;
    if role != Role::Owner {
        return Err(Error::new("Permission denied".to_owned()));
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("UPDATE secrets SET expired_at = ? WHERE secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<i64>(1, expired_at as i64)
        .map_err(|_| Error::new("Failed to bind expired_at".to_owned()))?;
    stmt.bind::<&str>(2, id)
        .map_err(|_| Error::new("Failed to bind id".to_owned()))?;

    stmt.next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?;

    let changed: usize = db.changes();
    if changed == 0 {
        return Err(Error::new("Secret not found".to_owned()));
    }

    Ok(())
}

pub fn get_user_role(user_id: &str, secret_id: &str) -> Result<Role, Error> {
    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("SELECT role FROM users WHERE user_id = ? AND secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<&str>(1, user_id)
        .map_err(|_| Error::new("Failed to bind user_id".to_owned()))?;
    stmt.bind::<&str>(2, secret_id)
        .map_err(|_| Error::new("Failed to bind secret_id".to_owned()))?;

    let mut cursor = stmt.cursor();

    if let Some(row) = cursor
        .next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?
    {
        let role = row[0]
            .as_string()
            .ok_or(Error::new("Failed to read role".to_owned()))?;

        return Ok(Role::from(role));
    }

    let mut stmt = db
        .prepare("SELECT is_anyone_can_use FROM secrets WHERE secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<&str>(1, secret_id)
        .map_err(|_| Error::new("Failed to bind secret_id".to_owned()))?;

    let mut cursor = stmt.cursor();

    if let Some(row) = cursor
        .next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?
    {
        let is_anyone_can_use = row[0]
            .as_integer()
            .map(|i| i != 0)
            .ok_or(Error::new("Failed to read is_anyone_can_use".to_owned()))?;

        if is_anyone_can_use {
            return Ok(Role::User);
        }
    }

    Ok(Role::Unknown)
}

pub fn revoke_role(owner: &str, user_id: &str, secret_id: &str) -> Result<(), Error> {
    let role = get_user_role(owner, secret_id)?;
    if role != Role::Owner {
        return Err(Error::new("Permission denied".to_owned()));
    }

    let db = marine_sqlite_connector::open(SECRET_STORAGE_DB).unwrap();

    let mut stmt = db
        .prepare("DELETE FROM users WHERE user_id = ? AND secret_id = ?")
        .map_err(|_| Error::new("Failed to prepare statement".to_owned()))?;

    stmt.bind::<&str>(1, user_id)
        .map_err(|_| Error::new("Failed to bind user_id".to_owned()))?;
    stmt.bind::<&str>(2, secret_id)
        .map_err(|_| Error::new("Failed to bind secret_id".to_owned()))?;

    stmt.next()
        .map_err(|_| Error::new("Failed to execute statement".to_owned()))?;

    let deleted: usize = db.changes();
    if deleted == 0 {
        return Err(Error::new("Role not found".to_owned()));
    }

    Ok(())
}
