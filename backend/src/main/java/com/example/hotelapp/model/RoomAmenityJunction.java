package com.example.hotelapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roomamenityjunction")
public class RoomAmenityJunction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    // tabloya ait PK

    // Oda FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    // Amenity FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "amenity_id", nullable = false)
    private RoomAmenity amenity;

    // Örn. 'is_primary' kolonu
    @Column(name = "is_primary")
    private Boolean isPrimary;

    // GETTER-SETTER
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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