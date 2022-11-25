package com.example.dogcategoriesservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("dog-category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogCategory {
    @Id
    private String id;
    private String name;
    private String photo;
}
