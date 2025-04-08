package com.example.hotelapp.repository;

import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.HotelImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelImageRepository extends JpaRepository<HotelImage, String> {
    
    List<HotelImage> findByHotel(Hotel hotel);
    HotelImage findByHotelAndIsPrimary(Hotel hotel, boolean isPrimary);

}
