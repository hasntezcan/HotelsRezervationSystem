package com.example.hotelapp.controller;

import com.example.hotelapp.model.Booking;
import com.example.hotelapp.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Create a booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    // Check room availability
    @GetMapping("/check-availability")
    public ResponseEntity<?> checkAvailability(
        @RequestParam Long roomId,
        @RequestParam String checkIn,
        @RequestParam String checkOut
    ) {
        LocalDate checkInDate = LocalDate.parse(checkIn);
        LocalDate checkOutDate = LocalDate.parse(checkOut);

        List<Booking> overlapping = bookingRepository
            .findByRoomIdAndCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(
                roomId, checkOutDate, checkInDate
            );

        boolean isAvailable = overlapping.isEmpty();
        return ResponseEntity.ok(isAvailable);
    }
}
