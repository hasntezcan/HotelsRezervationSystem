package com.example.hotelapp.controller;

import com.example.hotelapp.dto.ManagerDTO;
import com.example.hotelapp.model.Manager;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.ManagerRepository;
import com.example.hotelapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/managers")
@CrossOrigin(origins = "http://localhost:5173")
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<ManagerDTO> getAllManagers() {
        List<Manager> managers = managerRepository.findAll();
        return managers.stream().map(manager -> {
            ManagerDTO dto = new ManagerDTO();
            dto.setManagerId(manager.getManagerId());
            // İlgili manager'ın kullanıcı bilgisini çekiyoruz.
            userRepository.findById(manager.getUserId()).ifPresent(user -> {
                String fullName = user.getFirstName() + " " + user.getLastName();
                dto.setManagerName(fullName);
            });
            return dto;
        }).collect(Collectors.toList());
    }
}
