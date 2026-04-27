package com.example.backend.controller;


import com.example.backend.entity.Categorie;
import com.example.backend.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
@CrossOrigin("*")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @PostMapping
    public Categorie ajouterCategorie(@RequestBody Categorie categorie){
        return categorieService.enregistrerCategorie(categorie);
    }
    @DeleteMapping("/{id}")
    public void DeleteCategorie(@PathVariable Long id){
        categorieService.supprimerCategorie(id);
    }
    @GetMapping
    public List<Categorie> obtenirTousLesCategories(){
        return categorieService.getAllCategorie();
    }
    @PutMapping("/{id}")
    public Categorie updateCategorie(@PathVariable Long id, @RequestBody Categorie categorie){
        return categorieService.modifierCategorie(id, categorie);
    }
}
