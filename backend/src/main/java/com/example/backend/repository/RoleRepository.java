package com.example.backend.repository;

import com.example.backend.entity.Role;
import com.example.backend.entity.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    // Cette ligne est INDISPENSABLE pour que userService puisse l'utiliser
    Optional<Role> findByName(ERole name);
}