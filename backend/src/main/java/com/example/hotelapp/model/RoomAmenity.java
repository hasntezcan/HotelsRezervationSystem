package com.example.hotelapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "roomamenities")
public class RoomAmenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amenity_id")
    private Long amenityId;

    // Örneğin, 'name' kolonunu tutuyorsanız
    @Column(name = "name", nullable = false)
    private String name;

    // Tersi ilişki: Bu amenity hangi junction'larda kullanıldı?
    // Yani hangi odalara eklenmiş?
    @OneToMany(mappedBy = "amenity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoomAmenityJunction> junctions;

    // GETTER-SETTER
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

    public List<RoomAmenityJunction> getJunctions() {
        return junctions;
    }
    public void setJunctions(List<RoomAmenityJunction> junctions) {
        this.junctions = junctions;
    }
}