package com.example.backend.dto;


import com.example.backend.entity.DetailsLivre;
import lombok.Data;

@Data
public class LivreDTO {
    private Long id;
    private String titre;
    private String isbn;
    private Long categorieId; // On utilise l'ID de la catégorie au lieu de l'objet complet
    private DetailsLivre details;

}