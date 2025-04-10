package com.example.hotelapp.controller;

import com.example.hotelapp.dto.AdminHotelDTO;
import com.example.hotelapp.service.AdminHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/hotels")
public class AdminHotelController {

    @Autowired
    private AdminHotelService adminHotelService;

    @GetMapping
    public ResponseEntity<List<AdminHotelDTO>> getAllAdminHotels() {
        List<AdminHotelDTO> hotels = adminHotelService.getAllAdminHotels();
        return ResponseEntity.ok(hotels);
    }
}
