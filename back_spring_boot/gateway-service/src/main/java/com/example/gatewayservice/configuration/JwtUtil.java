package com.example.gatewayservice.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.gatewayservice.exeption.JwtTokenMalformedException;
import com.example.gatewayservice.exeption.JwtTokenMissingException;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;

@Component
public class JwtUtil {

    private final String jwtSecret = "secret";


    private final long tokenValidity = 5L;

    public Claims getClaims(final String token) {
        try {
            Claims body = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            return body;
        } catch (Exception e) {
            System.out.println(e.getMessage() + " => " + e);
        }
        return null;
    }

    public void validateToken(final String token) throws JwtTokenMalformedException, JwtTokenMissingException {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
        } catch (SignatureException ex) {
            System.out.println("ahna tw fi validateToken -> Invalid JWT signature");
            throw new JwtTokenMalformedException("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            System.out.println("ahna tw fi validateToken -> Invalid JWT token");
            throw new JwtTokenMalformedException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("ahna tw fi validateToken -> Expired JWT token");
            throw new JwtTokenMalformedException("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("ahna tw fi validateToken -> Unsupported JWT token");
            throw new JwtTokenMalformedException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("ahna tw fi validateToken -> JWT claims string is empty");
            throw new JwtTokenMissingException("JWT claims string is empty.");
        }
    }

}
