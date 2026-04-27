package com.example.backend.dto;


import com.example.backend.entity.DetailsLivre;
import lombok.Data;

@Data
public class LivreDTO {
    private Long id;
    private String titre;
    private String isbn;
    private CategoriesDTO categorie;
    private DetailsLivre details;

    @Data
    public static class CategoriesDTO{
        private Long id;
        private String libelle;
    }

}