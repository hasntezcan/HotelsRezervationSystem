package com.example.hotelapp.controller;

import com.example.hotelapp.model.HotelAmenity;
import com.example.hotelapp.repository.HotelAmenityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hotelamenities")
public class HotelAmenityController {

    @Autowired
    private HotelAmenityRepository hotelAmenityRepository;

    @GetMapping
    public List<HotelAmenity> getAllHotelAmenities() {
        return hotelAmenityRepository.findAll();
    }
}
