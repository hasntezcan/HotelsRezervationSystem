package com.example.hotelapp.service;

import com.example.hotelapp.model.HotelAmenity;
import com.example.hotelapp.model.HotelAmenityJunction;
import com.example.hotelapp.repository.HotelAmenityJunctionRepository;
import com.example.hotelapp.repository.HotelAmenityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelAmenityJunctionService {

    @Autowired
    private HotelAmenityRepository hotelAmenityRepository;

    @Autowired
    private HotelAmenityJunctionRepository hotelAmenityJunctionRepository;

    /**
     * Belirli bir otel için amenity ilişkilerini günceller.
     * Gelen amenities string'ini virgülle ayrılmış amenity isimlerine çevirir,
     * mevcut junction kayıtlarını siler ve yeni kayıtları ekler.
     *
     * @param hotelId Otelin ID'si.
     * @param amenitiesStr Virgülle ayrılmış amenity isimleri (ör. "Free Wi-Fi, Gym, Restaurant").
     */
    @Transactional
    public void updateHotelAmenities(Long hotelId, String amenitiesStr) {
        // Gelen string boşsa mevcut junction kayıtlarını temizle
        if (amenitiesStr == null || amenitiesStr.trim().isEmpty()) {
            hotelAmenityJunctionRepository.deleteByHotelId(hotelId);
            return;
        }

        // Amenity isimlerini virgül ile ayır, boşlukları temizle ve tekrar edenleri kaldır
        List<String> amenityNames = Arrays.stream(amenitiesStr.split(","))
                                          .map(String::trim)
                                          .filter(s -> !s.isEmpty())
                                          .distinct()
                                          .collect(Collectors.toList());

        // Önce mevcut junction kayıtlarını sil
        hotelAmenityJunctionRepository.deleteByHotelId(hotelId);

        // Her amenity ismi için, amenity kaydını bul ve junction kaydı oluştur
        for (String name : amenityNames) {
            HotelAmenity amenity = hotelAmenityRepository.findTopByName(name);
            if (amenity != null) {
                HotelAmenityJunction junction = new HotelAmenityJunction();
                junction.setHotelId(hotelId);
                junction.setAmenityId(amenity.getAmenityId());
                hotelAmenityJunctionRepository.save(junction);
            } else {
                // Eğer amenity bulunamazsa, log kayıtlarına yazılabilir
                System.err.println("Amenity not found for name: " + name);
            }
        }
    }
}
