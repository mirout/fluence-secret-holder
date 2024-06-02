pub fn hexer(bytes: &[u8]) -> String {
    bytes
        .iter()
        .fold(String::new(), |acc, b| acc + &format!("{:02x}", b))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hexer() {
        assert_eq!(hexer(&[0, 1, 2, 3]), "00010203");
        assert_eq!(hexer(&[255, 255, 255, 255]), "ffffffff");
    }
}
