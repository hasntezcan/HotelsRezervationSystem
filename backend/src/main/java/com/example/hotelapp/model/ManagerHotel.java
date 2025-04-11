package com.example.hotelapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hotels")
public class ManagerHotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(nullable = false)
    private String name;

    private String address;
    private String city;
    private String country;
    private Double latitude;
    private Double longitude;
    private String description;

    @Column(name = "star_rating")
    private Integer starRating;

    @Column(name = "check_in_time")
    private String checkInTime;

    @Column(name = "check_out_time")
    private String checkOutTime;

    @Column(name = "cancellation_policy")
    private String cancellationPolicy;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private Integer capacity;

    @Column(name = "price_per_night")
    private Double pricePerNight;
    
    // Nullable false ve varsayılan değeri false olarak ayarlandı
    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean featured = false;
    
    // Otelin amenity bilgilerini virgülle ayrılmış string olarak saklamak için alan
    @Column(columnDefinition = "TEXT")
    private String amenities;

    // Getters and Setters

    public Long getHotelId() {
        return hotelId;
    }
    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }
    public Long getManagerId() {
        return managerId;
    }
    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public Double getLatitude() {
        return latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    public Double getLongitude() {
        return longitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getStarRating() {
        return starRating;
    }
    public void setStarRating(Integer starRating) {
        this.starRating = starRating;
    }
    public String getCheckInTime() {
        return checkInTime;
    }
    public void setCheckInTime(String checkInTime) {
        this.checkInTime = checkInTime;
    }
    public String getCheckOutTime() {
        return checkOutTime;
    }
    public void setCheckOutTime(String checkOutTime) {
        this.checkOutTime = checkOutTime;
    }
    public String getCancellationPolicy() {
        return cancellationPolicy;
    }
    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Integer getCapacity() {
        return capacity;
    }
    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
    public Double getPricePerNight() {
        return pricePerNight;
    }
    public void setPricePerNight(Double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }
    public Boolean getFeatured() {
        return featured;
    }
    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }
    
    // Yeni eklenen amenity alanı için getter & setter
    public String getAmenities() {
        return amenities;
    }
    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }
}
