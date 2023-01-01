package com.example.dogservice.entities;

import com.example.dogservice.enums.StateDog;
import com.example.dogservice.enums.Status;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Request {
    private Long idUser;
    private String email;
    private String nameUser;
    private String password;
    private String imageUser;
    private String municpalite;
    private Long idDog;
    private String gender;
    private String nameDog;
    private String color;
    private String description;
    private double weight;
    private StateDog state;
    private double price;
    private String imageDog;
    private int age;
    private String categoryID;

    private Status status;


    public void setDogPart(Dog dog) {
        this.idDog = dog.getId();
        this.gender = dog.getGender();
        this.nameDog = dog.getName();
        this.color = dog.getColor();
        this.description = dog.getDescription();
        this.weight = dog.getWeight();
        this.state = dog.getState();
        this.price = dog.getPrice();
        this.imageDog = dog.getImage();
        this.age = dog.getAge();
        this.categoryID = dog.getCategoryID();
    }
    public void setUserPart() {
        this.email = "email";
        this.nameUser = "nameUser";
        this.password = "password";
        this.imageUser = "imageUser";
        this.municpalite = "municpalite";
       }

}
