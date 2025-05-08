package com.example.hotelapp.controller;

import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.HotelImage;
import com.example.hotelapp.repository.HotelImageRepository;
import com.example.hotelapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/hotel-images")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelImageController {

    private final HotelImageRepository hotelImageRepository;
    private final HotelRepository hotelRepository;

    // application.properties içinde tanımlı:
    // hotel.images.dir=public/hotel_images
    @Value("${hotel.images.dir}")
    private String imageDir;

    public HotelImageController(HotelImageRepository hotelImageRepository,
                                HotelRepository hotelRepository) {
        this.hotelImageRepository = hotelImageRepository;
        this.hotelRepository = hotelRepository;
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<List<HotelImage>> getImagesByHotelId(@PathVariable Long hotelId) {
        return ResponseEntity.ok(hotelImageRepository.findByHotel_HotelId(hotelId));
    }

    @GetMapping("/{hotelId}/primary")
    public ResponseEntity<HotelImage> getPrimaryImage(@PathVariable Long hotelId) {
        HotelImage img = hotelImageRepository.findByHotel_HotelIdAndIsPrimary(hotelId, true);
        return img != null ? ResponseEntity.ok(img) : ResponseEntity.noContent().build();
    }

    /**
     * Yeni resim yükleme:
     * Form-data: hotelId (text), isPrimary (text true/false), file (binary)
     */
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HotelImage> uploadImage(
            @RequestParam Long hotelId,
            @RequestParam(defaultValue = "false") boolean isPrimary,
            @RequestPart("file") MultipartFile file
    ) throws IOException {
        // 1) Oteli al
        Hotel hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found: " + hotelId));

        // 2) Eğer primary ise eskisini kaldır
        if (isPrimary) {
            HotelImage old = hotelImageRepository.findByHotelAndIsPrimary(hotel, true);
            if (old != null) {
                old.setPrimary(false);
                hotelImageRepository.save(old);
            }
        }

        // 3) Dosya adını benzersizleştir (timestamp + uzantı)
        String original = StringUtils.cleanPath(file.getOriginalFilename());
        String ext = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0) ext = original.substring(dot);
        String filename = Instant.now().toEpochMilli() + ext;

        // 4) Hedef klasör yolunu al (public/hotel_images)
        Path uploadPath = Paths.get(imageDir).toAbsolutePath().normalize();

        // -- artık createDirectories yok, klasörün var olduğu varsayılıyor --

        // 5) Dosyayı diske yaz
        Path target = uploadPath.resolve(filename);
        try (var in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        }

        // 6) Veritabanına kayıt
        HotelImage hi = new HotelImage();
        hi.setHotel(hotel);
        hi.setImageUrl("/hotel_images/" + filename);
        hi.setPrimary(isPrimary);
        HotelImage saved = hotelImageRepository.save(hi);

        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long imageId) {
        hotelImageRepository.deleteById(imageId);
        return ResponseEntity.noContent().build();
    }
}
