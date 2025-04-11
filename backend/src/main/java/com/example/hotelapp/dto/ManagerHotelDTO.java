package com.example.hotelapp.dto;

public class ManagerHotelDTO {

    private Long hotelId;
    private String name;
    private String address;
    private String city;
    private String country;
    private String amenities; // Amenities bilgilerini virgülle ayrılmış string olarak saklar
    // Diğer alanlar da eklenebilir (örneğin managerId, vs.)

    public ManagerHotelDTO() {
    }

    public ManagerHotelDTO(Long hotelId, String name, String address, String city, String country, String amenities) {
        this.hotelId = hotelId;
        this.name = name;
        this.address = address;
        this.city = city;
        this.country = country;
        this.amenities = amenities;
    }

    // Getter ve Setter metodları

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

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }
}
