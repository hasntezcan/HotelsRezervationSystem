package com.example.hotelapp.controller;

import com.example.hotelapp.dto.ManagerReservationDTO;
import com.example.hotelapp.model.Booking;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.BookingRepository;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

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

    /**
     * This endpoint returns the same "map-based" JSON shape you had before,
     * but now also attaches the Room (with images loaded eagerly)
     * to the Booking object for front-end use (b.booking.room.images).
     */
    @GetMapping("/user/{userId}/details")
    public ResponseEntity<List<Map<String, Object>>> getDetailedBookingsByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Booking booking : bookings) {
            Room room = roomRepository.findById(booking.getRoomId()).orElse(null);
            if (room == null) continue;

            Hotel hotel = hotelRepository.findById(room.getHotelId()).orElse(null);
            if (hotel == null) continue;

            Map<String, Object> map = new HashMap<>();
            map.put("booking", booking);
            map.put("hotelName", hotel.getName());
            map.put("city", hotel.getCity());
            map.put("roomName", room.getName());
            map.put("roomType", room.getRoomType());
            map.put("hotelImages", hotel.getImages());

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    // Endpoint to get reservations for a manager using ManagerReservationDTO.
    @GetMapping("/manager-reservations")
    public ResponseEntity<List<ManagerReservationDTO>> getReservationsByManager(@RequestParam Long managerId) {
        List<ManagerReservationDTO> reservations = bookingRepository.findReservationsByManagerId(managerId);
        return ResponseEntity.ok(reservations);
    }

    // Şehir bazında aylık rezervasyon sayısını döndüren metod
    @GetMapping("/monthly-reservations")
    public List<Object[]> getMonthlyReservationsByCity() {
        return bookingRepository.getMonthlyReservationsByCity();
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        System.out.println("Trying to cancel booking with ID: " + bookingId);

        if (bookingRepository.existsById(bookingId)) {
            bookingRepository.deleteById(bookingId);
            return ResponseEntity.ok(Map.of("message", "Booking canceled successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
    }


    @PutMapping("/{bookingId}/status")
public ResponseEntity<Booking> updateBookingStatus(
        @PathVariable Long bookingId, 
        @RequestParam String status) {
    Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
    if (optionalBooking.isPresent()) {
        Booking booking = optionalBooking.get();
        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);
        return ResponseEntity.ok(updated);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

}
