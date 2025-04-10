package com.example.hotelapp.repository;

import com.example.hotelapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRoomIdAndCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(
        Long roomId, LocalDate end, LocalDate start
    );

    @Query("SELECT COUNT(b) FROM Booking b " +
        "WHERE b.roomId = :roomId " +
        "AND b.checkInDate < :checkOutDate " +
        "AND b.checkOutDate > :checkInDate")
    int countOverlappingBookings(
        @Param("roomId") Long roomId,
        @Param("checkInDate") LocalDate checkInDate,
        @Param("checkOutDate") LocalDate checkOutDate
    );

    List<Booking> findByUserId(Long userId);

}
