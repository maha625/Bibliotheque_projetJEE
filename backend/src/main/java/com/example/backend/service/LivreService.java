package com.example.backend.service;


import com.example.backend.entity.DetailsLivre;
import com.example.backend.entity.Livre;
import com.example.backend.repository.LivreRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivreService {
    @Autowired
    private LivreRepository livreRepository;

    public Livre enregistrerLivre(Livre livre){
        if (livre.getDetails() != null) {
            livre.getDetails().setLivre(livre);
        }
        return livreRepository.save(livre);
    }

    public List<Livre> listerTousLesLivres(){
        return livreRepository.findAll();
    }
    @Transactional
    public void supprimerLivre(Long id){
        livreRepository.deleteById(id);
    }
    @Transactional
    public Livre modifierLivre(Long id, Livre livreDetails){
        Livre livre=livreRepository.findById(id)
                .orElseThrow (()-> new RuntimeException("livre non trouve avec l'id: "+id));
        livre.setTitre(livreDetails.getTitre());
        livre.setIsbn(livreDetails.getIsbn());
        livre.setCategorie(livreDetails.getCategorie());
        DetailsLivre detailsLivre=livre.getDetails();
        detailsLivre.setAuteur(livreDetails.getDetails().getAuteur());
        detailsLivre.setNombrePages(livreDetails.getDetails().getNombrePages());
        detailsLivre.setEmplacementRayon(livreDetails.getDetails().getEmplacementRayon());
        livre.setDetails(detailsLivre);
        return livreRepository.save(livre);
    }
    public Livre trouverParId(Long id) {
        return livreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé avec l'id: " + id));
    }
}
