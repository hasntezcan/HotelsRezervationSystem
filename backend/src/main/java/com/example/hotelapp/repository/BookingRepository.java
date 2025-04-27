package com.example.hotelapp.repository;

import com.example.hotelapp.dto.ManagerReservationDTO;
import com.example.hotelapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

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

    @Query("SELECT SUM(b.totalPrice) FROM Booking b")
    BigDecimal sumTotalPrice();

    @Query("SELECT b FROM Booking b " +
        "JOIN FETCH b.room r " +
        "LEFT JOIN FETCH r.images " +
        "WHERE b.userId = :userId")
    List<Booking> findAllByUserIdWithRoomImages(@Param("userId") Long userId);

    // JPQL sorgusu kullanılarak ManagerReservationDTO döndüren sorgu.
    @Query("SELECT new com.example.hotelapp.dto.ManagerReservationDTO(" +
           "b.bookingId, " +
           "b.roomId, " +
           "r.name, " +
           "b.checkInDate, " +
           "b.checkOutDate, " +
           "h.name, " +
           "b.numGuests, " +
           "b.totalPrice, " +
           "b.status" +
           ") " +
           "FROM Booking b " +
           "JOIN b.room r " +
           "JOIN Hotel h ON r.hotelId = h.hotelId " +
           "JOIN Manager m ON m.hotelId = r.hotelId " +
           "WHERE m.managerId = :managerId")
    List<ManagerReservationDTO> findReservationsByManagerId(@Param("managerId") Long managerId);

    // Diğer metodlar...
    @Query("SELECT new map(DATE_FORMAT(b.checkInDate, '%Y-%m') as month, h.city as city, COUNT(b.bookingId) as totalReservations) " +
           "FROM Booking b " +
           "JOIN Room r ON b.roomId = r.id " +
           "JOIN Hotel h ON r.hotelId = h.id " +
           "GROUP BY month, h.city " +
           "ORDER BY month DESC, h.city")
    List<Object[]> getMonthlyReservationsByCity();
    void deleteByRoomId(Long roomId);
}
