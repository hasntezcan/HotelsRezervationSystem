package com.example.hotelapp.controller;

import com.example.hotelapp.dto.HotelWithImageDTO;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping
    public ResponseEntity<?> getAllHotels() {
        return ResponseEntity.ok(hotelRepository.findAll());
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
                hotel.setName(hotelDetails.getName());
                hotel.setCity(hotelDetails.getCity());
                hotel.setCountry(hotelDetails.getCountry());
                hotel.setAddress(hotelDetails.getAddress());
                hotel.setPricePerNight(hotelDetails.getPricePerNight());
                hotel.setCapacity(hotelDetails.getCapacity());
                hotel.setAmenities(hotelDetails.getAmenities());
                //hotel.setPhoto(hotelDetails.getPhoto());
                hotel.setFeatured(hotelDetails.isFeatured());
                // Diğer alanları da güncelleyebilirsiniz, örneğin:
                hotel.setCountry(hotelDetails.getCountry());
                //hotel.setPhoto(hotelDetails.getPhoto());
                hotel.setLatitude(hotelDetails.getLatitude());
                hotel.setLongitude(hotelDetails.getLongitude());
                hotel.setDescription(hotelDetails.getDescription());
                hotel.setStarRating(hotelDetails.getStarRating());
                hotel.setCheckInTime(hotelDetails.getCheckInTime());
                hotel.setCheckOutTime(hotelDetails.getCheckOutTime());
                hotel.setCancellationPolicy(hotelDetails.getCancellationPolicy());
                hotel.setStatus(hotelDetails.getStatus());
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
