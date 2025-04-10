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
    
    @Autowired
    private HotelAmenityJunctionService hotelAmenityJunctionService;

    public List<AdminHotelDTO> getAllAdminHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
    
        return hotels.stream().map(hotel -> {
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
    
            String photoUrl = hotelImageRepository.findByHotel(hotel)
                    .stream()
                    .filter(img -> Boolean.TRUE.equals(img.isPrimary()))
                    .map(HotelImage::getImageUrl)
                    .findFirst()
                    .orElse("");
    
            String amenities = hotelRepository.findAmenitiesByHotelId(hotel.getHotelId());
            if (amenities == null) {
                amenities = "";
            }
    
            return new AdminHotelDTO(
                hotel.getHotelId(),
                hotel.getName(),
                hotel.getAddress(),
                hotel.getCity(),
                hotel.getCountry(),
                managerName,
                photoUrl,
                amenities
            );
        }).collect(Collectors.toList());
    }

    public Hotel updateHotel(Long hotelId, Hotel updatedHotel) {
        Optional<Hotel> hotelOpt = hotelRepository.findById(hotelId);
        if (!hotelOpt.isPresent()) {
            throw new RuntimeException("Hotel not found with id: " + hotelId);
        }
        Hotel hotel = hotelOpt.get();
        hotel.setName(updatedHotel.getName());
        hotel.setCity(updatedHotel.getCity());
        hotel.setCountry(updatedHotel.getCountry());
        hotel.setAddress(updatedHotel.getAddress());
        hotel.setAmenities(updatedHotel.getAmenities());
        
        Hotel savedHotel = hotelRepository.save(hotel);

        // Amenity bilgilerini güncelleme
        if (updatedHotel.getAmenities() != null) {
            hotelAmenityJunctionService.updateHotelAmenities(hotelId, updatedHotel.getAmenities());
        }
        return savedHotel;
    }
}
