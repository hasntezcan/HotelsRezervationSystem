package com.example.hotelapp.controller;

import com.example.hotelapp.model.Booking;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.BookingRepository;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    // ✅ Create a booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    // ✅ Check room availability
    @GetMapping("/check-availability")
    public ResponseEntity<Boolean> checkAvailability(
        @RequestParam Long roomId,
        @RequestParam String checkIn,
        @RequestParam String checkOut
    ) {
        LocalDate checkInDate = LocalDate.parse(checkIn);
        LocalDate checkOutDate = LocalDate.parse(checkOut);

        int overlappingCount = bookingRepository.countOverlappingBookings(roomId, checkInDate, checkOutDate);

        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        int totalRooms = roomOpt.get().getTotalRooms();
        boolean isAvailable = overlappingCount < totalRooms;

        return ResponseEntity.ok(isAvailable);
    }

    // ✅ Get bookings for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    // ✅ Get sum of all total prices
    @GetMapping("/total-price")
    public ResponseEntity<BigDecimal> getTotalPriceSum() {
        BigDecimal totalPrice = bookingRepository.sumTotalPrice();
        return ResponseEntity.ok(totalPrice);
    }

    // ✅ Get detailed bookings for a specific user (without DTO)
    @GetMapping("/user/{userId}/details")
    public ResponseEntity<List<Map<String, Object>>> getDetailedBookingsByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Booking booking : bookings) {
            Optional<Room> roomOpt = roomRepository.findById(booking.getRoomId());
            if (roomOpt.isEmpty()) continue;

            Room room = roomOpt.get();
            Optional<Hotel> hotelOpt = hotelRepository.findById(room.getHotelId());
            if (hotelOpt.isEmpty()) continue;

            Hotel hotel = hotelOpt.get();

            Map<String, Object> map = new HashMap<>();
            map.put("booking", booking);
            map.put("hotelName", hotel.getName());
            map.put("city", hotel.getCity());
            map.put("roomName", room.getName());
            map.put("roomType", room.getRoomType());

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }
    // Şehir bazında aylık rezervasyon sayısını döndüren metod
    @GetMapping("/monthly-reservations")
    public List<Object[]> getMonthlyReservationsByCity() {
        return bookingRepository.getMonthlyReservationsByCity();
    }

}
