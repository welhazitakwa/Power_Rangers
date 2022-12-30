package com.example.security.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModeFlutter {
    private int id;
    private String email;
    private String name;
    private String municipalite;
    private String password;
}
