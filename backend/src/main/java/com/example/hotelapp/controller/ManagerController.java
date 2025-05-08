package com.example.hotelapp.controller;

import com.example.hotelapp.dto.ManagerDTO;
import com.example.hotelapp.model.Manager;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.ManagerRepository;
import com.example.hotelapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/managers")
@CrossOrigin(origins = "http://localhost:5173")
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping
    public List<ManagerDTO> getAllManagers() {
        return managerRepository.findAll()
            .stream()
            .map(mgr -> {
                ManagerDTO dto = new ManagerDTO();
                dto.setManagerId(mgr.getManagerId());
                dto.setHotelId(mgr.getHotelId());
                userRepository.findById(mgr.getUserId()).ifPresent(user -> {
                    dto.setManagerName(user.getFirstName() + " " + user.getLastName());
                });
                return dto;
            })
            .collect(Collectors.toList());
    }

    /**
     * Bir manager'ı siler:
     * 1) Ona atanmış tüm otellerin managerId'sini null yapar
     * 2) managers tablosundan manager kaydını siler
     * 3) users tablosundan ilişkili user kaydını siler
     */
    @DeleteMapping("/{managerId}")
    @Transactional
    public ResponseEntity<?> deleteManager(@PathVariable Long managerId) {
        var opt = managerRepository.findById(managerId);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Manager mgr = opt.get();

        // 1) Otellerden temizle
        hotelRepository.clearManagerFromHotels(mgr.getManagerId());

        // 2) Manager kaydını sil
        managerRepository.deleteById(managerId);

        // 3) İlişkili user kaydını sil
        userRepository.deleteById(mgr.getUserId());

        return ResponseEntity.ok().build();
    }
}
