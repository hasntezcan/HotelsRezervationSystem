package com.example.hotelapp.controller;

import com.example.hotelapp.model.Booking;
import com.example.hotelapp.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ManagerReservationsController {

    @Autowired
    private BookingRepository bookingRepository;

    // ManagerID'ye göre rezervasyonları döndüren endpoint
    @GetMapping("/manager")
    public ResponseEntity<List<Booking>> getReservationsByManager(@RequestParam Long managerId) {
        List<Booking> bookings = bookingRepository.findReservationsByManagerId(managerId);
        return ResponseEntity.ok(bookings);
    }
}
