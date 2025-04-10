package com.example.hotelapp.controller;

import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.Review;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.hotelapp.dto.ReviewDTO;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping("/hotel/{hotelId}")
    public List<ReviewDTO> getReviewsByHotel(@PathVariable Long hotelId) {
        List<Review> reviews = reviewRepository.findByHotelId(hotelId);

        return reviews.stream().map(review -> {
            ReviewDTO dto = new ReviewDTO();
            dto.setReviewId(review.getReviewId());
            dto.setUserId(review.getUserId());
            dto.setHotelId(review.getHotelId());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCreatedAt(review.getCreatedAt());

            // Add username if user exists
            userRepository.findById(review.getUserId()).ifPresent(user -> dto.setUsername(user.getUsername()));
            return dto;
        }).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO) {
        // Check if user exists
        Optional<User> user = userRepository.findById(reviewDTO.getUserId());
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Check if hotel exists
        Optional<Hotel> hotel = hotelRepository.findById(reviewDTO.getHotelId());
        if (hotel.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Create and populate Review object
        Review review = new Review();
        review.setUserId(reviewDTO.getUserId());
        review.setHotelId(reviewDTO.getHotelId());
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setCreatedAt(LocalDateTime.now());

        // Save
        Review savedReview = reviewRepository.save(review);

        // Build response DTO manually
        ReviewDTO responseDTO = new ReviewDTO();
        responseDTO.setReviewId(savedReview.getReviewId());
        responseDTO.setUserId(savedReview.getUserId());
        responseDTO.setHotelId(savedReview.getHotelId());
        responseDTO.setRating(savedReview.getRating());
        responseDTO.setComment(savedReview.getComment());
        responseDTO.setCreatedAt(savedReview.getCreatedAt());
        responseDTO.setUsername(user.get().getUsername());

        return ResponseEntity.ok(responseDTO);
    }
}
