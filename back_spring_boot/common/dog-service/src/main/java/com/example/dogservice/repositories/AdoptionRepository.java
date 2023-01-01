package com.example.dogservice.repositories;

import com.example.dogservice.entities.Adoption;
import com.example.dogservice.entities.Dog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionRepository extends JpaRepository<Adoption, Long> {

       List<Adoption> findAll();
       List<Adoption> findByIdUser(Long  idUser);
       

}
