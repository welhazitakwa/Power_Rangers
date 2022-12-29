package com.example.security.configuration;

import com.example.security.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationHeader extends BasicAuthenticationFilter {

    private JwtUtil jwtUtil;

    private UserDetailsServiceImpl userDetailsService;
    public JwtAuthorizationHeader(AuthenticationManager authenticationManager,
                                  JwtUtil jwtUtil,
                                  UserDetailsServiceImpl userDetailsService) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("mak tlawej 3laya hani lenna ya m3allem ");
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
//            decrypt the jwt
            try {
                String jwt = token.substring(7);
                jwtUtil.validateToken(jwt);
                System.out.println("we terminate validate the token ");
//                Claims claims = jwtUtil.getClaims(token);
//                String mail = claims.getSubject();
//                System.out.println("the subject is " + claims.get("subject") + " and the mail is " + mail);
                String subject = jwtUtil.getUserNameFromJwtToken(jwt);
                System.out.println("the subject " + subject);
                UserDetails userDetails = userDetailsService.loadUserByUsername(subject);
//                Algorithm algo1 = Algorithm.HMAC256("secret");
//                JWTVerifier jwtVerifier = JWT.require(algo1).build();
//                DecodedJWT decodedJWT = jwtVerifier.verify(jwt);
//                String subject = decodedJWT.getSubject();
//                String roles = decodedJWT.getClaim("roles").asString();
//                System.out.println("the value of roles " + roles);
//                ArrayList<SimpleGrantedAuthority> a = new ArrayList<>();
//                a.add(new SimpleGrantedAuthority(roles));
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(subject, null, userDetails.getAuthorities());
//            authenticate if there is no exeption
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                System.out.println("femma ghalta fi jwt ta3ek " + e.getMessage());
                filterChain.doFilter(request, response);
            }
            System.out.println("hano c bon 7atitou el user fi  context");
        } else {
            System.out.println("barra slm    ");
            filterChain.doFilter(request, response);
        }
    }

    @Override
    protected void onSuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, Authentication authResult) throws IOException {
        super.onSuccessfulAuthentication(request, response, authResult);
    }

}
