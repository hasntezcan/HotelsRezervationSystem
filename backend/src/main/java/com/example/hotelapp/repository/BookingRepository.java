package com.example.hotelapp.repository;

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


// Yıllık ve şehir bazında rezervasyon sayısını getiren sorgu
@Query("SELECT new map(DATE_FORMAT(b.checkInDate, '%Y-%m') as month, h.city as city, COUNT(b.bookingId) as totalReservations) " +
           "FROM Booking b " +
           "JOIN Room r ON b.roomId = r.id " +  // 'roomId' yerine 'r.id' ile ilişkilendirme
           "JOIN Hotel h ON r.hotelId = h.id " +  // Hotel ile ilişki 'hotelId' üzerinden sağlanacak
           "GROUP BY month, h.city " +
           "ORDER BY month DESC, h.city")
    List<Object[]> getMonthlyReservationsByCity();

}
