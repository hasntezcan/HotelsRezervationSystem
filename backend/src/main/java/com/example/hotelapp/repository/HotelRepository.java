package com.example.hotelapp.repository;

import com.example.hotelapp.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByCity(String city);

    @Query(value = "SELECT " +
            "h.hotel_id as hotelId, " +
            "h.name as name, " +
            "h.address as address, " +
            "h.city as city, " +
            "h.country as country, " +
            "h.latitude as latitude, " +
            "h.longitude as longitude, " +
            "h.description as description, " +
            "h.star_rating as starRating, " +
            "h.check_in_time as checkInTime, " +
            "h.check_out_time as checkOutTime, " +
            "h.cancellation_policy as cancellationPolicy, " +
            "h.status as status, " +
            "h.created_at as createdAt, " +
            "h.capacity as capacity, " +
            "h.photo as photo, " +
            "h.price_per_night as pricePerNight, " +
            "GROUP_CONCAT(a.name SEPARATOR ', ') as amenities " +
            "FROM hotels h " +
            "LEFT JOIN hotelamenityjunction hj ON h.hotel_id = hj.hotel_id " +
            "LEFT JOIN hotelamenities a ON hj.amenity_id = a.amenity_id " +
            "GROUP BY h.hotel_id", nativeQuery = true)
    List<Map<String, Object>> findAllWithAmenities();
}
