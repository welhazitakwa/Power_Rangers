package com.example.dogservice.controller;

import com.example.dogservice.entities.Adoption;
import com.example.dogservice.entities.Dog;
import com.example.dogservice.services.AdoptionService;
import com.example.dogservice.services.DogService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("dogs")
public class DogController {

    private final DogService service;
    private final AdoptionService serviceAdoption;

    public DogController(DogService service, AdoptionService serviceAdoption) {
        this.service = service;
        this.serviceAdoption = serviceAdoption;
    }

    @GetMapping("/list_dogs")
    public Page<Dog> findAll(
            @RequestParam("size") int size,
            @RequestParam("nbPage") int nb
    ) {

        return service.findAll(size, nb);
    }

    @GetMapping("/category")
    public Page<Dog> findByCategory(
            @RequestParam("size") int size,
            @RequestParam("nbPage") int nb,
            @RequestParam("category_id") String id
    ) {
        return service.findByCategory(size, nb, id);
    }
    @GetMapping("/Adoption")
    public List<Adoption> findAllAdoption() {
        return serviceAdoption.findAll();
    }
    @GetMapping("/name")
    public Page<Dog> findByContainingName(
            @RequestParam("size") int size,
            @RequestParam("nbPage") int nb,
            @RequestParam("name") String name
    ) {
        return service.findByName(size, nb, name);
    }

    @PostMapping("/add")
    public Dog save(@RequestBody Dog dog) {
        System.out.println(dog);
        return service.save(dog);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam Long id) {
        service.deleteById(id);
    }

    @GetMapping("/{id}")
    public Dog getDogById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("")
    public void updateDog(@RequestBody Dog dog) {
        this.service.save(dog);
    }
}
