package com.example.hotelapp.repository;

import com.example.hotelapp.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, String> {
    
    List<Hotel> findByCityIgnoreCaseAndStatus(String city, String status);

    @Query("SELECT DISTINCT h.city FROM Hotel h WHERE h.status = 'approved'")
    List<String> findDistinctCityByStatus();
}
