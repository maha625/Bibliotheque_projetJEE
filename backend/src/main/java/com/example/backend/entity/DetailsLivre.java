package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class DetailsLivre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int nombrePages;
    private String emplacementRayon;
    private String auteur;
    @OneToOne
    @JoinColumn(name = "livre_id")
    @JsonIgnore
    private Livre livre;
}
