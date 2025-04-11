package com.example.hotelapp.service;

import com.example.hotelapp.model.ManagerHotel;
import com.example.hotelapp.repository.ManagerHotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ManagerHotelService {

    @Autowired
    private ManagerHotelRepository managerHotelRepository;

    @Autowired
    private HotelAmenityJunctionService hotelAmenityJunctionService;

    public ManagerHotel updateHotel(Long hotelId, ManagerHotel updatedHotel) {
        Optional<ManagerHotel> hotelOpt = managerHotelRepository.findById(hotelId);
        if (!hotelOpt.isPresent()) {
            throw new RuntimeException("Hotel not found with id: " + hotelId);
        }
        ManagerHotel hotel = hotelOpt.get();
        hotel.setName(updatedHotel.getName());
        hotel.setCity(updatedHotel.getCity());
        hotel.setCountry(updatedHotel.getCountry());
        hotel.setAddress(updatedHotel.getAddress());
        // Diğer alanların güncellenmesi...

        // Amenity bilgisini güncellemek için:
        hotel.setAmenities(updatedHotel.getAmenities()); // Eğer ManagerHotel entity içinde amenities alanınız varsa
        ManagerHotel savedHotel = managerHotelRepository.save(hotel);

        // Junction tablosunu da güncelle (seçili amenity'ler virgülle ayrılmış string olarak gönderilir)
        if (updatedHotel.getAmenities() != null) {
            hotelAmenityJunctionService.updateHotelAmenities(hotelId, updatedHotel.getAmenities());
        }

        return savedHotel;
    }
}
