package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;

    @OneToMany(mappedBy = "categorie")
    private List<Livre> livres;
}