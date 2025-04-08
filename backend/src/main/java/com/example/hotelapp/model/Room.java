package com.example.hotelapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hotel_id", nullable = false)
    private Long hotelId;

    @Column(name = "room_type", nullable = false, length = 50)
    private String roomType;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "price_per_night", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerNight;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "room_size", nullable = false)
    private Integer roomSize;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "total_rooms", nullable = false)
    private Integer totalRooms;

    // Eğer tablo varsa; aksi halde ihtiyaca göre kaldırabilirsiniz.
    @Column(name = "image_id")
    private Integer imageId;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    // Bir odanın birden fazla resmi olabilir (Tablo: roomimages)
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoomImage> images;

    // Odaya ait amenity’leri, junction tablosu aracılığıyla getiriyoruz (Tablo: roomamenityjunction)
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoomAmenityJunction> amenityJunctions;

    // Kurucu metodlar
    public Room() {
    }

    public Room(Long hotelId, String roomType, String name, BigDecimal pricePerNight, Integer capacity,
                Integer roomSize, String description, Integer totalRooms, Integer imageId, LocalDateTime createdAt) {
        this.hotelId = hotelId;
        this.roomType = roomType;
        this.name = name;
        this.pricePerNight = pricePerNight;
        this.capacity = capacity;
        this.roomSize = roomSize;
        this.description = description;
        this.totalRooms = totalRooms;
        this.imageId = imageId;
        this.createdAt = createdAt;
    }

    // Getters ve Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getRoomSize() {
        return roomSize;
    }

    public void setRoomSize(Integer roomSize) {
        this.roomSize = roomSize;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTotalRooms() {
        return totalRooms;
    }

    public void setTotalRooms(Integer totalRooms) {
        this.totalRooms = totalRooms;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<RoomImage> getImages() {
        return images;
    }

    public void setImages(List<RoomImage> images) {
        this.images = images;
    }

    public List<RoomAmenityJunction> getAmenityJunctions() {
        return amenityJunctions;
    }

    public void setAmenityJunctions(List<RoomAmenityJunction> amenityJunctions) {
        this.amenityJunctions = amenityJunctions;
    }
}