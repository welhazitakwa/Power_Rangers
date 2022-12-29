package com.example.security.service;

import com.example.security.entity.Role;
import com.example.security.entity.User;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.security.Static.fileUpload;

@Service
@AllArgsConstructor
public class SecurityService {
    private final UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

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
                System.out.println("the vlaue of user jad bouh " + u1.getName() + " and password " + u1.getPassword());
                if (u.getPassword() != null && !u.getPassword().equals("") && !u.getPassword().equals(u1.getPassword())) {
                    System.out.println("we are here because the passwords are differents");
                    u.setPassword(passwordEncoder.encode(u.getPassword()));
                } else {
                    u.setPassword(u1.getPassword());
                }
            } else {
//                String s = employee.substring(employee.indexOf("\"roles\":\"") + 1, employee.indexOf("\",\"municpalite\"")).split("roles\":\"")[1];
//                System.out.println("the value of role is " + s);
                if (u.getPassword() == null) {
                    u.setPassword(passwordEncoder.encode("123"));
                } else {
                    u.setPassword(passwordEncoder.encode(u.getPassword()));
                }
            }
            if (file != null) {
                u.setImage(file.getOriginalFilename());
                System.out.println("mezelna msajlnach " + u.getId() + " role " + u.getRoles().getId());
                userRepository.save(u);
                System.out.println("kammelna sajelna");
                fileUpload.saveImage("/employee/" + u.getId(), file);
            } else {
                userRepository.save(u);
            }
        } catch (Exception e) {
            System.out.println("the exception is " + e.getMessage());
        }
    }
}
