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

    @GetMapping("/{hotelId}")
    public List<HotelImage> getImagesByHotel(@PathVariable String hotelId) {
        return hotelImageRepository.findByHotelId(hotelId);
    }

    @GetMapping("/{hotelId}/primary")
    public HotelImage getPrimaryImage(@PathVariable String hotelId) {
        return hotelImageRepository.findByHotelIdAndIsPrimary(hotelId, true);
    }
}
