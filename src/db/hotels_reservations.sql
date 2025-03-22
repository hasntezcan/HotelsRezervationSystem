-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 22 Mar 2025, 22:12:56
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `hotels_reservations`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `room_id` char(36) DEFAULT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `num_guests` int(11) NOT NULL CHECK (`num_guests` > 0),
  `price_per_night` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelamenities`
--

CREATE TABLE `hotelamenities` (
  `amenity_id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `icon_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelamenityjunction`
--

CREATE TABLE `hotelamenityjunction` (
  `hotel_id` char(36) NOT NULL,
  `amenity_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelimages`
--

CREATE TABLE `hotelimages` (
  `image_id` char(36) NOT NULL,
  `hotel_id` char(36) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotels`
--

CREATE TABLE `hotels` (
  `hotel_id` char(36) NOT NULL,
  `manager_id` char(36) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `star_rating` int(11) DEFAULT NULL CHECK (`star_rating` between 1 and 5),
  `check_in_time` time DEFAULT NULL,
  `check_out_time` time DEFAULT NULL,
  `cancellation_policy` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `payments`
--

CREATE TABLE `payments` (
  `payment_id` char(36) NOT NULL,
  `booking_id` char(36) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('credit_card','paypal','bank_transfer') NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `promotions`
--

CREATE TABLE `promotions` (
  `promotion_id` char(36) NOT NULL,
  `hotel_id` char(36) DEFAULT NULL,
  `room_id` char(36) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount_percentage` int(11) DEFAULT NULL CHECK (`discount_percentage` between 1 and 100),
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `promo_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `reviews`
--

CREATE TABLE `reviews` (
  `review_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `hotel_id` char(36) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roomamenities`
--

CREATE TABLE `roomamenities` (
  `amenity_id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roomamenityjunction`
--

CREATE TABLE `roomamenityjunction` (
  `room_id` char(36) NOT NULL,
  `amenity_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roomimages`
--

CREATE TABLE `roomimages` (
  `image_id` char(36) NOT NULL,
  `room_id` char(36) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `rooms`
--

CREATE TABLE `rooms` (
  `room_id` char(36) NOT NULL,
  `hotel_id` char(36) DEFAULT NULL,
  `room_type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `capacity` int(11) NOT NULL,
  `total_rooms` int(11) NOT NULL,
  `size` varchar(20) DEFAULT NULL,
  `bed_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `user_id` char(36) NOT NULL,
  `role` enum('user','admin','manager') NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `fk_bookings_user` (`user_id`),
  ADD KEY `fk_bookings_room` (`room_id`),
  ADD KEY `idx_bookings_check_in` (`check_in_date`);

--
-- Tablo için indeksler `hotelamenities`
--
ALTER TABLE `hotelamenities`
  ADD PRIMARY KEY (`amenity_id`);

--
-- Tablo için indeksler `hotelamenityjunction`
--
ALTER TABLE `hotelamenityjunction`
  ADD PRIMARY KEY (`hotel_id`,`amenity_id`),
  ADD KEY `fk_hotelamenityjunc_amenity` (`amenity_id`);

--
-- Tablo için indeksler `hotelimages`
--
ALTER TABLE `hotelimages`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `fk_hotelimages_hotel` (`hotel_id`);

--
-- Tablo için indeksler `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`hotel_id`),
  ADD KEY `fk_hotels_manager` (`manager_id`),
  ADD KEY `idx_hotels_city` (`city`);

--
-- Tablo için indeksler `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_payments_booking` (`booking_id`);

--
-- Tablo için indeksler `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promotion_id`),
  ADD KEY `fk_promotions_hotel` (`hotel_id`),
  ADD KEY `fk_promotions_room` (`room_id`);

--
-- Tablo için indeksler `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `fk_reviews_user` (`user_id`),
  ADD KEY `idx_reviews_hotel` (`hotel_id`);

--
-- Tablo için indeksler `roomamenities`
--
ALTER TABLE `roomamenities`
  ADD PRIMARY KEY (`amenity_id`);

--
-- Tablo için indeksler `roomamenityjunction`
--
ALTER TABLE `roomamenityjunction`
  ADD PRIMARY KEY (`room_id`,`amenity_id`),
  ADD KEY `fk_roomamenityjunc_amenity` (`amenity_id`);

--
-- Tablo için indeksler `roomimages`
--
ALTER TABLE `roomimages`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `fk_roomimages_room` (`room_id`);

--
-- Tablo için indeksler `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `fk_rooms_hotel` (`hotel_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`);

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `hotelamenityjunction`
--
ALTER TABLE `hotelamenityjunction`
  ADD CONSTRAINT `fk_hotelamenityjunc_amenity` FOREIGN KEY (`amenity_id`) REFERENCES `hotelamenities` (`amenity_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_hotelamenityjunc_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `hotelimages`
--
ALTER TABLE `hotelimages`
  ADD CONSTRAINT `fk_hotelimages_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `fk_hotels_manager` FOREIGN KEY (`manager_id`) REFERENCES `users` (`user_id`);

--
-- Tablo kısıtlamaları `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `fk_promotions_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_promotions_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `roomamenityjunction`
--
ALTER TABLE `roomamenityjunction`
  ADD CONSTRAINT `fk_roomamenityjunc_amenity` FOREIGN KEY (`amenity_id`) REFERENCES `roomamenities` (`amenity_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_roomamenityjunc_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `roomimages`
--
ALTER TABLE `roomimages`
  ADD CONSTRAINT `fk_roomimages_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_rooms_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
