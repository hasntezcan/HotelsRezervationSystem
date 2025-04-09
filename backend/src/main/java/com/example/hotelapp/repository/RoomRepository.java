package com.example.hotelapp.repository;

import com.example.hotelapp.model.Room;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);  // İleride otel bazında veya oda tipine göre filtreleme metotları eklenebilir.
}