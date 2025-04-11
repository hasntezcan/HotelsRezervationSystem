package com.example.hotelapp.controller;

import com.example.hotelapp.model.Booking;
import com.example.hotelapp.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class ManagerReservationsController {

    @Autowired
    private BookingRepository bookingRepository;

    // ManagerReservationsController.java
@GetMapping("/manager")
public ResponseEntity<List<Map<String, Object>>> getReservationsByManager(@RequestParam Long managerId) {
    List<Map<String, Object>> reservations = bookingRepository.findReservationsByManagerId(managerId);
    return ResponseEntity.ok(reservations);
}

}
