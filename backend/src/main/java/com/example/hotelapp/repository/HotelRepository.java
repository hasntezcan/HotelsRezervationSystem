package com.example.hotelapp.repository;

import com.example.hotelapp.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, String> {
    // Ek sorgu metotlarını buraya ekleyebilirsiniz, örneğin:
    List<Hotel> findByCity(String city);
}
