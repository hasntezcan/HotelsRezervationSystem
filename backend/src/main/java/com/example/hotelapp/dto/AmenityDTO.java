package com.example.hotelapp.dto;

public class AmenityDTO {

    private Long amenityId;
    private String name;
    private String iconUrl;

    // Default constructor
    public AmenityDTO() {
    }

    // Parametreli constructor
    public AmenityDTO(Long amenityId, String name, String iconUrl) {
        this.amenityId = amenityId;
        this.name = name;
        this.iconUrl = iconUrl;
    }

    // Getter ve Setter'lar

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
