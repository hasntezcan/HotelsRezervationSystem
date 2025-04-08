package com.example.hotelapp.controller;

import com.example.hotelapp.model.Room;
import com.example.hotelapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Tüm odaları getir
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms(){
        List<Room> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    // Belirli bir odayı ID ile getir
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id){
        return roomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Yeni oda oluştur
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room){
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }

    // Odayı güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room room){
        Room updatedRoom = roomService.updateRoom(id, room);
        if(updatedRoom == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRoom);
    }

    // Odayı sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);
        return ResponseEntity.ok(Map.of("message", "Room deleted successfully"));
    }

    // Müsaitlik Kontrolü Endpoint (Örnek, Bookings entegrasyonu yapılınca genişletilebilir)
    @GetMapping("/check-availability")
    public ResponseEntity<?> checkAvailability(
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        // Örneğin: Bookings tablosuyla karşılaştırma yaparak müsaitlik hesaplanabilir.
        // Şimdilik, oda varsa müsait olduğunu döndürüyoruz.
        if(roomService.getRoomById(roomId).isPresent()){
            return ResponseEntity.ok(Map.of("available", true));
        }
        return ResponseEntity.notFound().build();
    }
}