package com.example.dogcategoriesservice.controller;

import com.example.dogcategoriesservice.entities.DogCategory;
import com.example.dogcategoriesservice.repositories.DogCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dogCategories")
public class DogCategoryController {
    private final DogCategoryRepository dogCategoryRepository;
    @GetMapping("")
    public List<DogCategory> getCategories() {
        return dogCategoryRepository.findAll();
    }

    @PostMapping("")
    public void save(@RequestBody DogCategory dogCategory) {
        dogCategoryRepository.save(dogCategory);
    }

    @GetMapping("/{id}")
    public DogCategory getCategory(@PathVariable String id) {
        return dogCategoryRepository.findById(id).get();
    }

    @PutMapping
    public DogCategory update(@RequestBody DogCategory dogCategory) {
        return dogCategoryRepository.save(dogCategory);
    }
}
