package com.example.hotelapp.repository;

import com.example.hotelapp.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByIsReadFalse();
    List<ContactMessage> findByIsReadTrue();
}
