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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User userData) {
        if (userRepository.existsByEmail(userData.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists.");
        }

        User user = new User();
        user.setUsername(userData.getUsername());
        user.setEmail(userData.getEmail());
        // Şifreyi hash'le
        String rawPassword = userData.getPassword();
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(userData.getRole() != null ? userData.getRole() : "user");
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setPhone(userData.getPhone());

        User saved = userRepository.save(user);
        // Güvenlik için şifreyi cevapta temizle
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }

    // Login endpoint
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
    Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());
    if (optionalUser.isEmpty()) {
        return ResponseEntity.status(401).body("Invalid credentials.");
    }
    User user = optionalUser.get();
    String raw = loginRequest.getPassword();
    String stored = user.getPassword();

    boolean authenticated = false;
    // 1) Eğer zaten hash’lenmişse
    if (stored != null && stored.startsWith("$2")) {
        if (passwordEncoder.matches(raw, stored)) {
            authenticated = true;
        }
    } 
    // 2) Yok, düz metinse (legacy user)
    else if (raw.equals(stored)) {
        authenticated = true;
        // İlk başarılı girişte şifreyi hash’leyip güncelle
        user.setPassword(passwordEncoder.encode(raw));
        userRepository.save(user);
    }

    if (!authenticated) {
        return ResponseEntity.status(401).body("Invalid credentials.");
    }

    // Login başarılı → session’a koy, password alanını null’la
    request.getSession().setAttribute("user", user);
    user.setPassword(null);
    return ResponseEntity.ok(user);
}


    // Profile update endpoint
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        if (updatedUser.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is required.");
        }

        Optional<User> optionalUser = userRepository.findById(updatedUser.getUserId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = optionalUser.get();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        // Şifre güncellemesi yapılmışsa hash'le
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhone(updatedUser.getPhone());

        User saved = userRepository.save(user);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }

    // Admin profilini döndüren GET endpoint
    @GetMapping("/profile/admin")
    public ResponseEntity<?> getAdminProfile() {
        Optional<User> adminOpt = userRepository.findAll()
                .stream()
                .filter(user -> "admin".equalsIgnoreCase(user.getRole()))
                .findFirst();
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin user not found.");
        }
        User admin = adminOpt.get();
        admin.setPassword(null);
        return ResponseEntity.ok(admin);
    }

    // Manager profilini döndüren GET endpoint
    @GetMapping("/profile/manager")
    public ResponseEntity<?> getManagerProfile(@RequestParam Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty() || !"manager".equalsIgnoreCase(optionalUser.get().getRole())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Manager not found.");
        }
        User managerUser = optionalUser.get();
        Optional<Manager> managerOpt = managerRepository.findByUserId(managerUser.getUserId());
        if (managerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Manager record not found.");
        }
        Manager manager = managerOpt.get();
        Map<String, Object> response = new HashMap<>();
        managerUser.setPassword(null);
        response.put("user", managerUser);
        response.put("managerId", manager.getManagerId());
        response.put("hotelId", manager.getHotelId());
        return ResponseEntity.ok(response);
    }

    // Logout endpoint
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("User logged out successfully.");
    }
}
