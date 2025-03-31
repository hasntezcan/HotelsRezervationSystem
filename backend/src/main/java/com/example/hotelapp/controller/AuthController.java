package com.example.hotelapp.controller;

import com.example.hotelapp.model.LoginRequest;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User userData) {
        if (userRepository.existsByEmail(userData.getEmail())) {
            return ResponseEntity.status(409).body("Email already exists.");
        }
        
        User user = new User();
        user.setUsername(userData.getUsername());
        user.setEmail(userData.getEmail());
        // Artık şifre hash'lenmeyecek, plain text olarak saklanacak.
        user.setPassword(userData.getPassword());
        user.setRole(userData.getRole() != null ? userData.getRole() : "user");
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setPhone(userData.getPhone());

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());
        if (optionalUser.isEmpty()) {
            logger.error("Login failed: username (email) incorrect - " + loginRequest.getEmail());
            return ResponseEntity.status(401).body("Username is incorrect.");
        }
        User user = optionalUser.get();
        
        // Debug loglarını ekleyin:
        logger.debug("Gelen şifre: " + loginRequest.getPassword());
        logger.debug("DB'deki şifre: " + user.getPassword());
        
        if (!loginRequest.getPassword().equals(user.getPassword())) {
            logger.error("Login failed: password incorrect for user " + loginRequest.getEmail());
            return ResponseEntity.status(401).body("Password is incorrect.");
        }
        return ResponseEntity.ok(user);
    } catch (Exception e) {
        logger.error("An error occurred during login: ", e);
        return ResponseEntity.status(500).body(e.getMessage());
    }
}


}
