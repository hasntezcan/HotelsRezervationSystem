package com.example.hotelapp.controller;

import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin // Gerekirse (origins="http://localhost:3000") vb.
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // GET /api/users?role=user  -> role=user olanları döndürür
    // GET /api/users?role=admin -> role=admin olanları vb.
    // GET /api/users           -> role parametresi olmadan hepsini döndürür.
    @GetMapping
    public List<User> getUsers(@RequestParam(required = false) String role) {
        if (role == null) {
            // Tüm kullanıcılar
            return userRepository.findAll();
        } else {
            // Bir custom finder eklemek gerekebilir -> findByRole(role)
            return userRepository.findByRole(role);
        }
    }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User with ID " + id + " is deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
