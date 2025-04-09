-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 09 Nis 2025, 19:08:10
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

DELIMITER $$
--
-- Yordamlar
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AssignManagersToHotels` ()   BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE var_hotel_id BIGINT;
  DECLARE cur_hotels CURSOR FOR SELECT hotel_id FROM hotels;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur_hotels;

  read_loop: LOOP
    FETCH cur_hotels INTO var_hotel_id;
    IF done THEN
      LEAVE read_loop;
    END IF;

    INSERT INTO users (username, role, email, password, first_name, last_name, phone)
    VALUES (
      CONCAT('manager_', var_hotel_id),
      'manager',
      CONCAT('manager_', var_hotel_id, '@example.com'),
      'password',
      'Manager',
      var_hotel_id,
      '0000000000'
    );

    SET @new_user_id = LAST_INSERT_ID();

    INSERT INTO managers (user_id, hotel_id)
    VALUES (@new_user_id, var_hotel_id);

  END LOOP;

  CLOSE cur_hotels;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
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
  `message_id` bigint(20) NOT NULL,
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
(1, 'Emir Esad Şahin', 'esad.emir34@gmail.com', '05438813007', 'anan', '2025-04-09 14:07:07', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelamenities`
--

CREATE TABLE `hotelamenities` (
  `amenity_id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `icon_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotelamenities`
--

INSERT INTO `hotelamenities` (`amenity_id`, `name`, `icon_url`) VALUES
(1, 'Free Wi-Fi', ''),
(2, 'Breakfast Included', ''),
(3, 'Swimming Pool', ''),
(4, 'Gym', ''),
(5, 'sezo', ''),
(6, 'Bar', ''),
(7, 'City View', ''),
(8, 'Free Parking', ''),
(9, 'Riverside View', ''),
(10, 'Restaurant', ''),
(11, 'Skyline View', ''),
(12, 'Luxury Suites', ''),
(13, 'Helipad', ''),
(14, 'Beachfront', ''),
(15, 'Private Pool', ''),
(16, 'Beach View', ''),
(17, 'Luxury Spa', ''),
(18, 'Sunset View', ''),
(19, 'Cocktail Bar', ''),
(20, 'Massage Therapy', ''),
(21, 'Private Beach', ''),
(22, 'Infinity Pool', ''),
(23, 'Scuba Diving', ''),
(24, 'Business Center', ''),
(25, 'Free Shuttle', ''),
(26, 'Meeting Rooms', ''),
(27, 'Fast Wi-Fi', ''),
(28, 'Traditional Spa', ''),
(29, 'Tea Ceremony', ''),
(30, 'Garden View', ''),
(31, 'Penthouse Suites', ''),
(32, 'Private Lounge', ''),
(33, 'Michelin Star Restaurant', ''),
(34, 'Eiffel Tower View', ''),
(35, 'Fine Dining', ''),
(36, 'Artistic Decor', ''),
(37, 'Exclusive Bar', ''),
(38, 'Gourmet Restaurant', ''),
(39, 'Boat Rides', ''),
(40, 'VIP Services', ''),
(41, 'Exclusive Wine Cellar', ''),
(42, 'Designer Suites', '');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelamenityjunction`
--

CREATE TABLE `hotelamenityjunction` (
  `hotel_id` bigint(20) NOT NULL,
  `amenity_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotelamenityjunction`
--

INSERT INTO `hotelamenityjunction` (`hotel_id`, `amenity_id`) VALUES
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 1),
(3, 9),
(3, 10),
(4, 11),
(4, 12),
(4, 13),
(5, 14),
(5, 15),
(5, 18),
(6, 16),
(6, 17),
(6, 19),
(7, 14),
(7, 21),
(8, 20),
(8, 22),
(9, 24),
(9, 27),
(10, 25),
(10, 26),
(11, 28),
(11, 29),
(12, 31),
(12, 32),
(12, 33),
(13, 34),
(13, 35),
(14, 36),
(14, 37),
(14, 38),
(15, 39),
(16, 40),
(16, 41),
(16, 42);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelimages`
--

CREATE TABLE `hotelimages` (
  `image_id` varchar(255) NOT NULL,
  `hotel_id` bigint(20) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotelimages`
--

INSERT INTO `hotelimages` (`image_id`, `hotel_id`, `image_url`, `is_primary`) VALUES
('1', 1, '/hotel_images/hotel-img01.jpg', 1),
('10', 10, '/hotel_images/hotel-img10.jpg', 1),
('11', 11, '/hotel_images/hotel-img11.jpg', 1),
('12', 12, '/hotel_images/hotel-img12.jpg', 1),
('13', 13, '/hotel_images/hotel-img13.jpg', 1),
('14', 14, '/hotel_images/hotel-img14.jpg', 1),
('15', 15, '/hotel_images/hotel-img15.jpg', 1),
('16', 16, '/hotel_images/hotel-img16.jpg', 1),
('2', 2, '/hotel_images/hotel-img02.jpg', 1),
('3', 3, '/hotel_images/hotel-img03.jpg', 1),
('4', 4, '/hotel_images/hotel-img04.jpg', 1),
('5', 5, '/hotel_images/hotel-img05.jpg', 1),
('6', 6, '/hotel_images/hotel-img06.jpg', 1),
('7', 7, '/hotel_images/hotel-img07.jpg', 1),
('8', 8, '/hotel_images/hotel-img08.jpg', 1),
('9', 9, '/hotel_images/hotel-img09.jpg', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotels`
--

CREATE TABLE `hotels` (
  `hotel_id` bigint(20) NOT NULL,
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
  `price_per_night` double DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotels`
--

INSERT INTO `hotels` (`hotel_id`, `manager_id`, `name`, `address`, `city`, `country`, `latitude`, `longitude`, `description`, `star_rating`, `check_in_time`, `check_out_time`, `cancellation_policy`, `status`, `created_at`, `capacity`, `price_per_night`, `featured`) VALUES
(1, 1, 'The Great London Hotel', '123 Oxford Street, London', 'anan', 'United Kingdom', 51.5074, -0.1278, 'Experience the heart of London in style...', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours.', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(2, 2, 'Royal Palace London', '10 Downing Street, London', 'London', 'United Kingdom', 51.5034, -0.1276, 'Stay like royalty...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(3, 3, 'London River Hotel', '567 River Road, London', 'London', 'United Kingdom', 51.509, -0.118, 'Wake up to stunning river views...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(4, 4, 'Skyline Tower London', '321 Skyline Avenue, London', 'London', 'United Kingdom', 51.515, -0.141, 'Reach new heights...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(5, 5, 'Bali Beach Resort', '456 Sunset Road, Bali', 'Bali', 'Indonesia', -8.4095, 115.1889, 'Enjoy tropical paradise...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(6, 6, 'Tropical Paradise Bali', '789 Island Street, Bali', 'Bali', 'Indonesia', -8.414, 115.195, 'Dive into luxury...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(7, 7, 'Golden Sands Resort', '999 Ocean Drive, Bali', 'Bali', 'Indonesia', -8.42, 115.2, 'Relax on golden sands...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(8, 8, 'Island Escape Hotel', '222 Paradise Lane, Bali', 'Bali', 'Indonesia', -8.43, 115.21, 'A secluded retreat...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(9, 9, 'Tokyo Sky Hotel', '789 Shibuya, Tokyo', 'Tokyo', 'Japan', 35.658, 139.7016, 'Enjoy panoramic city views...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(10, 10, 'Shinjuku Business Hotel', '45 Business Street, Tokyo', 'Tokyo', 'Japan', 35.6938, 139.7034, 'Perfect for business travelers...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(11, 11, 'Cherry Blossom Resort', '22 Sakura Avenue, Tokyo', 'Tokyo', 'Japan', 35.6895, 139.6917, 'Experience traditional Japanese hospitality...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(12, 12, 'Luxury Tower Tokyo', '567 Ginza Road, Tokyo', 'Tokyoaaa', 'Japan', 0, 0, 'Enjoy penthouse suites...', 5, '14:00:00', '12:00:00', 'Free cancellation...', NULL, '2025-04-06 13:58:50', 0, 0, 0),
(13, 13, 'Eiffel Grand Hotel', '123 Champs Elysees, Paris', 'Paris', 'France', 48.8566, 2.3522, 'Stay steps away from the Eiffel Tower...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(14, 14, 'Louvre Palace Hotel', '89 Louvre Street, Paris', 'Paris', 'France', 48.8606, 2.3376, 'Discover art and culture...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
(15, 15, 'Seine River Hotel', '456 Riverfront, Paris', 'Paris', 'France', 48.857, 2.354, 'Enjoy riverside dining...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-07 13:25:25', NULL, NULL, 0),
(16, 16, 'Parisian Royal Suites', '777 Palace Road, Paris', 'Paris', 'France', 48.8582, 2.35, 'Royal treatment...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-07 13:25:25', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `managers`
--

CREATE TABLE `managers` (
  `manager_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `hotel_id` varchar(255) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `managers`
--

INSERT INTO `managers` (`manager_id`, `user_id`, `hotel_id`, `assigned_at`) VALUES
(1, 16, '1', '2025-04-08 20:32:15'),
(2, 17, '2', '2025-04-08 14:40:26'),
(3, 18, '3', '2025-04-08 14:40:26'),
(4, 19, '4', '2025-04-08 14:40:26'),
(5, 20, '5', '2025-04-08 14:40:26'),
(6, 21, '6', '2025-04-08 14:40:26'),
(7, 22, '7', '2025-04-08 14:40:26'),
(8, 23, '8', '2025-04-08 14:40:26'),
(9, 24, '9', '2025-04-08 20:32:15'),
(10, 25, '10', '2025-04-08 20:32:15'),
(11, 26, '11', '2025-04-08 20:32:15'),
(12, 27, '12', '2025-04-08 20:32:15'),
(13, 28, '13', '2025-04-08 20:32:15'),
(14, 29, '14', '2025-04-08 20:35:48'),
(15, 30, '15', '2025-04-08 20:35:48'),
(16, 31, '16', '2025-04-08 20:36:11');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) NOT NULL,
  `booking_id` bigint(20) DEFAULT NULL,
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
  `promotion_id` bigint(20) NOT NULL,
  `hotel_id` bigint(20) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
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
  `review_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `hotel_id` bigint(20) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roomamenities`
--

CREATE TABLE `roomamenities` (
  `amenity_id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `roomamenities`
--

INSERT INTO `roomamenities` (`amenity_id`, `name`) VALUES
(43, 'Sea View'),
(44, 'Balcony'),
(45, 'Mini Bar'),
(46, 'King Size Bed'),
(47, 'Air Conditioning'),
(48, 'Sea View'),
(49, 'Balcony'),
(50, 'Mini Bar'),
(51, 'King Size Bed'),
(52, 'Air Conditioning');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roomamenityjunction`
--

CREATE TABLE `roomamenityjunction` (
  `room_id` bigint(20) NOT NULL,
  `amenity_id` bigint(20) NOT NULL,
  `is_primary` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `roomamenityjunction`
--

INSERT INTO `roomamenityjunction` (`room_id`, `amenity_id`, `is_primary`) VALUES
(1, 43, b'1'),
(1, 44, b'0'),
(1, 45, b'1'),
(2, 46, b'1'),
(2, 47, b'1'),
(2, 48, b'1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roomimages`
--

CREATE TABLE `roomimages` (
  `image_id` bigint(20) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `roomimages`
--

INSERT INTO `roomimages` (`image_id`, `room_id`, `image_url`, `is_primary`) VALUES
(1, 1, '/public/room_images/room-img01.jpg', 1),
(2, 1, '/assets/room_images/room-img02.jpg', 0),
(3, 2, '/assets/room_images/room-img03.jpg', 1),
(4, 2, '/assets/room_images/room-img04.jpg', 0),
(5, 1, '/assets/room_images/room-img01.jpg', 1),
(6, 1, '/assets/room_images/room-img02.jpg', 0),
(7, 2, '/assets/room_images/room-img03.jpg', 1),
(8, 2, '/assets/room_images/room-img04.jpg', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `rooms`
--

CREATE TABLE `rooms` (
  `room_id` bigint(20) NOT NULL,
  `hotel_id` bigint(20) NOT NULL,
  `room_type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `capacity` int(11) NOT NULL,
  `total_rooms` int(11) NOT NULL,
  `size` varchar(20) DEFAULT NULL,
  `bed_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `room_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `rooms`
--

INSERT INTO `rooms` (`room_id`, `hotel_id`, `room_type`, `description`, `price_per_night`, `capacity`, `total_rooms`, `size`, `bed_type`, `created_at`, `image_id`, `name`, `room_size`) VALUES
(1, 1, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 150.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:38:04', NULL, 'Deluxe Sea View', 35),
(2, 2, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:38:04', NULL, 'Standard Comfort', 25),
(3, 1, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 150.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:40:01', NULL, 'Deluxe Sea View', 35),
(4, 2, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:01', NULL, 'Standard Comfort', 25),
(7, 1, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 150.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:40:20', NULL, 'Deluxe Sea View', 35),
(8, 2, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', NULL, 'Standard Comfort', 25);

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
(10, 'sezo', 'user', 'sezo@sezo.com', '123456', 'Sezai', 'Araplarlı', '05313313131', '2025-04-02 10:59:15', '2025-04-07 19:16:48', 1),
(11, 'dede', 'user', 'dede@dede.com', '123456', 'dede', 'dede', '05313313131', '2025-04-03 17:57:28', '2025-04-03 17:57:28', 0),
(12, 'admin', 'admin', 'admin@admin.com', '1234567', 'admin', 'admin', '05467897895', '2025-04-03 18:54:48', '2025-04-05 12:07:35', 0),
(13, 'deneme', 'user', 'esad.emir34@stu.khas.edu.tr', '123456', 'emir', 'şahin', '05512024369', '2025-04-05 10:50:27', '2025-04-05 10:50:27', 0),
(16, 'manager_royal_palace', 'manager', 'royal.manager@example.com', 'password', 'Royalaaaa', 'Manager', '0000000001', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(17, 'manager_london_river', 'manager', 'london.manager@example.com', 'password', 'London', 'Manager', '0000000002', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(18, 'manager_bali_beach', 'manager', 'bali.manager@example.com', 'password', 'Bali', 'Manager', '0000000003', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(19, 'manager_tropical_paradise', 'manager', 'tropical.manager@example.com', 'password', 'Tropical', 'Manager', '0000000004', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(20, 'manager_golden_sands', 'manager', 'golden.manager@example.com', 'password', 'Golden', 'Manager', '0000000005', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(21, 'manager_tokyo_sky', 'manager', 'tokyo.manager@example.com', 'password', 'Tokyo', 'Manager', '0000000006', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(22, 'manager_shinjuku_business', 'manager', 'shinjuku.manager@example.com', 'password', 'Shinjuku', 'Manager', '0000000007', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(23, 'manager_cherry_blossom', 'manager', 'cherry.manager@example.com', 'password', 'Cherry', 'Manager', '0000000008', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(24, 'manager_luxury_tower', 'manager', 'luxury.manager@example.com', 'password', 'Luxury', 'Manager', '0000000009', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(25, 'manager_eiffel_grand', 'manager', 'eiffel.manager@example.com', 'password', 'Eiffel', 'Manager', '0000000010', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
(26, 'manager_volcano', 'manager', 'volcano.manager@example.com', 'password', 'Volcano', 'Manager', '0000000011', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0),
(27, 'manager_river', 'manager', 'river.manager@example.com', 'password', 'River', 'Manager', '0000000012', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0),
(28, 'manager_forest', 'manager', 'forest.manager@example.com', 'password', 'Forest', 'Manager', '0000000013', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0),
(29, 'manager_sunset', 'manager', 'sunset.manager@example.com', 'password', 'Sunset', 'Manager', '0000000014', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0),
(30, 'manager_mountain', 'manager', 'mountain.manager@example.com', 'password', 'Mountain', 'Manager', '0000000015', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0),
(31, 'manager_ocean', 'manager', 'ocean.manager@example.com', 'password', 'Ocean', 'Manager', '0000000016', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0);

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
-- Tablo için AUTO_INCREMENT değeri `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `hotelamenities`
--
ALTER TABLE `hotelamenities`
  MODIFY `amenity_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Tablo için AUTO_INCREMENT değeri `hotels`
--
ALTER TABLE `hotels`
  MODIFY `hotel_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Tablo için AUTO_INCREMENT değeri `managers`
--
ALTER TABLE `managers`
  MODIFY `manager_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Tablo için AUTO_INCREMENT değeri `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `promotions`
--
ALTER TABLE `promotions`
  MODIFY `promotion_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `roomamenities`
--
ALTER TABLE `roomamenities`
  MODIFY `amenity_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Tablo için AUTO_INCREMENT değeri `roomimages`
--
ALTER TABLE `roomimages`
  MODIFY `image_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  ADD CONSTRAINT `fk_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Tablo kısıtlamaları `hotelamenityjunction`
--
ALTER TABLE `hotelamenityjunction`
  ADD CONSTRAINT `fk_hotelamenityjunction_amenity` FOREIGN KEY (`amenity_id`) REFERENCES `hotelamenities` (`amenity_id`),
  ADD CONSTRAINT `fk_hotelamenityjunction_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`);

--
-- Tablo kısıtlamaları `hotelimages`
--
ALTER TABLE `hotelimages`
  ADD CONSTRAINT `fk_hotelimages_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`);

--
-- Tablo kısıtlamaları `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `fk_hotels_manager` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`manager_id`);

--
-- Tablo kısıtlamaları `managers`
--
ALTER TABLE `managers`
  ADD CONSTRAINT `fk_managers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`);

--
-- Tablo kısıtlamaları `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `fk_promotions_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`),
  ADD CONSTRAINT `fk_promotions_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`);

--
-- Tablo kısıtlamaları `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`),
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Tablo kısıtlamaları `roomamenityjunction`
--
ALTER TABLE `roomamenityjunction`
  ADD CONSTRAINT `fk_roomamenityjunction_amenity` FOREIGN KEY (`amenity_id`) REFERENCES `roomamenities` (`amenity_id`);

--
-- Tablo kısıtlamaları `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_rooms_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
