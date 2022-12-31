package com.example.dogservice.entities;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Table(name= "Demande")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Adoption {
    @Id
    private Long idDog;
    @Id
    private Long idUser;

}
