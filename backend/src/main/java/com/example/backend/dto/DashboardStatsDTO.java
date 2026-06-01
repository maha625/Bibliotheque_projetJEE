package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDTO {
    private long totalLivres;
    private long totalCategories;
    private long totalUsers;
    private List<CategorieStatDTO> livresParCategorie;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategorieStatDTO {
        private String categorie;
        private long count;
    }
}