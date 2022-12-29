package com.example.security.controller;

import com.example.security.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class RoleController {
    private final RoleRepository roleRepository;
    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        return new ResponseEntity<>(roleRepository.findAll(), HttpStatus.OK);
    }

}
