package com.example.security.exeption;

public class JwtTokenMissingException extends Exception {
    public JwtTokenMissingException(String message) {
        super(message);
    }
}
