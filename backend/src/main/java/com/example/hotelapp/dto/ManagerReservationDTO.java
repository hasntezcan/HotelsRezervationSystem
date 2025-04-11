package com.example.hotelapp.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ManagerReservationDTO {
    
    private Long bookingId;
    private Long roomId;
    private String roomName;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String hotelName;
    private int numGuests;
    private BigDecimal totalPrice;
    private String status;

    // Default constructor
    public ManagerReservationDTO() {
    }

    // Parametrized constructor
    public ManagerReservationDTO(Long bookingId, Long roomId, String roomName, LocalDate checkInDate, LocalDate checkOutDate, String hotelName, int numGuests, BigDecimal totalPrice, String status) {
        this.bookingId = bookingId;
        this.roomId = roomId;
        this.roomName = roomName;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.hotelName = hotelName;
        this.numGuests = numGuests;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    // Getters and Setters
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public int getNumGuests() {
        return numGuests;
    }

    public void setNumGuests(int numGuests) {
        this.numGuests = numGuests;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
