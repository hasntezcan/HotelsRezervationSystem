package com.example.hotelapp.dto;

public class AdminHotelDTO {
    private Long hotelId;
    private String name;
    private String address; // Yeni eklenen alan
    private String city;
    private String country;
    private String managerName;
    private String photoUrl;
    private String amenities;

    public AdminHotelDTO(Long hotelId, String name, String address, String city, String country,
                         String managerName, String photoUrl, String amenities) {
        this.hotelId = hotelId;
        this.name = name;
        this.address = address;
        this.city = city;
        this.country = country;
        this.managerName = managerName;
        this.photoUrl = photoUrl;
        this.amenities = amenities;
    }

    // Getter ve Setter metodlarını ekleyin:
    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
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

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }
}
