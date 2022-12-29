package com.example.gatewayservice.configuration;
import com.example.gatewayservice.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Component
public class AuthConfig extends AbstractGatewayFilterFactory<AuthConfig.Config>{

    @Autowired
    private final JwtUtil jwtUtil;

    public AuthConfig(JwtUtil jwtUtil){
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        System.out.println("ena el Authconfig ne5dem loul");
        //Custom Pre Filter. Suppose we can extract JWT and perform Authentication
        return (exchange, chain) -> {
            System.out.println("First pre filter " + exchange.getRequest().getMethodValue());

            /*String cookieValue= exchange.getRequest().getCookies().getFirst(JwtProperties.ACCESS_TOKEN_STRING).getValue();

            System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx : " + cookieValue);*/

            ResponseEntity<?> responseEntity = interceptJWTFromHeader(exchange, chain);
            System.out.println("hani bech nthabet " + responseEntity.getStatusCode());
            if(responseEntity.getStatusCode().equals(HttpStatus.UNAUTHORIZED)){
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return response.setComplete();
            }
            if(responseEntity.getStatusCode().equals(HttpStatus.BAD_REQUEST)){
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.BAD_REQUEST);
                return response.setComplete();
            }

            if(responseEntity.getStatusCode().equals(HttpStatus.OK)){

                return chain.filter(exchange).then(Mono.fromRunnable(()->{
                     System.out.println("First post filter");

                    /*System.out.println("ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc : cookie : "+
                            exchange.getResponse().getHeaders().getFirst(HttpHeaders.SET_COOKIE));*/

                }));
            }

            return null;
        };
    }


    public static class Config {
    }

    private ResponseEntity<?> interceptJWTFromHeader(ServerWebExchange exchange, GatewayFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();

        // list that contains endpoints that are excluded from this filter
        final List<String> apiEndpoints = new ArrayList<>();
        apiEndpoints.add("/register");
        apiEndpoints.add("/login");

        // making sure that the request's url is not excluded
        Predicate<ServerHttpRequest> isApiSecured = r -> apiEndpoints.stream()
                .noneMatch(uri -> r.getURI().getPath().contains(uri));

        // if the request's url is not excluded
        if (isApiSecured.test(request)) {
            // if the request contains a JWT in the header
            if (!request.getHeaders().containsKey("Authorization")) {
                return new ResponseEntity<>(new Response("there is no token !"), HttpStatus.UNAUTHORIZED);
            }

            // if so, we grab the token
            final String token = request.getHeaders().getOrEmpty("Authorization").get(0).replace("Bearer ","");

            // then we validate the token
            try {
                jwtUtil.validateToken(token);
            } catch (Exception e) {
                // e.printStackTrace();
                System.out.println("we are in invalid request ");
                return new ResponseEntity<>(new Response("Invalid token !"), HttpStatus.BAD_REQUEST);
            }

            // if we reached this line it means that the token is valid
            // so we just grab the claims
//            Claims claims = jwtUtil.getClaims(token);
//            // then we add the "email" to the REQUEST's header
//            exchange.getRequest()
//                    .mutate()
////                    .header("Authorization", "") // removing the token value from the request header
//                    // .header("email", String.valueOf(claims.get("sub")))
//                    .build(); // we just pass the request with the jwt that contains the claims
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}