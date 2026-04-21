package com.example.backend.repository;

import com.example.backend.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie,Long> {
}
