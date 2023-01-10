package com.example.security.service;

import com.example.security.configuration.UserDetailsServiceImpl;
import com.example.security.configuration.userDetails;
import com.example.security.entity.Role;
import com.example.security.entity.User;
import com.example.security.model.UserModel;
import com.example.security.model.UserVerify;
import com.example.security.model.userRest;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;
import com.example.security.response.Response;
import com.example.security.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.AllArgsConstructor;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.security.Static.fileUpload;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SecurityService {
    private final UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public void save(MultipartFile file, String employee) {
        System.out.println("the json " + employee);
        User u = new User();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            u = objectMapper.readValue(employee, User.class);
            System.out.println("and finally we did it " + u.getName() + " and the role is " + u.getRoles().getName());
            if (u.getRoles().getId() == null) {
                Role r = roleRepository.findByName(u.getRoles().getName()).get();
                u.setRoles(r);
            }
            if (u.getId() != 0) {
                User u1 = userRepository.findById(u.getId()).get();
                u.setEnabled(u1.getEnabled());
                u.setVerificationCode(u1.getVerificationCode());
                u.setVerificationCodeReset(u1.getVerificationCodeReset());
                System.out.println("the vlaue of user jad bouh " + u1.getName() + " and password " + u1.getPassword());
                if (u.getPassword() != null && !u.getPassword().equals("") && !u.getPassword().equals(u1.getPassword())) {
                    System.out.println("we are here because the passwords are differents");
                    u.setPassword(passwordEncoder.encode(u.getPassword()));
                } else {
                    u.setPassword(u1.getPassword());
                }
            } else {
                u.setVerificationCode(RandomStringUtils.randomAlphabetic(10));
                u.setEnabled(false);
                sendEmail(u);
                if (u.getPassword() == null) {
                    u.setPassword(passwordEncoder.encode("123"));
                } else {
                    u.setPassword(passwordEncoder.encode(u.getPassword()));
                }
            }
            if (file != null) {
                u.setImage(file.getOriginalFilename());
                System.out.println("mezelna msajlnach " + u.getId() + " role " + u.getRoles().getId());
                u = userRepository.save(u);
                System.out.println("kammelna sajelna");
                fileUpload.saveImage("/employee/" + u.getId(), file);
            } else {
                userRepository.save(u);
            }

        } catch (Exception e) {
            System.out.println("the exception is " + e.getMessage());
        }
    }

    public void sendEmail(User u) {
        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
                messageHelper.setTo(u.getEmail());
                messageHelper.setSubject("welcome");
                String htmlContent = "<div>Dear <b> " + u.getName() + "<br></b></div><div><b><br></b></div><div>this email is to confirm that you have successfully added</div><ul><li>your password : " + (u.getPassword() == null ? "123" : u.getPassword())+ "</li><li>your role: " + u.getRoles().getName() +"</li><li>Desciption of your role : " + u.getRoles().getDescription() +" </li><li>your verification code : " + u.getVerificationCode() +" </li></ul><div><br></div>";
                System.out.println("the value of html " + htmlContent);
                messageHelper.setText(htmlContent, true);
            }
        };
        javaMailSender.send(messagePreparator);
    }

    public ResponseEntity<?> loginWithGoogle(GoogleIdToken.Payload payload, HttpServletResponse response, HttpServletRequest request) {
        String email = payload.getEmail();
        String name = (String)payload.get("name");
        String photo = (String)payload.get("picture");
        System.out.println("the value of email " + email + " the value of name " + name + " the value of photo " + photo);
        User u = userRepository.findByEmail(email);
        if (u == null) {
            u = new User();
            u.setRoles(roleRepository.findByName("CIVIL").get());
            u.setEmail(email);
            u.setName(name);
            u.setImage(photo);
            u.setPassword(passwordEncoder.encode("123"));
            u.setMunicpalite("");
            u.setEnabled(true);
            u = userRepository.save(u);
        } else {
            userDetails u1 =  new userDetails(u);
            setResponse(response, u1);
            return new ResponseEntity<>(new Response("Login success :D"), HttpStatus.OK);
        }
        return this.login(new UserModel(u.getEmail(), "123"), request, response);
    }

    public ResponseEntity<?> login(UserModel credentials, HttpServletRequest request, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword())
            );
            System.out.println("first test test ");
            UserDetails u = (UserDetails) authentication.getPrincipal();

            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("mak t7eb 3la authori " + u.getAuthorities());
//            Algorithm algo = Algorithm.HMAC256("secret");
//            String jwt = JWT.create()
//                    .withSubject(credentials.getEmail())
//                    .withExpiresAt(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
//                    .withIssuer(request.getRequestURL().toString())
//                    .withClaim("roles", u.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
//                    .sign(algo);


            setResponse(response, u);
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
            System.out.println("ya lm3allem barra thabetlna ommorek " + badCredentialsException.getMessage());
            return new ResponseEntity<>(new Response("Wrong password and email"), HttpStatus.UNAUTHORIZED);
        } catch(Exception e) {
            System.out.println("here here we get an error let's see " + e.getMessage());
            return new ResponseEntity<>(new Response("you should verify your acount "), HttpStatus.FORBIDDEN);
        }
    }

    private void setResponse(HttpServletResponse response, UserDetails u) {
        String jwt = jwtUtil.generateJwtToken(u);
        response.setHeader("Authorization", jwt);
        response.setHeader("Roles", u.getAuthorities().toString());
        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader("Access-Control-Expose-Headers", "Roles");
    }

    public ResponseEntity<?> verifyAccount(UserVerify user) {
        Optional<User> u = userRepository.findByEmailAndVerificationCode(user.getEmail(), user.getVerify_code());
        if (u.isPresent()) {
            u.get().setEnabled(true);
            u.get().setVerificationCode(null);
            userRepository.save(u.get());
            return new ResponseEntity<>(new Response("your account now is verified"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response("please verify your email or verification code"), HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> resetPassword(userRest user) {
        Optional<User> user1 = userRepository.findByEmailAndVerificationCodeReset(user.getEmail(), user.getCode());
        if (user1.isPresent()) {
            user1.get().setPassword(passwordEncoder.encode(user.getPassword()));
            user1.get().setVerificationCodeReset("");
            userRepository.save(user1.get());
            return new ResponseEntity<>(new Response("success"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response("your verification code or mail incorrect"), HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> sendEmailResetPassword(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return new ResponseEntity<>(new Response("your email not does not exist"), HttpStatus.NOT_FOUND);
        } else {
            user.setVerificationCodeReset(RandomStringUtils.randomAlphabetic(10));
            userRepository.save(user);
            MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
                @Override
                public void prepare(MimeMessage mimeMessage) throws Exception {
                    MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
                    messageHelper.setTo(email);
                    messageHelper.setSubject("reset password");
                    String htmlContent = "<div>Dear " + user.getName() + "</div><div><br></div><div>please use this code to reset your password</div><h3><font color=\"blue\"><br></font>\n" + user.getVerificationCodeReset() +
                            "</h3></font></h4><h3><div><br></div><div>thanks</div><br></div>";
                    System.out.println("the value of html " + htmlContent);
                    messageHelper.setText(htmlContent, true);
                }
            };
            javaMailSender.send(messagePreparator);
            return new ResponseEntity<>(new Response("success"), HttpStatus.OK);
        }
    }
}
