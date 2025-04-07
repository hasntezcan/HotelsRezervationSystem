-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 08 Nis 2025, 00:16:57
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
  `user_id` bigint(20) DEFAULT NULL,
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
-- Tablo için tablo yapısı `contact_messages`
--

CREATE TABLE `contact_messages` (
  `message_id` varchar(255) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `contact_messages`
--

INSERT INTO `contact_messages` (`message_id`, `sender_name`, `sender_email`, `phone`, `message`, `sent_at`, `is_read`) VALUES
('5850c479-e734-461a-b7b6-28df3e35b895', 'a', 'esad.emir34@stu.khas.edu.tr', '05438813007', 'aa', '2025-04-05 11:20:24', 0),
('7dae1e1d-8ce7-40c3-8459-fb19cefce8d2', 'a', 'esad.emir34@stu.khas.edu.tr', '05438813007', 'nabe sabo', '2025-04-05 10:59:17', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelamenities`
--

CREATE TABLE `hotelamenities` (
  `amenity_id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `icon_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotelamenities`
--

INSERT INTO `hotelamenities` (`amenity_id`, `name`, `icon_url`) VALUES
('a1', 'Free Wi-Fi', ''),
('a10', 'Restaurant', ''),
('a11', 'Skyline View', ''),
('a12', 'Luxury Suites', ''),
('a13', 'Helipad', ''),
('a14', 'Beachfront', ''),
('a15', 'Private Pool', ''),
('a16', 'Beach View', ''),
('a17', 'Luxury Spa', ''),
('a18', 'Sunset View', ''),
('a19', 'Cocktail Bar', ''),
('a2', 'Breakfast Included', ''),
('a20', 'Massage Therapy', ''),
('a21', 'Private Beach', ''),
('a22', 'Infinity Pool', ''),
('a23', 'Scuba Diving', ''),
('a24', 'Business Center', ''),
('a25', 'Free Shuttle', ''),
('a26', 'Meeting Rooms', ''),
('a27', 'Fast Wi-Fi', ''),
('a28', 'Traditional Spa', ''),
('a29', 'Tea Ceremony', ''),
('a3', 'Swimming Pool', ''),
('a30', 'Garden View', ''),
('a31', 'Penthouse Suites', ''),
('a32', 'Private Lounge', ''),
('a33', 'Michelin Star Restaurant', ''),
('a34', 'Eiffel Tower View', ''),
('a35', 'Fine Dining', ''),
('a36', 'Artistic Decor', ''),
('a37', 'Exclusive Bar', ''),
('a38', 'Gourmet Restaurant', ''),
('a39', 'Boat Rides', ''),
('a4', 'Gym', ''),
('a40', 'VIP Services', ''),
('a41', 'Exclusive Wine Cellar', ''),
('a42', 'Designer Suites', ''),
('a5', 'sezo', ''),
('a6', 'Bar', ''),
('a7', 'City View', ''),
('a8', 'Free Parking', ''),
('a9', 'Riverside View', '');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelamenityjunction`
--

CREATE TABLE `hotelamenityjunction` (
  `hotel_id` char(36) NOT NULL,
  `amenity_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotelamenityjunction`
--

INSERT INTO `hotelamenityjunction` (`hotel_id`, `amenity_id`) VALUES
('01', 'a2'),
('01', 'a3'),
('01', 'a4'),
('02', 'a5'),
('02', 'a6'),
('02', 'a7'),
('02', 'a8'),
('03', 'a1'),
('03', 'a10'),
('03', 'a9'),
('04', 'a11'),
('04', 'a12'),
('04', 'a13'),
('05', 'a14'),
('05', 'a15'),
('05', 'a18'),
('06', 'a16'),
('06', 'a17'),
('06', 'a19'),
('07', 'a14'),
('07', 'a21'),
('08', 'a20'),
('08', 'a22'),
('09', 'a24'),
('09', 'a27'),
('10', 'a25'),
('10', 'a26'),
('11', 'a28'),
('11', 'a29'),
('12', 'a31'),
('12', 'a32'),
('12', 'a33'),
('13', 'a34'),
('13', 'a35'),
('14', 'a36'),
('14', 'a37'),
('14', 'a38'),
('15', 'a39'),
('16', 'a40'),
('16', 'a41'),
('16', 'a42');

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

--
-- Tablo döküm verisi `hotelimages`
--

INSERT INTO `hotelimages` (`image_id`, `hotel_id`, `image_url`, `is_primary`) VALUES
('01-img', '01', '/src/assets/images/hotel-img01.jpg', 1),
('02-img', '02', '/src/assets/images/hotel-img02.jpg', 1),
('03-img', '03', '/src/assets/images/hotel-img03.jpg', 1),
('04-img', '04', '/src/assets/images/hotel-img04.jpg', 1),
('05-img', '05', '/src/assets/images/hotel-img05.jpg', 1),
('06-img', '06', '/src/assets/images/hotel-img06.jpg', 1),
('07-img', '07', '/src/assets/images/hotel-img07.jpg', 1),
('08-img', '08', '/src/assets/images/hotel-img08.jpg', 1),
('09-img', '09', '/src/assets/images/hotel-img09.jpg', 1),
('10-img', '10', '/src/assets/images/hotel-img10.jpg', 1),
('11-img', '11', '/src/assets/images/hotel-img11.jpg', 1),
('12-img', '12', '/src/assets/images/hotel-img12.jpg', 1),
('13-img', '13', '/src/assets/images/hotel-img13.jpg', 1),
('14-img', '14', '/HotelsRezervationSystem/src/assets/images/hotel-img14.jpg', 1),
('15-img', '15', '/src/assets/images/hotel-img15.jpg', 1),
('16-img', '16', '/src/assets/images/hotel-img16.jpg', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotels`
--

CREATE TABLE `hotels` (
  `hotel_id` char(36) NOT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `description` text DEFAULT NULL,
  `star_rating` int(11) DEFAULT NULL CHECK (`star_rating` between 1 and 5),
  `check_in_time` varchar(255) DEFAULT NULL,
  `check_out_time` varchar(255) DEFAULT NULL,
  `cancellation_policy` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `capacity` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `price_per_night` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotels`
--

INSERT INTO `hotels` (`hotel_id`, `manager_id`, `name`, `address`, `city`, `country`, `latitude`, `longitude`, `description`, `star_rating`, `check_in_time`, `check_out_time`, `cancellation_policy`, `status`, `created_at`, `capacity`, `photo`, `price_per_night`) VALUES
('02', 1, 'Royal Palace London', '10 Downing Street, London', 'London', 'United Kingdom', 51.5034, -0.1276, 'Stay like royalty at this prestigious address, with luxury amenities and impeccable service.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('03', 1, 'London River Hotel', '567 River Road, London', 'London', 'United Kingdom', 51.509, -0.118, 'Wake up to stunning river views and enjoy relaxing riverside walks in central London.', 4, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('04', 1, 'Skyline Tower London', '321 Skyline Avenue, London', 'London', 'United Kingdom', 51.515, -0.141, 'Reach new heights at Skyline Tower with luxury suites and breathtaking city panoramas.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('05', 1, 'Bali Beach Resort', '456 Sunset Road, Bali', 'Bali', 'Indonesia', -8.4095, 115.1889, 'Enjoy tropical paradise with beachfront access and unforgettable sunsets every day.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('06', 1, 'Tropical Paradise Bali', '789 Island Street, Bali', 'Bali', 'Indonesia', -8.414, 115.195, 'Dive into luxury with private pools and ultimate relaxation in the heart of Bali.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('07', 1, 'Golden Sands Resort', '999 Ocean Drive, Bali', 'Bali', 'Indonesia', -8.42, 115.2, 'Relax on golden sands and sip cocktails while enjoying Bali’s breathtaking sunsets.', 4, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('09', 1, 'Tokyo Sky Hotel', '789 Shibuya, Tokyo', 'Tokyo', 'Japan', 35.658, 139.7016, 'Enjoy panoramic city views and premium services at the heart of bustling Tokyo.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('10', 1, 'Shinjuku Business Hotel', '45 Business Street, Tokyo', 'Tokyo', 'Japan', 35.6938, 139.7034, 'Perfect for business travelers with fast Wi-Fi and professional meeting rooms.', 4, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('11', 1, 'Cherry Blossom Resort', '22 Sakura Avenue, Tokyo', 'Tokyo', 'Japan', 35.6895, 139.6917, 'Experience traditional Japanese hospitality surrounded by beautiful cherry blossoms.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('12', 1, 'Luxury Tower Tokyo', '567 Ginza Road, Tokyo', 'Tokyo', 'Japan', 35.6717, 139.765, 'Enjoy penthouse suites and gourmet dining in Tokyo’s upscale Ginza district.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('13', 1, 'Eiffel Grand Hotel', '123 Champs Elysees, Paris', 'Paris', 'France', 48.8566, 2.3522, 'Stay steps away from the Eiffel Tower with luxurious accommodations and fine dining.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('14', 1, 'Louvre Palace Hotel', '89 Louvre Street, Paris', 'Paris', 'France', 48.8606, 2.3376, 'Discover art and culture with premium access to the Louvre and luxury services.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-06 13:58:50', NULL, NULL, NULL),
('15', 1, 'Seine River Hotel', '456 Riverfront, Paris', 'Paris', 'France', 48.857, 2.354, 'Enjoy riverside dining and scenic boat rides in the heart of Paris.', 4, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-07 13:25:25', NULL, NULL, NULL),
('16', 1, 'Parisian Royal Suites', '777 Palace Road, Paris', 'Paris', 'France', 48.8582, 2.35, 'Royal treatment with exclusive wine cellar and designer suites in Paris.', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours before check-in.', 'approved', '2025-04-07 13:25:25', NULL, NULL, NULL),
('3ac6bd10-972c-4c82-b74c-c3141f59a585', NULL, 'denemeaaaaaa', 'deneme', 'deneme', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-07 19:13:12', 50, '', 50);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `managers`
--

CREATE TABLE `managers` (
  `manager_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `hotel_id` char(36) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `user_id` bigint(20) DEFAULT NULL,
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
  `user_id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `username`, `role`, `email`, `password`, `first_name`, `last_name`, `phone`, `created_at`, `updated_at`, `is_verified`) VALUES
(9, 'iamsahinemir', 'user', 'esad.emir34@gmail.com', '123456', 'emir esad', 'şahin', '05438813007', '2025-03-31 17:36:25', '2025-03-31 21:21:00', 1),
(10, 'sezo', 'user', 'sezo@sezo.com', '123456', 'Sezai', 'Araplarlı', '05313313131', '2025-04-02 10:59:15', '2025-04-02 10:59:15', 0),
(11, 'dede', 'user', 'dede@dede.com', '123456', 'dede', 'dede', '05313313131', '2025-04-03 17:57:28', '2025-04-03 17:57:28', 0),
(12, 'admin', 'admin', 'admin@admin.com', '1234567', 'admin', 'admin', '05467897895', '2025-04-03 18:54:48', '2025-04-05 12:07:35', 0),
(13, 'deneme', 'user', 'esad.emir34@stu.khas.edu.tr', '123456', 'emir', 'şahin', '05512024369', '2025-04-05 10:50:27', '2025-04-05 10:50:27', 0),
(14, 'hasantezcan', 'user', 'hasantezcan@gmail.com', 'abcd1234', 'Hasan', 'Tezcan', '05531092919', '2025-04-05 15:46:50', '2025-04-05 15:46:50', 0);

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
-- Tablo için indeksler `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`message_id`);

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
  ADD KEY `idx_hotels_city` (`city`),
  ADD KEY `fk_hotels_manager` (`manager_id`);

--
-- Tablo için indeksler `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`manager_id`),
  ADD UNIQUE KEY `uk_manager_user` (`user_id`),
  ADD UNIQUE KEY `uk_manager_hotel` (`hotel_id`);

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
  ADD KEY `idx_reviews_hotel` (`hotel_id`),
  ADD KEY `fk_reviews_user` (`user_id`);

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
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_users_email` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `managers`
--
ALTER TABLE `managers`
  MODIFY `manager_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `managers`
--
ALTER TABLE `managers`
  ADD CONSTRAINT `fk_managers_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_managers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
