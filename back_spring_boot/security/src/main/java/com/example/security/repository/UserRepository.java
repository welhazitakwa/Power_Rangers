package com.example.security.repository;

import com.example.security.entity.Role;
import com.example.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByMunicpalite(String s);

    List<User> findByRoles(Role roles);

    List<User> findByRolesAndMunicpalite(Role roles, String municpalite);

    Optional<User> findByEmailAndVerificationCode(String email, String verificationCode);
    Optional<User> findByEmailAndVerificationCodeReset(String email, String verificationCodeReset);
}
