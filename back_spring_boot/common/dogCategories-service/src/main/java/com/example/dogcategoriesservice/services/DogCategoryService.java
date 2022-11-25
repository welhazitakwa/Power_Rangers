package com.example.dogcategoriesservice.services;

import com.example.dogcategoriesservice.repositories.DogCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class DogCategoryService {
    private final DogCategoryRepository dogCategoryRepository;
    @Autowired
    private WebClient.Builder webClient;
    public void deleteCategory(String id) {
        boolean x = this.webClient.build().get().uri("http://DOG-SERVICE/dogs/category/{id}", id).retrieve().bodyToMono(Boolean.class).block();
    }
}
