package com.example.hotelapp.controller;

import com.example.hotelapp.dto.HotelWithImageDTO;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.RoomRepository;
import com.example.hotelapp.service.AdminHotelService;

import jakarta.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private AdminHotelService adminHotelService;
    
    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
        List<Room> rooms = roomRepository.findByHotelId(hotelId);
        if (rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long hotelId) {
        return hotelRepository.findById(hotelId)
               .map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<?> getAllHotels() {
        return ResponseEntity.ok(hotelRepository.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchHotels(@RequestParam("query") String query) {
        List<HotelWithImageDTO> results = hotelRepository.searchHotelsByNameOrCity(query);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/cities")
    public ResponseEntity<?> getAllCitiesWithHotels() {
        return ResponseEntity.ok(hotelRepository.findDistinctCityByStatus());
    }
    
    @GetMapping("/city")
    public ResponseEntity<?> getHotelsByCity(@RequestParam String name) {
        List<HotelWithImageDTO> dtoList = hotelRepository.findHotelsWithPrimaryImageByCity(name);
        return ResponseEntity.ok(dtoList);
    }
    
    // Otellerin amenity bilgilerini de getiren endpoint
    @GetMapping("/withAmenities")
    public ResponseEntity<?> getAllHotelsWithAmenities() {
        List<Map<String, Object>> hotelsWithAmenities = hotelRepository.findAllWithAmenities();
        return ResponseEntity.ok(hotelsWithAmenities);
    }

    @PostMapping
    public ResponseEntity<?> addHotel(@RequestBody Hotel hotel) {
        // "featured" alanı kaldırıldı.
        Hotel savedHotel = hotelRepository.save(hotel);
        return ResponseEntity.ok(savedHotel);
    }

    /**
     * Update Hotel endpointi:
     * Bu metod, sadece güncellenmek istenen alanları alır (name, city, country, address ve amenities) 
     * ve AdminHotelService.updateHotel() çağrılarak hem hotel tablosu hem de amenity junctionları güncellenir.
     */
    @PutMapping("/{hotelId}")
public ResponseEntity<?> updateHotel(@PathVariable Long hotelId, @RequestBody Hotel hotelDetails) {
    try {
        Hotel updatedHotel = adminHotelService.updateHotel(hotelId, hotelDetails);
        return ResponseEntity.ok(updatedHotel);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Error updating hotel: " + e.getMessage());
    }
}



@DeleteMapping("/{hotelId}")
@Transactional
public ResponseEntity<?> deleteHotel(@PathVariable Long hotelId) {
    // 1. Otelle doğrudan ilişkili diğer tabloları silin:
    entityManager.createNativeQuery("DELETE FROM reviews WHERE hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();
    entityManager.createNativeQuery("DELETE FROM promotions WHERE hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();
    entityManager.createNativeQuery("DELETE FROM hotelimages WHERE hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();
    entityManager.createNativeQuery("DELETE FROM hotelamenityjunction WHERE hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();

    // 2. Otelin odalarına ilişkin verileri silin:
    // 2.a. Önce, odalara ait roomamenityjunction kayıtları:
    entityManager.createNativeQuery(
        "DELETE rm FROM roomamenityjunction rm JOIN rooms r ON rm.room_id = r.room_id WHERE r.hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();
    // 2.b. Odaya ait görseller:
    entityManager.createNativeQuery(
        "DELETE ri FROM roomimages ri JOIN rooms r ON ri.room_id = r.room_id WHERE r.hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();
    // 2.c. Rezervasyonlar (bookings):
    entityManager.createNativeQuery(
        "DELETE FROM bookings WHERE room_id IN (SELECT room_id FROM rooms WHERE hotel_id = :hotelId)")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();
    // 2.d. Son olarak, rooms tablosundan otel odalarını silin:
    entityManager.createNativeQuery("DELETE FROM rooms WHERE hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();

    // 3. Oteli silin:
    entityManager.createNativeQuery("DELETE FROM hotels WHERE hotel_id = :hotelId")
                 .setParameter("hotelId", hotelId)
                 .executeUpdate();

    return ResponseEntity.ok("Hotel deleted successfully.");
}

}
