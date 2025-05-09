package com.example.hotelapp.repository;

import com.example.hotelapp.model.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, Long> {
    // RoomImage.room.id alanına göre silme ve listeleme:
    void deleteByRoom_Id(Long roomId);
    List<RoomImage> findByRoom_Id(Long roomId);
    RoomImage findByRoom_IdAndIsPrimary(Long roomId, boolean isPrimary);

}
