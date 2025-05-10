package com.example.hotelapp.controller;

import com.example.hotelapp.dto.HotelCardDTO;
import com.example.hotelapp.dto.HotelWithImageDTO;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.Review;
import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.ManagerRepository;
import com.example.hotelapp.repository.ReviewRepository;
import com.example.hotelapp.repository.RoomRepository;
import com.example.hotelapp.service.AdminHotelService;
import com.example.hotelapp.service.HotelAmenityJunctionService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private ManagerRepository managerRepository;              // ← eklendi
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private AdminHotelService adminHotelService;
    @Autowired
    private HotelAmenityJunctionService amenityService;
    @Autowired
    private ReviewRepository reviewRepository;
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
        return hotelRepository.findById(hotelId).map(hotel -> {
            var reviews = reviewRepository.findByHotelId(hotelId);
            double avg = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            hotel.setStarRating((int) Math.round(avg));
            return ResponseEntity.ok(hotel);
        }).orElse(ResponseEntity.notFound().build());
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

    @GetMapping("/withAmenities")
    public ResponseEntity<?> getAllHotelsWithAmenities() {
        List<Map<String, Object>> hotelsWithAmenities = hotelRepository.findAllWithAmenities();
        return ResponseEntity.ok(hotelsWithAmenities);
    }

    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel) {
        // 1) Otel kaydını oluştur
        Hotel saved = hotelRepository.save(hotel);
        // 2) Amenity–junction kayıtlarını güncelle
        amenityService.updateHotelAmenities(saved.getHotelId(), hotel.getAmenities());
        // 3) Managers tablosundaki ilgili manager kaydını güncelle
        if (saved.getManagerId() != null) {
            managerRepository.findById(saved.getManagerId()).ifPresent(mgr -> {
                mgr.setHotelId(saved.getHotelId());
                managerRepository.save(mgr);
            });
        }
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<HotelCardDTO>> filterHotels(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double priceMin,
            @RequestParam(required = false) Double priceMax,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) List<Long> amenityIds) {

        int count = amenityIds == null ? 0 : amenityIds.size();

        List<HotelCardDTO> list = hotelRepository
                .filterCards(city, priceMin, priceMax, minRating, amenityIds, count)
                .stream()
                .map(v -> new HotelCardDTO(
                        v.getHotelId(),
                        v.getName(),
                        v.getCity(),
                        v.getCountry(),
                        v.getPrimaryImageUrl(),
                        v.getMinPrice(),
                        v.getAvgRating(),
                        v.getAmenities() == null ? List.of()
                                : List.of(v.getAmenities().split("\\s*,\\s*")),
                        v.getLatitude(),
                        v.getLongitude()))
                .toList();

        return ResponseEntity.ok(list);
    }

    @PutMapping("/{hotelId}")
    public ResponseEntity<?> updateHotel(@PathVariable Long hotelId,
                                         @RequestBody Hotel hotelDetails) {
        try {
            // 1) Hotel güncelleme
            Hotel updatedHotel = adminHotelService.updateHotel(hotelId, hotelDetails);
            // 2) Amenity–junction kayıtlarını güncelle
            amenityService.updateHotelAmenities(hotelId, hotelDetails.getAmenities());
            // 3) Manager kaydının hotel_id alanını güncelle
            if (hotelDetails.getManagerId() != null) {
                managerRepository.findById(hotelDetails.getManagerId())
                        .ifPresent(mgr -> {
                            mgr.setHotelId(hotelId);
                            managerRepository.save(mgr);
                        });
            }
            return ResponseEntity.ok(updatedHotel);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating hotel: " + e.getMessage());
        }
    }
    
     @DeleteMapping("/{hotelId}")
    @Transactional
    public ResponseEntity<?> deleteHotel(@PathVariable Long hotelId) {

        /* 0. Manager tablosunda bu otele işaret eden hotel_id’yi temizle */
        entityManager.createNativeQuery(
                "UPDATE managers SET hotel_id = NULL WHERE hotel_id = :hotelId")
                .setParameter("hotelId", hotelId)
                .executeUpdate();

        /* 1. Otelle doğrudan ilişkili diğer tabloları silin */
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

        /* 2. Otelin odalarına ilişkin verileri silin */
        entityManager.createNativeQuery(
                "DELETE rm FROM roomamenityjunction rm JOIN rooms r ON rm.room_id = r.room_id WHERE r.hotel_id = :hotelId")
                .setParameter("hotelId", hotelId)
                .executeUpdate();
        entityManager.createNativeQuery(
                "DELETE ri FROM roomimages ri JOIN rooms r ON ri.room_id = r.room_id WHERE r.hotel_id = :hotelId")
                .setParameter("hotelId", hotelId)
                .executeUpdate();
        entityManager.createNativeQuery(
                "DELETE FROM bookings WHERE room_id IN (SELECT room_id FROM rooms WHERE hotel_id = :hotelId)")
                .setParameter("hotelId", hotelId)
                .executeUpdate();
        entityManager.createNativeQuery("DELETE FROM rooms WHERE hotel_id = :hotelId")
                .setParameter("hotelId", hotelId)
                .executeUpdate();

        /* 3. Oteli silin */
        entityManager.createNativeQuery("DELETE FROM hotels WHERE hotel_id = :hotelId")
                .setParameter("hotelId", hotelId)
                .executeUpdate();

        return ResponseEntity.ok("Hotel deleted successfully.");
    }

        @GetMapping("/{hotelId}/amenity-list")
    public ResponseEntity<List<String>> getHotelAmenityList(@PathVariable Long hotelId) {
        return hotelRepository.findById(hotelId)
            .map(hotel -> {
                String csv = hotel.getAmenities(); // virgülle ayrılmış string
                List<String> list = csv == null || csv.isBlank()
                    ? List.of()
                    : Arrays.stream(csv.split(","))
                            .map(String::trim)
                            .toList();
                return ResponseEntity.ok(list);
            })
            .orElse(ResponseEntity.notFound().build());
    }

}
