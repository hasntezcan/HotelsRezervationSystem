package com.example.hotelapp.controller;

import com.example.hotelapp.model.LoginRequest;
import com.example.hotelapp.model.Manager;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.ManagerRepository;
import com.example.hotelapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ManagerRepository managerRepository;

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User userData) {
        if (userRepository.existsByEmail(userData.getEmail())) {
            return ResponseEntity.status(409).body("Email already exists.");
        }
        
        User user = new User();
        user.setUsername(userData.getUsername());
        user.setEmail(userData.getEmail());
        // Plain text password (test amaçlı)
        user.setPassword(userData.getPassword());
        user.setRole(userData.getRole() != null ? userData.getRole() : "user");
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setPhone(userData.getPhone());

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login endpoint: Plain text şifre karşılaştırması
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(401).body("Username is incorrect.");
            }
            User user = optionalUser.get();
            
            String incomingPassword = loginRequest.getPassword();
            String dbPassword = user.getPassword();
            
            if (!incomingPassword.equals(dbPassword)) {
                return ResponseEntity.status(401).body("Password is incorrect.");
            }
            // Kullanıcı başarılı giriş yaptıysa, HTTP session'ına kullanıcıyı ekleyelim.
            request.getSession().setAttribute("user", user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    // Profile update endpoint
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        if (updatedUser.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is required.");
        }
        
        Optional<User> optionalUser = userRepository.findById(updatedUser.getUserId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }
        
        User user = optionalUser.get();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhone(updatedUser.getPhone());
        
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
    
    // Admin profilini döndüren GET endpoint
    @GetMapping("/profile/admin")
    public ResponseEntity<?> getAdminProfile() {
        Optional<User> adminOpt = userRepository.findAll()
                .stream()
                .filter(user -> "admin".equalsIgnoreCase(user.getRole()))
                .findFirst();
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Admin user not found.");
        }
        return ResponseEntity.ok(adminOpt.get());
    }
    
    // Manager profilini döndüren GET endpoint
    @GetMapping("/profile/manager")
    public ResponseEntity<?> getManagerProfile(@RequestParam Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty() || !"manager".equalsIgnoreCase(optionalUser.get().getRole())) {
            return ResponseEntity.status(404).body("Manager not found.");
        }
        User managerUser = optionalUser.get();
        Optional<Manager> managerOpt = managerRepository.findByUserId(managerUser.getUserId());
        if (managerOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Manager record not found.");
        }
        Manager manager = managerOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("user", managerUser);
        response.put("managerId", manager.getManagerId());
        response.put("hotelId", manager.getHotelId());
        return ResponseEntity.ok(response);
    }
    
    // Logout endpoint: Oturumu geçersiz kılarak çıkış yapar.
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("User logged out successfully.");
    }
}
