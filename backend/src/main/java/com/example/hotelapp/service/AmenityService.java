package com.example.hotelapp.service;

import com.example.hotelapp.dto.AmenityDTO;
import com.example.hotelapp.model.HotelAmenity;
import com.example.hotelapp.model.AmenityTranslation;
import com.example.hotelapp.repository.HotelAmenityRepository;
import com.example.hotelapp.repository.AmenityTranslationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AmenityService {

    @Autowired
    private HotelAmenityRepository amenityRepo;

    @Autowired
    private AmenityTranslationRepository translationRepo;

    public List<AmenityDTO> getAmenitiesByLanguage(String lang) {
        List<HotelAmenity> base = amenityRepo.findAll();
        List<AmenityTranslation> trans = translationRepo.findByLanguageCode(lang);

        Map<Long, AmenityTranslation> byId = trans.stream()
            .collect(Collectors.toMap(AmenityTranslation::getAmenityId, t -> t));

        return base.stream().map(a -> {
            AmenityTranslation t = byId.get(a.getAmenityId());
            String name = (t != null ? t.getName() : a.getName());
            return new AmenityDTO(a.getAmenityId(), name, a.getIconUrl());
        }).collect(Collectors.toList());
    }
}
