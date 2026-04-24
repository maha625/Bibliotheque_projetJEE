package com.example.backend.dto;

import lombok.Data;
import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password; // Utilisé uniquement pour la création/modification
    private Set<String> roles; // On envoie juste les noms des rôles (ex: "ADMIN")
}