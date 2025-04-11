package com.example.hotelapp.repository;

import com.example.hotelapp.model.Room;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    
    @Query(value = "SELECT MIN(price_per_night) FROM rooms WHERE hotel_id = :hotelId", nativeQuery = true)
    BigDecimal findMinPriceByHotelId(@Param("hotelId") Long hotelId);
    
    

    List<Room> findByHotelId(Long hotelId);  // İleride otel bazında veya oda tipine göre filtreleme metotları eklenebilir.
}