package com.example.hotelapp.service;

import com.example.hotelapp.dto.AdminHotelDTO;
import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.HotelImage;
import com.example.hotelapp.model.Manager;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.HotelImageRepository;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.ManagerRepository;
import com.example.hotelapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminHotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private HotelImageRepository hotelImageRepository;

    @Autowired
    private ManagerRepository managerRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<AdminHotelDTO> getAllAdminHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels.stream().map(hotel -> {
            // Manager bilgilerini çekmek:
            String managerName = "";
            if (hotel.getManagerId() != null) {
                Optional<Manager> managerOpt = managerRepository.findById(hotel.getManagerId());
                if (managerOpt.isPresent()) {
                    Manager manager = managerOpt.get();
                    Optional<User> userOpt = userRepository.findById(manager.getUserId());
                    if (userOpt.isPresent()) {
                        User user = userOpt.get();
                        managerName = user.getFirstName() + " " + user.getLastName();
                    }
                }
            }
            // Primary fotoğrafı çekmek:
            HotelImage primaryImage = hotelImageRepository.findByHotelAndIsPrimary(hotel, true);
            String photoUrl = (primaryImage != null) ? primaryImage.getImageUrl() : "";
            // Amenities bilgilerini HotelRepository üzerindeki yeni metottan alıyoruz:
            String amenities = hotelRepository.findAmenitiesByHotelId(hotel.getHotelId());
            if(amenities == null) {
                amenities = "";
            }
            return new AdminHotelDTO(
                hotel.getHotelId(),
                hotel.getName(),
                hotel.getCity(),
                hotel.getCountry(),
                managerName,
                photoUrl,
                amenities
            );
        }).collect(Collectors.toList());
    }
}
