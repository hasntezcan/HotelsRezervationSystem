package com.example.hotelapp.controller;

import com.example.hotelapp.model.Booking;
import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.BookingRepository;
import com.example.hotelapp.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    // Create a booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    // Check room availability
    @GetMapping("/check-availability")
    public ResponseEntity<Boolean> checkAvailability(
        @RequestParam Long roomId,
        @RequestParam String checkIn,
        @RequestParam String checkOut
    ) {
        LocalDate checkInDate = LocalDate.parse(checkIn);
        LocalDate checkOutDate = LocalDate.parse(checkOut);

        // Count how many overlapping bookings exist
        int overlappingCount = bookingRepository.countOverlappingBookings(roomId, checkInDate, checkOutDate);

        // Get total rooms from the room type definition
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        int totalRooms = roomOpt.get().getTotalRooms();

        // ✅ Availability logic: only reject if ALL rooms are booked for that range
        boolean isAvailable = overlappingCount < totalRooms;

        return ResponseEntity.ok(isAvailable);
    }

}
