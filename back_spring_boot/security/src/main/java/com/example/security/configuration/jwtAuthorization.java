package com.example.security.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class jwtAuthorization extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
//            decrypt the jwt
            try {
                String jwt = token.substring(7);
                Algorithm algo1 = Algorithm.HMAC256("secret");
                JWTVerifier jwtVerifier = JWT.require(algo1).build();
                DecodedJWT decodedJWT = jwtVerifier.verify(jwt);
                String subject = decodedJWT.getSubject();
                String roles = decodedJWT.getClaim("roles").asString();
                ArrayList<SimpleGrantedAuthority> a = new ArrayList<>();
                a.add(new SimpleGrantedAuthority(roles));
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(subject, null, a);
//            authenticate if there is no exeption
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                response.setHeader("error-message", e.getMessage());
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
