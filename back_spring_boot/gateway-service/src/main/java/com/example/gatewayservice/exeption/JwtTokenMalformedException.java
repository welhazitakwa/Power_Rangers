package com.example.gatewayservice.exeption;

public class JwtTokenMalformedException extends Exception{
    public JwtTokenMalformedException(String message) {
        super(message);
    }
}
