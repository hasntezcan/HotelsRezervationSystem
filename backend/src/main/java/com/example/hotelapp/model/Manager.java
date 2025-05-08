package com.example.hotelapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "managers")
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_id")
    private Long managerId;  // Manager ID (Otomatik artan)

    @Column(name = "user_id", nullable = false)
    private Long userId;  // User ID

    @Column(name = "hotel_id", nullable = true)
    private Long hotelId;  // Manager'ın bağlı olduğu otelin ID'si, veritabanındaki char(36) için String

    @Column(name = "assigned_at")
    private LocalDateTime assignedAt;  // Atama zamanı

    public Manager() {
        // Atama zamanı olarak şimdiki zamanı kullan
        this.assignedAt = LocalDateTime.now();
    }

    // GETTER ve SETTER metotları

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
