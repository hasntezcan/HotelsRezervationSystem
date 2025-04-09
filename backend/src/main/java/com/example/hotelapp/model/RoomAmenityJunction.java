package com.example.hotelapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@IdClass(RoomAmenityJunctionId.class)
@Entity
@Table(name = "roomamenityjunction")
public class RoomAmenityJunction {

    @Id
    @Column(name = "room_id")
    private Long roomId;

    @Id
    @Column(name = "amenity_id")
    private Long amenityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonBackReference
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "amenity_id", insertable = false, updatable = false)
    private RoomAmenity amenity;

    @Column(name = "is_primary")
    private Boolean isPrimary;

    // GETTER SETTER

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getAmenityId() {
        return amenityId;
    }

    public void setAmenityId(Long amenityId) {
        this.amenityId = amenityId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public RoomAmenity getAmenity() {
        return amenity;
    }

    public void setAmenity(RoomAmenity amenity) {
        this.amenity = amenity;
    }

    public Boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(Boolean isPrimary) {
        this.isPrimary = isPrimary;
    }
}