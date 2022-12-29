package com.example.security.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModelRegister {
    private int id;
    private String email;
    private String image;
    private String name;
    private String jobTitle;
    private String municipalite;
}
