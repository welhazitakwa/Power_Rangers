package com.example.security.exeption;

public class JwtTokenMalformedException extends Exception{
    public JwtTokenMalformedException(String message) {
        super(message);
    }
}
