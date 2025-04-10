package com.example.hotelapp.controller;

import com.example.hotelapp.dto.HotelWithImageDTO;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
        List<Room> rooms = roomRepository.findByHotelId(hotelId);
        if(rooms.isEmpty()){
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

    
    // Endpoint: Otellerin amenity bilgilerini de getirir.
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

    @PutMapping("/{hotelId}")
public ResponseEntity<?> updateHotel(@PathVariable Long hotelId, @RequestBody Hotel hotelDetails) {
    return hotelRepository.findById(hotelId)
        .map(hotel -> {
            // Sadece güncellenmek istenen alanlar:
            hotel.setName(hotelDetails.getName());
            hotel.setCity(hotelDetails.getCity());
            hotel.setCountry(hotelDetails.getCountry());
            hotel.setAddress(hotelDetails.getAddress());
            hotel.setAmenities(hotelDetails.getAmenities());
            
            // Diğer alanlar olduğu gibi kalır.
            Hotel updatedHotel = hotelRepository.save(hotel);
            return ResponseEntity.ok(updatedHotel);
        })
        .orElse(ResponseEntity.notFound().build());
}


    @DeleteMapping("/{hotelId}")
    public ResponseEntity<?> deleteHotel(@PathVariable Long hotelId) {
        if (hotelRepository.existsById(hotelId)) {
            hotelRepository.deleteById(hotelId);
            return ResponseEntity.ok("Hotel deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
