package com.example.hotelapp.dto;

public class HotelWithImageDTO {
    private Long hotelId;
    private String name;
    private String city;
    private Double pricePerNight;
    private Integer starRating;
    private String primaryImageUrl;
    private Double latitude;
   private Double longitude;

    // Constructor
    public HotelWithImageDTO(Long hotelId, String name, String city, 
                             Double pricePerNight, Integer starRating,
                             String primaryImageUrl,
                             Double latitude, Double longitude) {
        this.hotelId = hotelId;
        this.name = name;
        this.city = city;
        this.pricePerNight = pricePerNight;
        this.starRating = starRating;
        this.primaryImageUrl = primaryImageUrl;
        this.latitude = latitude;
        this.longitude = longitude;
        
    }

    // Getters
    public Double getLatitude() {
        return latitude;
    }
    public Double getLongitude() {
        return longitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public Double getPricePerNight() {
        return pricePerNight;
    }

    public Integer getStarRating() {
        return starRating;
    }

    public String getPrimaryImageUrl() {
        return primaryImageUrl;
    }

    // Setters
    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPricePerNight(Double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public void setStarRating(Integer starRating) {
        this.starRating = starRating;
    }

    public void setPrimaryImageUrl(String primaryImageUrl) {
        this.primaryImageUrl = primaryImageUrl;
    }
    /*
    // Optional: toString() method for debugging/logging
    @Override
    public String toString() {
        return "HotelWithImageDTO{" +
                "hotelId='" + hotelId + '\'' +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", pricePerNight=" + pricePerNight +
                ", starRating=" + starRating +
                ", primaryImageUrl='" + primaryImageUrl + '\'' +
                '}';
    }*/
}