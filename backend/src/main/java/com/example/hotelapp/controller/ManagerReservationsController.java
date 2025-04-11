package com.example.hotelapp.controller;

import com.example.hotelapp.dto.ManagerReservationDTO;
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

    @GetMapping("/manager")
public ResponseEntity<List<ManagerReservationDTO>> getReservationsByManager(@RequestParam Long managerId) {
    List<ManagerReservationDTO> reservations = bookingRepository.findReservationsByManagerId(managerId);
    return ResponseEntity.ok(reservations);
}


}
