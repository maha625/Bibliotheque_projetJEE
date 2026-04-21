package com.example.backend.mapper;

import com.example.backend.dto.LivreDTO;
import com.example.backend.entity.Livre;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring") // Pour pouvoir l'injecter avec @Autowired
public interface LivreMapper {
    LivreDTO toDTO(Livre livre);
    Livre toEntity(LivreDTO livreDTO);
    List<LivreDTO> toDTOs(List<Livre> livres);
}