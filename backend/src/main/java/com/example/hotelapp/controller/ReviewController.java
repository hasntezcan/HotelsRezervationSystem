package com.example.hotelapp.controller;

import com.example.hotelapp.model.Hotel;
import com.example.hotelapp.model.Review;
import com.example.hotelapp.repository.HotelRepository;
import com.example.hotelapp.repository.ReviewRepository;
import com.example.hotelapp.dto.ReviewDTO;
import com.example.hotelapp.model.User;
import com.example.hotelapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // GET /api/reviews/hotel/{hotelId}
    @GetMapping("/hotel/{hotelId}")
    public List<ReviewDTO> getReviewsByHotel(@PathVariable Long hotelId) {
        List<Review> reviews = reviewRepository.findByHotelId(hotelId);
        // 🔍 Log satırı eklendi
        System.out.println("🔍 getReviewsByHotel(hotelId=" + hotelId + ") returned " + reviews.size() + " reviews");
        return reviews.stream().map(review -> {
            ReviewDTO dto = new ReviewDTO();
            dto.setReviewId(review.getReviewId());
            dto.setUserId(review.getUserId());
            dto.setHotelId(review.getHotelId());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCreatedAt(review.getCreatedAt());
            userRepository.findById(review.getUserId())
                    .ifPresent(user -> dto.setUsername(user.getUsername()));
            return dto;
        }).collect(Collectors.toList());
    }

    // GET /api/reviews
    @GetMapping
    public List<ReviewDTO> getAllReviews() {
        long total = reviewRepository.count();
        // 🔍 Log satırı eklendi
        System.out.println("🔍 getAllReviews() called, total reviews = " + total);
        return reviewRepository.findAll().stream().map(review -> {
            ReviewDTO dto = new ReviewDTO();
            dto.setReviewId(review.getReviewId());
            dto.setUserId(review.getUserId());
            dto.setHotelId(review.getHotelId());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCreatedAt(review.getCreatedAt());
            userRepository.findById(review.getUserId())
                    .ifPresent(user -> dto.setUsername(user.getUsername()));
            return dto;
        }).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO) {
        System.out.println("▶️ Incoming ReviewDTO: " + reviewDTO);
        System.out.println("   userId   = " + reviewDTO.getUserId());
        System.out.println("   hotelId  = " + reviewDTO.getHotelId());

        // … gerisi aynen devam …

        boolean userExists = userRepository.existsById(reviewDTO.getUserId());
        boolean hotelExists = hotelRepository.existsById(reviewDTO.getHotelId());
        // 🔍 Log satırları eklendi
        System.out.println("   userExists  = " + userExists);
        System.out.println("   hotelExists = " + hotelExists);

        if (!userExists) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User not found with ID: " + reviewDTO.getUserId());
        }
        if (!hotelExists) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Hotel not found with ID: " + reviewDTO.getHotelId());
        }

        Review review = new Review();
        review.setUserId(reviewDTO.getUserId());
        review.setHotelId(reviewDTO.getHotelId());
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setCreatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);
        // 🔍 Log satırı: kaydedilen reviewId
        System.out.println("✅ Saved Review with reviewId = " + savedReview.getReviewId());

        ReviewDTO responseDTO = new ReviewDTO();
        responseDTO.setReviewId(savedReview.getReviewId());
        responseDTO.setUserId(savedReview.getUserId());
        responseDTO.setHotelId(savedReview.getHotelId());
        responseDTO.setRating(savedReview.getRating());
        responseDTO.setComment(savedReview.getComment());
        responseDTO.setCreatedAt(savedReview.getCreatedAt());
        responseDTO.setUsername(userRepository.findById(savedReview.getUserId())
                .map(User::getUsername)
                .orElse(null));

        return ResponseEntity.ok(responseDTO);

    }
}
