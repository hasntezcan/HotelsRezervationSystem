package com.example.hotelapp.repository;

import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.HotelImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelImageRepository extends JpaRepository<HotelImage, Long> {
    
    List<HotelImage> findByHotel(Hotel hotel);
    HotelImage findByHotelAndIsPrimary(Hotel hotel, boolean isPrimary);

    List<HotelImage> findByHotel_HotelId(Long hotelId);
    HotelImage findByHotel_HotelIdAndIsPrimary(Long hotelId, boolean isPrimary);

}
