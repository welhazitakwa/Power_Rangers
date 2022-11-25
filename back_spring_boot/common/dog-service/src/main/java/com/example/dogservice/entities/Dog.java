package com.example.dogservice.entities;

import com.example.dogservice.enums.StateDog;
import lombok.*;

import javax.persistence.*;

@Table(name= "dog")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Dog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String gender;
    private String name;
    private String color;
    @Column(length = 2000, columnDefinition = "TEXT")
    private String description;
    private double weight;
    @Column(columnDefinition = "varchar(25) default 'MALADE'")
    @Enumerated(EnumType.STRING)
    private StateDog state;
    @Column(columnDefinition = "double default 0")
    private double price;
    private String image;
    private int age;
    private String categoryID;
}