package com.example.hotelapp.controller;

import com.example.hotelapp.model.Room;
import com.example.hotelapp.model.RoomImage;
import com.example.hotelapp.repository.RoomImageRepository;
import com.example.hotelapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/room-images")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomImageController {

    @Value("${room.images.dir}")
    private String imageDir;

    @Autowired
    private RoomImageRepository roomImageRepository;

    @Autowired
    private RoomRepository roomRepository;

    /**
     * Yeni oda görseli yükleme:
     * Form-data: roomId (text), isPrimary (text true/false), file (binary)
     */
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RoomImage> uploadRoomImage(
            @RequestParam Long roomId,
            @RequestParam(defaultValue = "false") boolean isPrimary,
            @RequestPart("file") MultipartFile file
    ) throws IOException {
        // 1) Odayı al
        Room room = roomRepository.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Room not found: " + roomId));

        // 2) Eğer primary seçildiyse eskisini kaldır
        if (isPrimary) {
            RoomImage old = roomImageRepository.findByRoom_IdAndIsPrimary(roomId, true);
            if (old != null) {
                old.setIsPrimary(false);
                roomImageRepository.save(old);
            }
        }

        // 3) Dosya adını benzersizleştir (timestamp + uzantı)
        String original = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0) {
            ext = original.substring(dot);
        }
        String filename = Instant.now().toEpochMilli() + ext;

        // 4) Hedef klasör yolunu al (public/room_images)
        Path uploadPath = Paths.get(imageDir).toAbsolutePath().normalize();

        // 5) Dosyayı diske yaz
        Path target = uploadPath.resolve(filename);
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        }

        // 6) Veritabanına kayıt
        RoomImage ri = new RoomImage();
        ri.setRoom(room);
        ri.setImageUrl("/room_images/" + filename);
        ri.setIsPrimary(isPrimary);
        RoomImage saved = roomImageRepository.save(ri);

        return ResponseEntity.ok(saved);
    }

    /**
     * Belirli bir odaya ait tüm görselleri getirir
     */
    @GetMapping("/{roomId}")
    public ResponseEntity<List<RoomImage>> getByRoom(@PathVariable Long roomId) {
        return ResponseEntity.ok(roomImageRepository.findByRoom_Id(roomId));
    }

    /**
     * Oda görselini siler
     */
    @DeleteMapping("/{imageId}")
    public ResponseEntity<Void> delete(@PathVariable Long imageId) {
        roomImageRepository.deleteById(imageId);
        return ResponseEntity.noContent().build();
    }
}
