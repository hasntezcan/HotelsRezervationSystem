package com.example.hotelapp.controller;

import com.example.hotelapp.dto.AmenityDTO;
import com.example.hotelapp.model.HotelAmenity;
import com.example.hotelapp.repository.HotelAmenityRepository;
import com.example.hotelapp.service.AmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotelamenities")
public class HotelAmenityController {

    @Autowired
    private HotelAmenityRepository hotelAmenityRepository;

    @Autowired
    private AmenityService amenityService;

    @GetMapping
    public List<?> getAllHotelAmenities(@RequestParam(required = false) String lang) {
        if (lang != null && !lang.isBlank()) {
            return amenityService.getAmenitiesByLanguage(lang);
        } else {
            return hotelAmenityRepository.findAll();
        }
    }
}
