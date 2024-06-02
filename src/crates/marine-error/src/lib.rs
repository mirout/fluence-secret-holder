use marine_rs_sdk::marine;

#[marine]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Error {
    pub is_ok: bool,
    pub message: String,
}

pub type MarineResult<T> = std::result::Result<T, Error>;

impl Error {
    pub fn new(message: String) -> Self {
        Self {
            is_ok: false,
            message,
        }
    }

    pub fn with_context(self, message: String) -> Self {
        Self {
            message: format!("{}: {}", message, self.message),
            ..self
        }
    }
}

impl Default for Error {
    fn default() -> Self {
        Self {
            is_ok: true,
            message: "".to_string(),
        }
    }
}

impl From<MarineResult<()>> for Error {
    fn from(result: MarineResult<()>) -> Self {
        match result {
            Ok(()) => Self::default(),
            Err(error) => error,
        }
    }
}

impl From<Error> for MarineResult<()> {
    fn from(error: Error) -> Self {
        if error.is_ok {
            Ok(())
        } else {
            Err(error)
        }
    }
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl std::error::Error for Error {}
