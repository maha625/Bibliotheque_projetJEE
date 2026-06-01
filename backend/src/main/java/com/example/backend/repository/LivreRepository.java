package com.example.backend.repository;

import com.example.backend.entity.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {

    // Nouveau : compte les livres groupés par catégorie
    @Query("SELECT l.categorie.libelle, COUNT(l) FROM Livre l GROUP BY l.categorie.libelle")
    List<Object[]> countLivresParCategorie();

    // Nouveau : liste complète pour export (avec JOIN FETCH pour éviter N+1)
    @Query("SELECT l FROM Livre l LEFT JOIN FETCH l.categorie LEFT JOIN FETCH l.details")
    List<Livre> findAllWithDetails();
}