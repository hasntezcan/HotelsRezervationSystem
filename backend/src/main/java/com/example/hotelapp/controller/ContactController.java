package com.example.hotelapp.controller;

import com.example.hotelapp.model.ContactMessage;
import com.example.hotelapp.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // Mevcut POST -> yeni mesaj kaydetme
    @PostMapping
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage contactMessage) {
        if (contactMessage.getMessageId() == null || contactMessage.getMessageId().isEmpty()) {
            contactMessage.setMessageId(UUID.randomUUID().toString());
        }
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
    public ResponseEntity<?> markAsRead(@PathVariable String messageId) {
        return contactMessageRepository.findById(messageId)
                .map(msg -> {
                    msg.setIsRead(true);
                    contactMessageRepository.save(msg);
                    return ResponseEntity.ok("Message marked as read.");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Mesajı "unread" olarak işaretle
    @PutMapping("/markAsUnread/{messageId}")
    public ResponseEntity<?> markAsUnread(@PathVariable String messageId) {
        return contactMessageRepository.findById(messageId)
                .map(msg -> {
                    msg.setIsRead(false);
                    contactMessageRepository.save(msg);
                    return ResponseEntity.ok("Message marked as unread.");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Mesajı sil
    @DeleteMapping("/{messageId}")
    public ResponseEntity<?> deleteMessage(@PathVariable String messageId) {
        if (contactMessageRepository.existsById(messageId)) {
            contactMessageRepository.deleteById(messageId);
            return ResponseEntity.ok("Message deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
