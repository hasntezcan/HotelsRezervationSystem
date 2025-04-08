package com.example.hotelapp.repository;

import com.example.hotelapp.model.ManagerHotel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ManagerHotelRepository extends JpaRepository<ManagerHotel, Long> {
    List<ManagerHotel> findByManagerId(Long managerId);
}
