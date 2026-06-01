package com.example.backend.controller;

import com.example.backend.dto.DashboardStatsDTO;
import com.example.backend.entity.Livre;
import com.example.backend.repository.CategorieRepository;
import com.example.backend.repository.LivreRepository;
import com.example.backend.repository.UserRepository;

// iText — imports complets pour éviter conflit avec POI Cell
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

// Apache POI — imports complets avec alias pour Cell
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/export")
@CrossOrigin("*")
public class ExportController {

    @Autowired
    private LivreRepository livreRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        long totalLivres     = livreRepository.count();
        long totalCategories = categorieRepository.count();
        long totalUsers      = userRepository.count();

        List<DashboardStatsDTO.CategorieStatDTO> livresParCategorie =
            livreRepository.countLivresParCategorie().stream()
                .map(row -> new DashboardStatsDTO.CategorieStatDTO(
                    row[0] != null ? (String) row[0] : "Sans catégorie",
                    (Long) row[1]))
                .collect(Collectors.toList());

        return new DashboardStatsDTO(totalLivres, totalCategories, totalUsers, livresParCategorie);
    }

    @GetMapping("/excel")
    public void exportExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=catalogue_livres.xlsx");

        List<Livre> livres = livreRepository.findAllWithDetails();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Catalogue");

            // Style en-tête
            CellStyle headerStyle = workbook.createCellStyle();
            org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Ligne d'en-tête — on utilise org.apache.poi.ss.usermodel.Cell explicitement
            Row header = sheet.createRow(0);
            String[] cols = {"ID", "Titre", "ISBN", "Catégorie", "Auteur", "Pages", "Emplacement"};
            for (int i = 0; i < cols.length; i++) {
                org.apache.poi.ss.usermodel.Cell cell = header.createCell(i);
                cell.setCellValue(cols[i]);
                cell.setCellStyle(headerStyle);
            }

            // Données
            int rowNum = 1;
            for (Livre l : livres) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(l.getId());
                row.createCell(1).setCellValue(l.getTitre() != null ? l.getTitre() : "");
                row.createCell(2).setCellValue(l.getIsbn() != null ? l.getIsbn() : "");
                row.createCell(3).setCellValue(l.getCategorie() != null ? l.getCategorie().getLibelle() : "");
                row.createCell(4).setCellValue(l.getDetails() != null && l.getDetails().getAuteur() != null ? l.getDetails().getAuteur() : "");
                row.createCell(5).setCellValue(l.getDetails() != null ? l.getDetails().getNombrePages() : 0);
                row.createCell(6).setCellValue(l.getDetails() != null && l.getDetails().getEmplacementRayon() != null ? l.getDetails().getEmplacementRayon() : "");
            }

            for (int i = 0; i < cols.length; i++) sheet.autoSizeColumn(i);
            workbook.write(response.getOutputStream());
        }
    }

    @GetMapping("/pdf")
    public void exportPdf(HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=catalogue_livres.pdf");

        List<Livre> livres = livreRepository.findAllWithDetails();

        PdfWriter writer = new PdfWriter(response.getOutputStream());
        PdfDocument pdf  = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Catalogue de la Bibliothèque")
            .setFontSize(18).setBold()
            .setTextAlignment(TextAlignment.CENTER)
            .setMarginBottom(20));

        float[] columnWidths = {1f, 3f, 2f, 2f, 2f, 1f, 2f};
        Table table = new Table(UnitValue.createPercentArray(columnWidths)).useAllAvailableWidth();

        String[] headers = {"ID", "Titre", "ISBN", "Catégorie", "Auteur", "Pages", "Rayon"};
        for (String h : headers) {
            // iText Cell — on utilise com.itextpdf.layout.element.Cell explicitement
            table.addHeaderCell(new com.itextpdf.layout.element.Cell()
                .add(new Paragraph(h).setBold().setFontColor(ColorConstants.WHITE))
                .setBackgroundColor(new DeviceRgb(30, 30, 60)));
        }

        boolean alternate = false;
        for (Livre l : livres) {
            com.itextpdf.kernel.colors.Color bg = alternate
                ? new DeviceRgb(240, 240, 255) : ColorConstants.WHITE;
            alternate = !alternate;

            String[] values = {
                String.valueOf(l.getId()),
                l.getTitre() != null ? l.getTitre() : "",
                l.getIsbn() != null ? l.getIsbn() : "",
                l.getCategorie() != null ? l.getCategorie().getLibelle() : "",
                l.getDetails() != null && l.getDetails().getAuteur() != null ? l.getDetails().getAuteur() : "",
                l.getDetails() != null ? String.valueOf(l.getDetails().getNombrePages()) : "",
                l.getDetails() != null && l.getDetails().getEmplacementRayon() != null ? l.getDetails().getEmplacementRayon() : ""
            };
            for (String v : values) {
                table.addCell(new com.itextpdf.layout.element.Cell()
                    .add(new Paragraph(v)).setBackgroundColor(bg));
            }
        }

        document.add(table);
        document.close();
    }
}