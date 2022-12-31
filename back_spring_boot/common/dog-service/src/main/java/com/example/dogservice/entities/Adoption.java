package com.example.dogservice.entities;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Table(name= "Adoption")
@Entity
@NoArgsConstructor
public class Adoption {
    @Id
    @JoinColumn(name = "idDog", referencedColumnName = "idDog", insertable = false, updatable = false)
    private Long idDog;
    private Long idUser;

    public Long getIdDog() {
        return idDog;
    }

    @Override
    public String toString() {
        return "Adoption{" +
                "idDog=" + idDog +
                ", idUser=" + idUser +
                '}';
    }

    public void setIdDog(Long idDog) {
        this.idDog = idDog;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Adoption(Long idDog, Long idUser) {
        this.idDog = idDog;
        this.idUser = idUser;
    }
}
