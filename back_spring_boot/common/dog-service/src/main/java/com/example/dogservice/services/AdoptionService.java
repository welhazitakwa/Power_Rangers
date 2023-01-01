package com.example.dogservice.services;



import com.example.dogservice.entities.Adoption;
import com.example.dogservice.repositories.AdoptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdoptionService {
    private final AdoptionRepository repo;

    public AdoptionService(AdoptionRepository repo) {
        this.repo = repo;
    }
    public List<Adoption> findAll() {

        return repo.findAll();
    }
    public List<Adoption> findByIdUser(Long  idUser)
    {
        return repo.findByIdUser(idUser);
    }
    public Adoption save(Adoption adoption) {
        return repo.save(adoption);
    }



}
