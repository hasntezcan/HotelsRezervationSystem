package com.example.hotelapp.controller;

import com.example.hotelapp.model.ContactMessage;
import com.example.hotelapp.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // Yeni mesaj kaydet
    @PostMapping
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage contactMessage) {
        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);
        return ResponseEntity.ok(savedMessage);
    }

    // Okunmamış mesajları getir
    @GetMapping("/unread")
    public ResponseEntity<?> getUnreadMessages() {
        return ResponseEntity.ok(contactMessageRepository.findByIsReadFalse());
    }

    // Okunmuş mesajları getir
    @GetMapping("/read")
    public ResponseEntity<?> getReadMessages() {
        return ResponseEntity.ok(contactMessageRepository.findByIsReadTrue());
    }

    // Mesajı "read" olarak işaretle
    @PutMapping("/markAsRead/{messageId}")
    public ResponseEntity<?> markAsRead(@PathVariable Long messageId) {
        return contactMessageRepository.findById(messageId)
                .map(msg -> {
                    msg.setIsRead(true);
                    contactMessageRepository.save(msg);
                    return ResponseEntity.ok(msg);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Mesajı "unread" olarak işaretle
    @PutMapping("/markAsUnread/{messageId}")
    public ResponseEntity<?> markAsUnread(@PathVariable Long messageId) {
        return contactMessageRepository.findById(messageId)
                .map(msg -> {
                    msg.setIsRead(false);
                    contactMessageRepository.save(msg);
                    return ResponseEntity.ok(msg);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Mesajı sil
    @DeleteMapping("/{messageId}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long messageId) {
        if (contactMessageRepository.existsById(messageId)) {
            contactMessageRepository.deleteById(messageId);
            return ResponseEntity.ok("Message deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
