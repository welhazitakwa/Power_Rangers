package com.example.dogcategoriesservice.repositories;

import com.example.dogcategoriesservice.entities.DogCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DogCategoryRepository extends MongoRepository<DogCategory, String> {
}