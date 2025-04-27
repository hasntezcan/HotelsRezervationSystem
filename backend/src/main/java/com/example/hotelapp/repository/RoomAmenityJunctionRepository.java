package com.example.hotelapp.repository;

import com.example.hotelapp.model.RoomAmenityJunction;
import com.example.hotelapp.model.RoomAmenityJunctionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomAmenityJunctionRepository
    extends JpaRepository<RoomAmenityJunction, RoomAmenityJunctionId> {

    /**
     * Belirli bir oda için tüm junction kayıtlarını siler.
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM RoomAmenityJunction r WHERE r.roomId = :roomId")
    void deleteByRoomId(@Param("roomId") Long roomId);
}
