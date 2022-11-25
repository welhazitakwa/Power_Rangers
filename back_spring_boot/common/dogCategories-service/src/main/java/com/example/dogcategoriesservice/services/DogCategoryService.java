package com.example.dogcategoriesservice.services;

import com.example.dogcategoriesservice.repositories.DogCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DogCategoryService {
    private final DogCategoryRepository dogCategoryRepository;
}
