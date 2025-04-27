package com.example.hotelapp.service;

import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.BookingRepository;
import com.example.hotelapp.repository.RoomAmenityJunctionRepository;
import com.example.hotelapp.repository.RoomImageRepository;
import com.example.hotelapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired private RoomRepository roomRepository;
    @Autowired private RoomAmenityJunctionRepository junctionRepo;
    @Autowired private RoomImageRepository roomImageRepo;
    @Autowired private BookingRepository bookingRepo;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        return roomRepository.findById(id).map(room -> {
            if (updatedRoom.getHotelId() != null)       room.setHotelId(updatedRoom.getHotelId());
            if (updatedRoom.getRoomType() != null)      room.setRoomType(updatedRoom.getRoomType());
            if (updatedRoom.getName() != null)          room.setName(updatedRoom.getName());
            if (updatedRoom.getPricePerNight() != null) room.setPricePerNight(updatedRoom.getPricePerNight());
            if (updatedRoom.getCapacity() != null)      room.setCapacity(updatedRoom.getCapacity());
            if (updatedRoom.getRoomSize() != null)      room.setRoomSize(updatedRoom.getRoomSize());
            if (updatedRoom.getSize() != null)          room.setSize(updatedRoom.getSize());
            if (updatedRoom.getBedType() != null)       room.setBedType(updatedRoom.getBedType());
            if (updatedRoom.getDescription() != null)   room.setDescription(updatedRoom.getDescription());
            if (updatedRoom.getTotalRooms() != null)    room.setTotalRooms(updatedRoom.getTotalRooms());
            if (updatedRoom.getImageId() != null)       room.setImageId(updatedRoom.getImageId());
            return roomRepository.save(room);
        }).orElse(null);
    }

    /**
     * Odayı silerken önce amenity junction kayıtlarını,
     * sonra da kendisini siliyoruz.
     */
    @Transactional
    public void deleteRoom(Long id) {
        junctionRepo.deleteByRoomId(id);
        roomRepository.deleteById(id);
    }

    public long getTotalRooms() {
        return roomRepository.findAll()
                .stream()
                .mapToLong(Room::getTotalRooms)
                .sum();
    }

    @Transactional
    public void deleteRoomWithDetails(Long id) {
        // 1) Önce bu odaya ait rezervasyonları sil
        bookingRepo.deleteByRoomId(id);

        // 2) Amenity junction kayıtlarını sil
        junctionRepo.deleteByRoomId(id);

        // 3) RoomImage kayıtlarını sil (metot ismi deleteByRoom_Id oldu)
        roomImageRepo.deleteByRoom_Id(id);

        // 4) Son olarak odayı sil
        roomRepository.deleteById(id);
    }
}
