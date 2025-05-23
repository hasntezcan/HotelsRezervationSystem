package com.example.hotelapp.controller;

import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.RoomRepository;
import com.example.hotelapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private RoomService roomService;

    // Tüm odaları getir
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
        List<Room> rooms = roomService.getRoomsByHotelId(hotelId);
        if (rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(rooms);
    }

    // Belirli bir odayı ID ile getir
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Yeni oda oluştur
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }

    // Odayı güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room room) {
        Optional<Room> existing = roomService.getRoomById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        }
        Room updatedRoom = roomService.updateRoom(id, room);
        return ResponseEntity.ok(updatedRoom);
    }

        // Odayı sil (ilgili tüm detaylarıyla birlikte)
        @DeleteMapping("/{id}")
        public ResponseEntity<Map<String, String>> deleteRoom(@PathVariable Long id) {
            // önce gerçekten var mı diye bak
            if (roomService.getRoomById(id).isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Room not found"));
            }
            // burada eski deleteRoom(id) yerine tüm ilişkili kayıtları da silecek deleteRoomWithDetails'i çağırıyoruz
            roomService.deleteRoomWithDetails(id);
            return ResponseEntity.ok(Map.of("message", "Room and its related data deleted successfully"));
        }
    

    // Müsaitlik Kontrolü Endpoint
    @GetMapping("/check-availability")
    public ResponseEntity<?> checkAvailability(
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        if (roomService.getRoomById(roomId).isPresent()) {
            return ResponseEntity.ok(Map.of("available", true));
        }
        return ResponseEntity.notFound().build();
    }

    // Toplam oda sayısını getir
    @GetMapping("/total-rooms")
    public ResponseEntity<Long> getTotalRooms() {
        long totalRooms = roomService.getTotalRooms();
        return ResponseEntity.ok(totalRooms);
    }



    @GetMapping("/hotel/{hotelId}/min-price")
    public ResponseEntity<?> getMinRoomPriceByHotelId(@PathVariable Long hotelId) {
        BigDecimal minPrice = roomRepository.findMinPriceByHotelId(hotelId);
        if (minPrice != null) {
            return ResponseEntity.ok(Map.of("minPrice", minPrice));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "No rooms found for this hotel."));
        }
    }
    


    // ✅ Oda kapasite kontrolü (adult + children)
    @GetMapping("/{roomId}/check-capacity")
    public ResponseEntity<Map<String, Object>> checkRoomCapacity(
            @PathVariable Long roomId,
            @RequestParam int totalGuests) {

        Optional<Room> roomOpt = roomService.getRoomById(roomId);
        if (roomOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Room not found"));
        }

        Room room = roomOpt.get();
        boolean withinCapacity = totalGuests <= room.getCapacity();

        return ResponseEntity.ok(Map.of(
                "available", withinCapacity,
                "capacity", room.getCapacity()
        ));
    }
    
}
