package com.example.hotelapp.repository;

import com.example.hotelapp.dto.HotelWithImageDTO;
import com.example.hotelapp.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, String> {
    
    List<Hotel> findByCityIgnoreCaseAndStatus(String city, String status);

    @Query("SELECT DISTINCT h.city FROM Hotel h WHERE h.status = 'approved'")
    List<String> findDistinctCityByStatus();

    @Query("SELECT new com.example.hotelapp.dto.HotelWithImageDTO("
        + "h.hotelId, h.name, h.city, h.pricePerNight, h.starRating, i.imageUrl) "
        + "FROM Hotel h "
        + "LEFT JOIN h.images i ON i.isPrimary = true "
        + "WHERE LOWER(h.city) = LOWER(:city) "
        + "  AND h.status = 'approved'")
    List<HotelWithImageDTO> findHotelsWithPrimaryImageByCity(@Param("city") String city);

}
