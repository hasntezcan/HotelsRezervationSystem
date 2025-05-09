package com.example.hotelapp.repository;

import com.example.hotelapp.model.AmenityTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmenityTranslationRepository
       extends JpaRepository<AmenityTranslation, Long> {
    List<AmenityTranslation> findByLanguageCode(String languageCode);
}
