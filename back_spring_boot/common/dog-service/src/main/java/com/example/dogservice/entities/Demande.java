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
public class Demande {
    @Id
    private Long idDog;
    @Id
    private Long id;

    public Long getIdDog() {
        return idDog;
    }

    public void setIdDog(Long idDog) {
        this.idDog = idDog;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
