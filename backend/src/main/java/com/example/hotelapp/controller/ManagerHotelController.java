package com.example.hotelapp.controller;

import com.example.hotelapp.model.Manager;
import com.example.hotelapp.model.ManagerHotel;
import com.example.hotelapp.repository.ManagerRepository;
import com.example.hotelapp.repository.ManagerHotelRepository;
import com.example.hotelapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hotels")
public class ManagerHotelController {

    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private ManagerHotelRepository managerHotelRepository;

    @Autowired
    private HotelRepository hotelRepository;
    
    
    // Manager'a ait otelleri getirir.
    // Önce, userId ile ManagerRepository üzerinden manager kaydı bulunur.
    // Ardından, manager'ın managerId'si kullanılarak ilgili oteller sorgulanır.
    @GetMapping("/manager")
    public ResponseEntity<?> getHotelsForManager(@RequestParam Long userId) {
        Optional<Manager> managerOpt = managerRepository.findByUserId(userId);
        if (managerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Manager record not found for user id: " + userId);
        }
        
        Manager manager = managerOpt.get();
        Long managerId = manager.getManagerId();
        
        List<ManagerHotel> hotels = managerHotelRepository.findByManagerId(managerId);
        if (hotels.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hotels found for manager id: " + managerId);
        }
        
        return ResponseEntity.ok(hotels);
    }
    @GetMapping("/{hotelId}/amenities")
public ResponseEntity<?> getAmenitiesByHotelId(@PathVariable Long hotelId) {
    // HotelRepository içerisinde tanımlı olan amenity sorgusunu kullandığımızı varsayıyoruz.
    String amenities = hotelRepository.findAmenitiesByHotelId(hotelId);
    if (amenities == null || amenities.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body("No amenities found for hotel id: " + hotelId);
    }
    return ResponseEntity.ok(amenities);
}

}
