package com.example.backend.service;

import com.example.backend.entity.Categorie;
import com.example.backend.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    public Categorie enregistrerCategorie (Categorie categorie){
        return categorieRepository.save(categorie);
    }

    public void supprimerCategorie(Long id){
        categorieRepository.deleteById(id);
    }

    public List<Categorie> getAllCategorie(){
        return categorieRepository.findAll();
    }
    public Categorie modifierCategorie(Long id, Categorie categorie){
        Categorie categorie1=categorieRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("Categorie non reconnue avec l'id:"+id));
        categorie1.setLibelle(categorie.getLibelle());
        categorie1.setLivres(categorie.getLivres());
        return categorieRepository.save(categorie1);
    }

}
