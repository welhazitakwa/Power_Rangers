package com.example.dogservice.repositories;

import com.example.dogservice.entities.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@RepositoryRestResource()
public interface DogRepository extends JpaRepository<Dog, Long> {
    Page<Dog> findAll(Pageable page);
    List<Dog> findByCategoryID(String categoryID);
    Page<Dog> findByCategoryID(String categoryID, Pageable page);
    Page<Dog> findByNameContainingIgnoreCase(String name, Pageable pageable);
}