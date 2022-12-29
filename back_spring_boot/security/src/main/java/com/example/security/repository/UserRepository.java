package com.example.security.repository;

import com.example.security.entity.Role;
import com.example.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByMunicpalite(String s);

    List<User> findByRoles(Role roles);

    List<User> findByRolesAndMunicpalite(Role roles, String municpalite);

}
