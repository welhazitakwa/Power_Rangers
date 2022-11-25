package com.example.dogservice.services;

import com.example.dogservice.entities.Dog;
import com.example.dogservice.repositories.DogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class DogService {
    private final DogRepository repo;
    public DogService(DogRepository dogRepository) {
        this.repo = dogRepository;
    }

    public Page<Dog> findAll(int size, int nb) {

        return repo.findAll(PageRequest.of(nb, size));
    }

    public Page<Dog> findByCategory(int size, int nb, String id) {
        return repo.findByCategoryID(id, PageRequest.of(nb, size));
    }

    public Page<Dog> findByName(int size, int nb, String name) {
        return repo.findByNameContainingIgnoreCase(name, PageRequest.of(nb, size));
    }

    public Dog save(Dog dog) {
        return repo.save(dog);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public Dog getById(Long id) {
        return repo.findById(id).get();
    }
}
