package com.example.hotelapp.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@IdClass(HotelAmenityJunctionId.class)
@Entity
@Table(name = "hotelamenityjunction")
public class HotelAmenityJunction {

    @Id
    @Column(name = "hotel_id")
    private Long hotelId;

    @Id
    @Column(name = "amenity_id")
    private Long amenityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", insertable = false, updatable = false)
    @JsonBackReference
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "amenity_id", insertable = false, updatable = false)
    private HotelAmenity amenity;

    // Getters & Setters

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public Long getAmenityId() {
        return amenityId;
    }

    public void setAmenityId(Long amenityId) {
        this.amenityId = amenityId;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public HotelAmenity getAmenity() {
        return amenity;
    }

    public void setAmenity(HotelAmenity amenity) {
        this.amenity = amenity;
    }
}
