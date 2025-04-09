package com.example.hotelapp.service;

import com.example.hotelapp.model.Room;
import com.example.hotelapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        return roomRepository.findById(id)
                .map(room -> {
                    room.setHotelId(updatedRoom.getHotelId());
                    room.setRoomType(updatedRoom.getRoomType());
                    room.setName(updatedRoom.getName());
                    room.setPricePerNight(updatedRoom.getPricePerNight());
                    room.setCapacity(updatedRoom.getCapacity());
                    room.setRoomSize(updatedRoom.getRoomSize());
                    room.setSize(updatedRoom.getSize()); // ✅ eklendi
                    room.setBedType(updatedRoom.getBedType()); // ✅ eklendi
                    room.setDescription(updatedRoom.getDescription());
                    room.setTotalRooms(updatedRoom.getTotalRooms());
                    room.setImageId(updatedRoom.getImageId());
                    return roomRepository.save(room);
                }).orElse(null);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}