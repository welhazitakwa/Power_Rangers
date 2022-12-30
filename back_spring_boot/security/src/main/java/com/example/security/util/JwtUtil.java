package com.example.security.util;

import com.example.security.configuration.UserDetailsServiceImpl;
import com.example.security.exeption.JwtTokenMalformedException;
import com.example.security.exeption.JwtTokenMissingException;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private final String jwtSecret = "secret";

    public JwtUtil() {
    }

    private final long tokenValidity = 86400000;

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

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }


    public String generateJwtToken(Authentication authentication) {

        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        System.out.println("mak hachtek bel username " + userPrincipal.getUsername());
        HashMap<String, Object> hm = new HashMap<>();
        hm.put("roles", userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        return Jwts.builder()
                .setClaims(hm)
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + tokenValidity))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

}
