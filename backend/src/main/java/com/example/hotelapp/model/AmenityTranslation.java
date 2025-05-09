package com.example.hotelapp.model;

import jakarta.persistence.*;

@Entity
@Table(
    name = "amenity_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"amenity_id", "language_code"})
)
public class AmenityTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "translation_id")
    private Long translationId;

    @Column(name = "amenity_id", nullable = false)
    private Long amenityId;

    @Column(name = "language_code", nullable = false, length = 5)
    private String languageCode;

    @Column(name = "name", nullable = false)
    private String name;

    // Eğer description sütununu sildiysen bu alanı kaldırabilirsin
    // @Column(name = "description")
    // private String description;

    // Constructors

    public AmenityTranslation() {}

    public AmenityTranslation(Long amenityId, String languageCode, String name) {
        this.amenityId = amenityId;
        this.languageCode = languageCode;
        this.name = name;
    }

    // Getters and Setters

    public Long getTranslationId() {
        return translationId;
    }

    public void setTranslationId(Long translationId) {
        this.translationId = translationId;
    }

    public Long getAmenityId() {
        return amenityId;
    }

    public void setAmenityId(Long amenityId) {
        this.amenityId = amenityId;
    }

    public String getLanguageCode() {
        return languageCode;
    }

    public void setLanguageCode(String languageCode) {
        this.languageCode = languageCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
