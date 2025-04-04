package com.example.hotelapp.repository;

import com.example.hotelapp.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, String> {

    List<ContactMessage> findByIsReadFalse(); // okunmamışlar
    List<ContactMessage> findByIsReadTrue();  // okunmuşlar
}