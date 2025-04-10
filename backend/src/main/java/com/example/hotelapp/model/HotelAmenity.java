package com.example.hotelapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hotelamenities")
public class HotelAmenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amenity_id")
    private Long amenityId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "icon_url")
    private String iconUrl;

    // Getters and Setters
    public Long getAmenityId() {
        return amenityId;
    }
    public void setAmenityId(Long amenityId) {
        this.amenityId = amenityId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getIconUrl() {
        return iconUrl;
    }
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
}
