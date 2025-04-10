package com.example.hotelapp.repository;

import com.example.hotelapp.model.HotelAmenityJunction;
import com.example.hotelapp.model.RoomAmenityJunctionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HotelAmenityJunctionRepository 
      extends JpaRepository<HotelAmenityJunction, RoomAmenityJunctionId> {

    // Belirli bir otel için tüm junction kayıtlarını getirir
    List<HotelAmenityJunction> findByHotelId(Long hotelId);
    
    // Belirli bir otel için tüm junction kayıtlarını siler
    void deleteByHotelId(Long hotelId);
}
