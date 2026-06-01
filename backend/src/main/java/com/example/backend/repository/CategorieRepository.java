package com.example.backend.repository;

import com.example.backend.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {

    // Nouveau
    @Query("SELECT COUNT(c) FROM Categorie c")
    long countAll();
}