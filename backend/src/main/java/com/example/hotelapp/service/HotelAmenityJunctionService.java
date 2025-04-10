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
     * Güncelleme sırasında, formdan gelen virgülle ayrılmış amenity isimlerini alıp,
     * ilgili otelin amenity junction kayıtlarını günceller.
     *
     * @param hotelId Otelin ID'si.
     * @param amenitiesStr Virgülle ayrılmış amenity isimleri (ör. "Free Wi-Fi, Swimming Pool").
     */
    @Transactional
    public void updateHotelAmenities(Long hotelId, String amenitiesStr) {
        if (amenitiesStr == null || amenitiesStr.trim().isEmpty()) {
            // Eğer boş geliyorsa, mevcut amenity junction kayıtlarını temizle
            hotelAmenityJunctionRepository.deleteByHotelId(hotelId);
            return;
        }

        // Amenity isimlerini ayır, boşluklardan temizle ve tekrarlayanları çıkart:
        List<String> amenityNames = Arrays.stream(amenitiesStr.split(","))
                                          .map(String::trim)
                                          .filter(s -> !s.isEmpty())
                                          .distinct() // yalnızca benzersiz değerler
                                          .collect(Collectors.toList());

        // Önce mevcut junction kayıtlarını siliyoruz
        hotelAmenityJunctionRepository.deleteByHotelId(hotelId);

        // Her amenity ismi için:
        for (String name : amenityNames) {
            HotelAmenity amenity = hotelAmenityRepository.findTopByName(name);
            if (amenity != null) {
                HotelAmenityJunction junction = new HotelAmenityJunction();
                junction.setHotelId(hotelId);
                junction.setAmenityId(amenity.getAmenityId());
                hotelAmenityJunctionRepository.save(junction);
            } else {
                // İlgili amenity adı bulunamazsa, log’a yazıyoruz
                System.err.println("Amenity not found for name: " + name);
            }
        }
    }
}
