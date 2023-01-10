package com.example.security.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String name;
    private String password;
    private String image;
    private String municpalite;
    @Column(columnDefinition = "boolean default false")
    private Boolean enabled;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "verification_code_reset")
    private String verificationCodeReset;
    @ManyToOne
    @JoinColumn(name = "roles_id")
    private Role roles;

    private Long user_id;
}
