package com.example.hotelapp.repository;

import com.example.hotelapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    // Eklenen metod:
    List<User> findByRole(String role);
}
