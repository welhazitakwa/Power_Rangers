package com.example.dogservice.entities;

import com.example.dogservice.enums.StateDog;
import com.example.dogservice.enums.Status;
import lombok.*;

import javax.persistence.*;


@Table(name= "Adoption")
@Entity
@NoArgsConstructor
public class Adoption {
    @Id
    @JoinColumn(name = "idDog", referencedColumnName = "idDog", insertable = false, updatable = false)
    private Long idDog;
    private Long idUser;
    @Column(columnDefinition = "varchar(25) default 'WAITING'")
    @Enumerated(EnumType.STRING)
    private Status status;
    public Long getIdDog() {
        return idDog;
    }

    public Adoption(Long idDog, Long idUser, Status status) {
        this.idDog = idDog;
        this.idUser = idUser;
        this.status = status;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
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
