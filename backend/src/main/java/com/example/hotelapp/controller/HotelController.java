package com.example.hotelapp.controller;

import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;


import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    // this is for the admin panel to get all hotels
    @GetMapping
    public ResponseEntity<?> getAllHotels() {
        return ResponseEntity.ok(hotelRepository.findAll());
    }

    // this is for the user hotels page to get list cities
    @GetMapping("/cities")
    public ResponseEntity<?> getAllCitiesWithHotels() {
        return ResponseEntity.ok(hotelRepository.findDistinctCityByStatus());
    }
    
    // this is for the user hotels page to get hotels by city
    @GetMapping("/city")
    public ResponseEntity<?> getHotelsByCity(@RequestParam String name) {
        return ResponseEntity.ok(hotelRepository.findByCityIgnoreCaseAndStatus(name, "approved"));
    }

    @GetMapping("/image/{hotelId}")
    public ResponseEntity<byte[]> getHotelImage(@PathVariable String hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
        if (hotel != null && hotel.getImageBlob() != null) {
            return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Change if PNG, etc.
                .body(hotel.getImageBlob());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @PostMapping
    public ResponseEntity<?> addHotel(@RequestBody Hotel hotel) {
        // Eğer hotelId boşsa, UUID ile atayın.
        if (hotel.getHotelId() == null || hotel.getHotelId().isEmpty()) {
            hotel.setHotelId(UUID.randomUUID().toString());
        }
        // Front-end JSON'unda "hotelName" gönderildiğini varsayalım.
        // Modelde "name" alanı kullanılacak.
        // Bu dönüşümü burada yapıyoruz:
        if (hotel.getName() != null) {
            hotel.setName(hotel.getName());
        }
        Hotel savedHotel = hotelRepository.save(hotel);
        return ResponseEntity.ok(savedHotel);
    }

    @PostMapping("/{hotelId}/upload-image")
    public ResponseEntity<String> uploadImage(@PathVariable String hotelId, @RequestParam("image") MultipartFile imageFile) {
        try {
            Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
            if (hotel == null) {
                return ResponseEntity.notFound().build();
            }

            hotel.setImageBlob(imageFile.getBytes());
            hotelRepository.save(hotel);
            return ResponseEntity.ok("Image uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }


    @PutMapping("/{hotelId}")
    public ResponseEntity<?> updateHotel(@PathVariable String hotelId, @RequestBody Hotel hotelDetails) {
        return hotelRepository.findById(hotelId)
            .map(hotel -> {
                // Front-end'den gelen hotelName, modelde "name" alanına aktarılıyor.
                hotel.setName(hotelDetails.getName());
                hotel.setCity(hotelDetails.getCity());
                hotel.setAddress(hotelDetails.getAddress());
                hotel.setPricePerNight(hotelDetails.getPricePerNight());
                hotel.setCapacity(hotelDetails.getCapacity());
                hotel.setAmenities(hotelDetails.getAmenities());
                hotel.setPhoto(hotelDetails.getPhoto());
                hotel.setFeatured(hotelDetails.getFeatured());
                // Diğer alanları da güncelleyebilirsiniz, örneğin:
                hotel.setCountry(hotelDetails.getCountry());
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
    public ResponseEntity<?> deleteHotel(@PathVariable String hotelId) {
        if (hotelRepository.existsById(hotelId)) {
            hotelRepository.deleteById(hotelId);
            return ResponseEntity.ok("Hotel deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
