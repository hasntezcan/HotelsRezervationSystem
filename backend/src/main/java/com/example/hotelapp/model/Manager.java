package com.example.hotelapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "managers")
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_id")
    private Long managerId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    // Otel ID'si artık Long tipinde; tablo yapınız ile uyumlu hale getirmek için güncellediğinizden emin olun.
    @Column(name = "hotel_id", nullable = false)
    private Long hotelId;
    
    @Column(name = "assigned_at", nullable = false, updatable = false)
    private LocalDateTime assignedAt;

    // Varsayılan constructor (JPA için gereklidir)
    public Manager() {
        this.assignedAt = LocalDateTime.now();
    }
    
    // Getter ve Setter’lar

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }
}
