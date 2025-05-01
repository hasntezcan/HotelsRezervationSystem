package com.example.hotelapp.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Listede ve harita marker’larında kullanılacak birleşik DTO.
 */
public record HotelCardDTO(
        Long          hotelId,
        String        name,
        String        city,
        String        country,
        String        primaryImageUrl,
        BigDecimal    minPrice,
        Double        avgRating,
        List<String>  amenities,
        Double        latitude,
        Double        longitude
) {}