package com.example.hotelapp.controller;

import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.HotelImage;
import com.example.hotelapp.repository.HotelImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/hotel-images")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelImageController {

    @Value("${hotel.images.dir}")
    private String imagesDir;  // e.g. "public/hotel_images"

    @Autowired
    private HotelImageRepository hotelImageRepository;

    // GET all images for a specific hotel
    @GetMapping("/{hotelId}")
    public List<HotelImage> getImagesByHotelId(@PathVariable Long hotelId) {
        return hotelImageRepository.findByHotel_HotelId(hotelId);
    }

    // GET the primary image for a specific hotel
    @GetMapping("/{hotelId}/primary")
    public HotelImage getPrimaryImage(@PathVariable Long hotelId) {
        return hotelImageRepository.findByHotel_HotelIdAndIsPrimary(hotelId, true);
    }

    // POST a new image file for a hotel
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HotelImage> uploadImage(
            @RequestParam Long hotelId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "true") boolean isPrimary
    ) throws IOException {
        // 1) Save file to disk
        String filename = file.getOriginalFilename();
        Path targetDir = Paths.get(imagesDir);
        Files.createDirectories(targetDir);
        Path targetPath = targetDir.resolve(filename);
        file.transferTo(targetPath.toFile());

        // 2) Create DB record
        HotelImage img = new HotelImage();
        Hotel hotel = new Hotel();
        hotel.setHotelId(hotelId);
        img.setHotel(hotel);
        img.setImageUrl("/hotel_images/" + filename);
        img.setPrimary(isPrimary);
        HotelImage saved = hotelImageRepository.save(img);

        return ResponseEntity.ok(saved);
    }
}
