package com.example.hotelapp.controller;

import com.example.hotelapp.model.HotelImage;
import com.example.hotelapp.repository.HotelImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel-images")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelImageController {

    @Autowired
    private HotelImageRepository hotelImageRepository;

    // GET all images for a specific hotel
    @GetMapping("/{hotelId}")
    public List<HotelImage> getImagesByHotelId(@PathVariable Long hotelId) {
        return hotelImageRepository.findByHotel_HotelId(hotelId);
    }

    // GET the primary image for a specific hotel
    @GetMapping("/{hotelId}/primary")
    public HotelImage getPrimaryImage(@PathVariable Long hotelId) {
        return hotelImageRepository.findByHotel_HotelIdAndIsPrimary(hotelId, true);
    }

    // ... other CRUD methods if needed ...
}