package com.example.hotelapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hotelimages")
public class HotelImage {

    @Id
    @Column(name = "image_id")
    private String imageId;

    @Column(name = "hotel_id")
    private String hotelId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_primary")
    private boolean isPrimary;

    // Getters & Setters

    public String getImageId() { return imageId; }
    public void setImageId(String imageId) { this.imageId = imageId; }

    public String getHotelId() { return hotelId; }
    public void setHotelId(String hotelId) { this.hotelId = hotelId; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isPrimary() { return isPrimary; }
    public void setPrimary(boolean primary) { isPrimary = primary; }
}
