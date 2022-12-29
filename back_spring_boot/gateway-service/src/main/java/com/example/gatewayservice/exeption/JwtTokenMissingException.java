package com.example.gatewayservice.exeption;

public class JwtTokenMissingException extends Exception {
    public JwtTokenMissingException(String message) {
        super(message);
    }
}
