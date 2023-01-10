package com.example.security.controller;

import com.example.security.entity.Role;
import com.example.security.entity.User;
import com.example.security.model.TokenDto;
import com.example.security.model.UserModel;
import com.example.security.model.UserVerify;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;
import com.example.security.response.Response;
import com.example.security.service.SecurityService;
import com.example.security.util.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.security.model.userRest;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthenticationController {

    @Value("idClient")
    private String idClient;
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
        return this.securityService.login(credentials, request, response);
    }

    @PostMapping("/login/google")
    public ResponseEntity<?> loginGoogle(@RequestBody TokenDto tokenDto, HttpServletResponse response, HttpServletRequest request) throws IOException {
        NetHttpTransport transport = new NetHttpTransport();
        JacksonFactory factory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier.Builder ver =
                new GoogleIdTokenVerifier.Builder(transport,factory)
                        .setAudience(Collections.singleton(idClient));
        GoogleIdToken googleIdToken = GoogleIdToken.parse(ver.getJsonFactory(),tokenDto.getToken());
        GoogleIdToken.Payload payload = googleIdToken.getPayload();
        return this.securityService.loginWithGoogle(payload, response, request);
    }

    @PostMapping("/login/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody userRest user) {
        System.out.println("the data we get email " + user.getEmail() + " the password " + user.getPassword() + " and the code " + user.getCode());
        return this.securityService.resetPassword(user);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role r = roleRepository.findByName("CIVIL").get();
        user.setRoles(r);
        user.setEnabled(true);
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
    @PutMapping("/user")
    public void updateUser(@RequestBody User u) {
        System.out.println("the value of id " + u.getId());
        User u1 = userRepository.findById(u.getId()).get();
        if (!u.getPassword().equals("")) {
            u1.setPassword(passwordEncoder.encode(u.getPassword()));
        }
        u1.setEmail(u.getEmail());
        u1.setName(u.getName());
        u1.setMunicpalite(u.getMunicpalite());
        userRepository.save(u1);
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
        System.out.println("we are here here here");
        this.securityService.save(file, employee);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/employee/muni/{id}")
    public ResponseEntity<?> getEmployeeByMunicipalite(@PathVariable String id) {
        return new ResponseEntity<>(this.userRepository.findByMunicpalite(id), HttpStatus.OK);
    }

    @GetMapping("/employee/roles/{role}")
    public ResponseEntity<?> getEmployeeByRoles(@PathVariable String role) {
        Role r = roleRepository.findByName(role).get();
        return new ResponseEntity<>(this.userRepository.findByRoles(r), HttpStatus.OK);
    }

    @GetMapping("/employee/roles/{role}/{token}")
    public ResponseEntity<?> getEmployeeByRolesAndMunicipalite(@PathVariable String role, @PathVariable String token, HttpServletRequest request) {
        Role r = roleRepository.findByName(role).get();
        User u = (User) this.getUser(request).getBody();
        return new ResponseEntity<>(this.userRepository.findByRolesAndMunicpalite(r, u.getMunicpalite()), HttpStatus.OK);
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

    @GetMapping("/employee/email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        return new ResponseEntity<>(userRepository.findByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/login/reset/{email}")
    public ResponseEntity<?> sendEmail(@PathVariable String email) {
        return this.securityService.sendEmailResetPassword(email);
    }

    @PostMapping("/login/verify")
    public ResponseEntity<?> verifyAccount(@RequestBody UserVerify param) {
        return this.securityService.verifyAccount(param);
    }
}


