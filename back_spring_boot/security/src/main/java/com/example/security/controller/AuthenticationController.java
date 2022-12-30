package com.example.security.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.security.entity.Role;
import com.example.security.entity.User;
import com.example.security.model.UserModeFlutter;
import com.example.security.model.UserModel;
import com.example.security.model.UserModelRegister;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;
import com.example.security.response.Response;
import com.example.security.service.SecurityService;
import com.example.security.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserModel credentials, HttpServletResponse response, HttpServletRequest request){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword())
            );
            UserDetails u = (UserDetails) authentication.getPrincipal();

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateJwtToken(authentication);
            System.out.println("mak t7eb 3la authori " + u.getAuthorities());
//            Algorithm algo = Algorithm.HMAC256("secret");
//            String jwt = JWT.create()
//                    .withSubject(credentials.getEmail())
//                    .withExpiresAt(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
//                    .withIssuer(request.getRequestURL().toString())
//                    .withClaim("roles", u.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
//                    .sign(algo);



             response.setHeader("Authorization", jwt);
             response.setHeader("Roles", u.getAuthorities().toString());
            response.addHeader("Access-Control-Expose-Headers", "Authorization");
            response.addHeader("Access-Control-Expose-Headers", "Roles");
            System.out.println("hano c bon 7atitlk ommorek fi header");
//            Cookie cookie = new Cookie(JwtProperties.ACCESS_TOKEN_STRING, JwtProperties.TOKEN_PREFIX_COOKIE + jwt);
//            cookie.setPath("/"); //
//            cookie.setMaxAge(14500); // expires after 4 hours (en sec!)
//            cookie.setSecure(false); // hethi ta3 ssl (https)
//            cookie.setHttpOnly(true);
//            response.setHeader("Access-Control-Allow-Credentials", "true");
//            response.addCookie(cookie);
            return new ResponseEntity<>(new Response("Login success :D"), HttpStatus.OK);
        }catch (BadCredentialsException badCredentialsException) {
            System.out.println("ya lm3allem barra thabetlna ommorek");
            return new ResponseEntity<>(new Response("Wrong password and email"), HttpStatus.UNAUTHORIZED);
        }
        //test commit
        catch (Exception e) {
            System.out.println("ya3tek 7zan");
            e.printStackTrace();
            return null;
        }

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return new ResponseEntity<>(this.userRepository.save(user), HttpStatus.OK);
    }
    @GetMapping("/token/{token}")
    public String getRoles(@PathVariable String token) {
        System.out.println("the token is " + token);
        Claims claims = jwtUtil.getClaims(token);
        System.out.println("the roles of this user " + claims.get("roles").toString());
        return claims.get("roles").toString();
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        String s = request.getHeader("Authorization").substring(7);
        Claims claims = jwtUtil.getClaims(s);
        String email = claims.get("sub").toString();
        return new ResponseEntity<>(userRepository.findByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/employee/all")
    public ResponseEntity<?> getEmployees() {
        return new ResponseEntity<>(this.userRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/employee/add")
    public void saveEmployee(@RequestParam(required = false) MultipartFile file, @RequestParam String employee) {
        this.securityService.save(file, employee);
    }
    @PutMapping("/employee/update")
    public ResponseEntity<?> updateEmployee1(@RequestParam(required = false) MultipartFile file, @RequestParam String employee) {
        this.securityService.save(file, employee);
        return new ResponseEntity<>(new Response("update succesfully"), HttpStatus.OK);
    }

    @PutMapping("/employee")
    public ResponseEntity<?> updateEmployee(@RequestParam(required = false) MultipartFile file, @RequestParam String employee) {
        this.securityService.save(file, employee);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/employee/muni/{id}")
    public ResponseEntity<?> getEmployeeByMunicipalite(@RequestParam String id) {
        return new ResponseEntity<>(this.userRepository.findByMunicpalite(id), HttpStatus.OK);
    }

    @GetMapping("/employee/roles/{role}")
    public ResponseEntity<?> getEmployeeByRoles(@RequestParam String role) {
        Role r = roleRepository.findByName(role).get();
        return new ResponseEntity<>(this.userRepository.findByRoles(r), HttpStatus.OK);
    }

    @GetMapping("/employee/roles/{role}/{muni}")
    public ResponseEntity<?> getEmployeeByRolesAndMunicipalite(@RequestParam String role, @RequestParam String muni) {
        Role r = roleRepository.findByName(role).get();
        return new ResponseEntity<>(this.userRepository.findByRolesAndMunicpalite(r, muni), HttpStatus.OK);
    }

    @GetMapping("/employee/find/{id}")
    public ResponseEntity<User> getAllEmployeeById (@PathVariable("id") Long id) {
        User employees = userRepository.findById(id).get();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @DeleteMapping("employee/delete/{id}")
    public void delete(@PathVariable Long id) {
        this.userRepository.deleteById(id);
    }
}


