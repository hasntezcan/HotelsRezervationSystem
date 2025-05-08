package com.example.hotelapp.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.hotelapp.dto.HotelWithImageDTO;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.repository.projection.HotelCardView;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    // Existing native query - for admin panel / full hotel info
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

    // ✅ For frontend city filtering
    List<Hotel> findByCityIgnoreCaseAndStatus(String city, String status);

    // ✅ To return distinct approved cities
    @Query("SELECT DISTINCT h.city FROM Hotel h WHERE h.status = 'approved'")
    List<String> findDistinctCityByStatus();

    @Query("SELECT new com.example.hotelapp.dto.HotelWithImageDTO(" +
            "h.hotelId, h.name, h.city, h.pricePerNight, h.starRating, i.imageUrl, h.latitude, h.longitude) " +
            "FROM Hotel h " +
            "LEFT JOIN h.images i ON i.isPrimary = true " +
            "WHERE (LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(h.city) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND h.status = 'approved'")
    List<HotelWithImageDTO> searchHotelsByNameOrCity(@Param("query") String query);


    @Query("SELECT new com.example.hotelapp.dto.HotelWithImageDTO(" +
        "h.hotelId, h.name, h.city, h.pricePerNight, h.starRating, i.imageUrl, h.latitude, h.longitude) " +
        "FROM Hotel h " +
        "LEFT JOIN h.images i ON i.isPrimary = true " +
        "WHERE LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%')) " +
        "AND h.status = 'approved'")
    List<HotelWithImageDTO> findHotelsWithPrimaryImageByCity(@Param("city") String city);

    @Query(value = "SELECT GROUP_CONCAT(a.name SEPARATOR ', ') " +
       "FROM hotelamenityjunction hj " +
       "JOIN hotelamenities a ON hj.amenity_id = a.amenity_id " +
       "WHERE hj.hotel_id = :hotelId", nativeQuery = true)
    String findAmenitiesByHotelId(@Param("hotelId") Long hotelId);

    @Query(value = """
        SELECT 
          h.hotel_id                   AS hotelId,
          h.name                       AS name,
          h.city                       AS city,
          h.country                    AS country,
          -- ana foto
          (SELECT image_url FROM hotelimages i
           WHERE i.hotel_id = h.hotel_id AND i.is_primary = TRUE LIMIT 1)
                                        AS primaryImageUrl,
          -- en düşük oda fiyatı
          (SELECT MIN(r.price_per_night) FROM rooms r 
           WHERE r.hotel_id = h.hotel_id)
                                        AS minPrice,
          -- ortalama review
          (SELECT ROUND(AVG(rv.rating),1) FROM reviews rv 
           WHERE rv.hotel_id = h.hotel_id)
                                        AS avgRating,
          -- amenity CSV
          GROUP_CONCAT(DISTINCT a.name) AS amenities,
          h.latitude                    AS latitude,
          h.longitude                   AS longitude
        FROM hotels h
        LEFT JOIN hotelamenityjunction hj ON hj.hotel_id = h.hotel_id
        LEFT JOIN hotelamenities       a  ON a.amenity_id = hj.amenity_id
        WHERE h.status = 'approved'
          AND (:city IS       NULL OR LOWER(h.city) = LOWER(:city))
          AND (:priceMin IS   NULL OR
               (SELECT MIN(r2.price_per_night) FROM rooms r2 
                WHERE r2.hotel_id = h.hotel_id) >= :priceMin)
          AND (:priceMax IS   NULL OR
               (SELECT MIN(r3.price_per_night) FROM rooms r3 
                WHERE r3.hotel_id = h.hotel_id) <= :priceMax)
          AND (:minRating IS  NULL OR
               (SELECT AVG(rv2.rating) FROM reviews rv2 
                WHERE rv2.hotel_id = h.hotel_id) >= :minRating)
          AND ( :amenityCount = 0 OR EXISTS (
                  SELECT 1 FROM hotelamenityjunction x
                  WHERE x.hotel_id = h.hotel_id
                    AND x.amenity_id IN (:amenityIds) ) )
        GROUP BY h.hotel_id
        """,
        nativeQuery = true)
    List<HotelCardView> filterCards(
            @Param("city")         String      city,
            @Param("priceMin")     Double      priceMin,
            @Param("priceMax")     Double      priceMax,
            @Param("minRating")    Double      minRating,
            @Param("amenityIds")   List<Long>  amenityIds,
            @Param("amenityCount") int         amenityCount
    );
    

}
