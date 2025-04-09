package com.example.hotelapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RoomAmenityJunctionId implements Serializable {

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "amenity_id")
    private Long amenityId;

    // Boş constructor (zorunlu!)
    public RoomAmenityJunctionId() {
    }

    public RoomAmenityJunctionId(Long roomId, Long amenityId) {
        this.roomId = roomId;
        this.amenityId = amenityId;
    }

    // Getter Setter

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

    // equals() ve hashCode() zorunlu!
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoomAmenityJunctionId)) return false;
        RoomAmenityJunctionId that = (RoomAmenityJunctionId) o;
        return Objects.equals(roomId, that.roomId) &&
                Objects.equals(amenityId, that.amenityId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomId, amenityId);
    }
}