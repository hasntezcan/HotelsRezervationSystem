package com.example.hotelapp.controller;

import com.example.hotelapp.model.LoginRequest;
import com.example.hotelapp.model.Manager;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.ManagerRepository;
import com.example.hotelapp.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.HashMap;

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

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // basit in-memory token store: token -> email
    private static final Map<String, String> tokenStore = new ConcurrentHashMap<>();

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User userData) {
        if (userRepository.existsByEmail(userData.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists.");
        }
        User user = new User();
        user.setUsername(userData.getUsername());
        user.setEmail(userData.getEmail());
        user.setPassword(passwordEncoder.encode(userData.getPassword()));
        user.setRole(userData.getRole() != null ? userData.getRole() : "user");
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setPhone(userData.getPhone());

        User savedUser = userRepository.save(user);
        if ("manager".equalsIgnoreCase(savedUser.getRole())) {
            Manager mgr = new Manager();
            mgr.setUserId(savedUser.getUserId());
            mgr.setHotelId(null);
            managerRepository.save(mgr);
        }
        savedUser.setPassword(null);
        return ResponseEntity.ok(savedUser);
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
        User user = optionalUser.get();
        String raw = loginRequest.getPassword();
        String stored = user.getPassword();
        boolean authenticated = false;
        if (stored != null && stored.startsWith("$2")) {
            if (passwordEncoder.matches(raw, stored)) authenticated = true;
        } else if (raw.equals(stored)) {
            authenticated = true;
            user.setPassword(passwordEncoder.encode(raw));
            userRepository.save(user);
        }
        if (!authenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
        request.getSession().setAttribute("user", user);
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    // Forgot-password: e-posta varsa token oluştur, mail gönder
    @PostMapping("/forgot-password")
public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email address.");
    }
    String token = UUID.randomUUID().toString();
    tokenStore.put(token, email);
    String resetLink = "http://localhost:5173/new-password?token=" + token;

    try {
        MimeMessage mime = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mime, true, "UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(email);
        helper.setSubject("Şifre Sıfırlama İsteği");

        String html = """
            <html>
            <head>
              <style>
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  border: 1px solid #e0e0e0;
                  border-radius: 8px;
                }
                h1 {
                  color: #333333;
                  font-size: 24px;
                  text-align: center;
                }
                p {
                  color: #555555;
                  line-height: 1.5;
                }
                .button {
                  display: inline-block;
                  margin: 20px auto;
                  padding: 12px 24px;
                  font-size: 16px;
                  color: #ffffff !important;
                  background-color: #007bff;
                  text-decoration: none;
                  border-radius: 5px;
                }
                .footer {
                  margin-top: 30px;
                  font-size: 12px;
                  color: #999999;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Şifre Sıfırlama</h1>
                <p>Merhaba,</p>
                <p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
                <p style="text-align:center;">
                  <a href="%s" class="button">Şifreni Yenile</a>
                </p>
                <p>Bu link 30 dakika içinde geçerlidir.</p>
                <div class="footer">
                  Eğer bu isteği siz yapmadıysanız, bu e-postayı göz ardı edebilirsiniz.
                </div>
              </div>
            </body>
            </html>
            """.formatted(resetLink);

        helper.setText(html, true);
        mailSender.send(mime);
    } catch (Exception e) {
        logger.error("Error sending reset email", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email.");
    }
    return ResponseEntity.ok("Reset instructions sent.");
}


    // Reset-password: token kontrol, şifre güncelle
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String newPass = body.get("password");
        String email = tokenStore.get(token);
        if (email == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPass));
        userRepository.save(user);
        tokenStore.remove(token);
        return ResponseEntity.ok("Password has been reset.");
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

    // Admin profile
    @GetMapping("/profile/admin")
    public ResponseEntity<?> getAdminProfile() {
        Optional<User> adminOpt = userRepository.findAll()
                .stream()
                .filter(u -> "admin".equalsIgnoreCase(u.getRole()))
                .findFirst();
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin user not found.");
        }
        User admin = adminOpt.get();
        admin.setPassword(null);
        return ResponseEntity.ok(admin);
    }

    // Manager profile
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

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("User logged out successfully.");
    }

    // Token geçerliliğini kontrol eden endpoint
@GetMapping("/validate-reset-token")
public ResponseEntity<String> validateResetToken(@RequestParam String token) {
    if (tokenStore.containsKey(token)) {
        return ResponseEntity.ok("Valid");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body("Invalid or expired token.");
    }
}

}