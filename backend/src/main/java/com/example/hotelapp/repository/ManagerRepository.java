package com.example.hotelapp.repository;

import com.example.hotelapp.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    // Kullanıcı id'sine göre manager kaydını bulmak için
    Optional<Manager> findByUserId(Long userId);
}
