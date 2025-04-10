package com.example.hotelapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HotelAmenityJunctionId implements Serializable {

    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "amenity_id")
    private Long amenityId;

    // Boş constructor (zorunlu)
    public HotelAmenityJunctionId() {
    }

    public HotelAmenityJunctionId(Long hotelId, Long amenityId) {
        this.hotelId = hotelId;
        this.amenityId = amenityId;
    }

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

    // equals() ve hashCode() metotları (zorunlu)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof HotelAmenityJunctionId)) return false;
        HotelAmenityJunctionId that = (HotelAmenityJunctionId) o;
        return Objects.equals(getHotelId(), that.getHotelId()) &&
               Objects.equals(getAmenityId(), that.getAmenityId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getHotelId(), getAmenityId());
    }
}
