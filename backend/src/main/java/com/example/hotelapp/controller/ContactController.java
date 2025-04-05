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

    @PostMapping
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage contactMessage) {
        // Generate a random message ID if not provided.
        if (contactMessage.getMessageId() == null || contactMessage.getMessageId().isEmpty()) {
            contactMessage.setMessageId(UUID.randomUUID().toString());
        }
        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);
        return ResponseEntity.ok(savedMessage);
    }
}
