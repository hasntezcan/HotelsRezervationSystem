-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 11 Nis 2025, 20:03:09
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.1.25

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
  `booking_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `num_guests` int(11) NOT NULL CHECK (`num_guests` > 0),
  `price_per_night` decimal(38,2) NOT NULL,
  `total_price` decimal(38,2) NOT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `bookings`
--

INSERT INTO `bookings` (`booking_id`, `user_id`, `room_id`, `check_in_date`, `check_out_date`, `quantity`, `num_guests`, `price_per_night`, `total_price`, `status`, `created_at`) VALUES
(1, 1, 1, '2025-04-15', '2025-04-17', 1, 2, 100.00, 210.00, 'confirmed', '2025-04-10 10:22:07'),
(2, 2, 1, '2025-04-15', '2025-04-17', 1, 1, 100.00, 200.00, 'confirmed', '2025-04-10 10:22:07'),
(3, 3, 1, '2025-04-15', '2025-04-17', 1, 3, 100.00, 230.00, 'confirmed', '2025-04-10 10:22:07'),
(4, 4, 1, '2025-04-15', '2025-04-17', 1, 2, 100.00, 210.00, 'confirmed', '2025-04-10 10:22:07'),
(9, 2, 1, '2025-04-18', '2025-04-22', 1, 3, 150.00, 1510.00, 'pending', '2025-04-10 14:04:45'),
(10, 1, 20, '2025-04-11', '2025-04-12', 1, 1, 100.00, 110.00, 'confirmed', '2025-04-11 10:33:47'),
(11, 1, 20, '2025-04-30', '2025-05-01', 1, 1, 100.00, 110.00, 'rejected', '2025-04-11 13:03:17'),
(12, 31, 20, '2025-04-12', '2025-04-13', 1, 2, 100.00, 210.00, 'pending', '2025-04-11 17:01:16'),
(13, 31, 16, '2025-04-12', '2025-04-13', 1, 2, 100.00, 210.00, 'pending', '2025-04-11 17:02:17');

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
(5, 'Private Beach', ''),
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
(24, 'Business Center', '');

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
(1, 7),
(2, 1),
(2, 7),
(2, 8),
(2, 18),
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
(8, 14),
(8, 20),
(9, 11),
(9, 20),
(10, 1),
(10, 15),
(11, 5),
(11, 6),
(12, 1),
(12, 2),
(12, 14),
(13, 17),
(13, 20),
(14, 8),
(14, 11),
(14, 13),
(15, 1),
(16, 1),
(16, 2),
(16, 15);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotelimages`
--

CREATE TABLE `hotelimages` (
  `image_id` bigint(255) NOT NULL,
  `hotel_id` bigint(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotelimages`
--

INSERT INTO `hotelimages` (`image_id`, `hotel_id`, `image_url`, `is_primary`) VALUES
(1, 1, '/hotel_images/hotel-img01.jpg', 1),
(2, 1, '/hotel_images/hotel-img02.jpg', 0),
(3, 1, '/hotel_images/hotel-img03.jpg', 0),
(4, 1, '/hotel_images/hotel-img04.jpg', 0),
(5, 1, '/hotel_images/hotel-img05.jpg', 0),
(6, 2, '/hotel_images/hotel-img06.jpg', 1),
(7, 2, '/hotel_images/hotel-img07.jpg', 0),
(8, 2, '/hotel_images/hotel-img08.jpg', 0),
(9, 2, '/hotel_images/hotel-img09.jpg', 0),
(10, 2, '/hotel_images/hotel-img10.jpg', 0),
(11, 3, '/hotel_images/hotel-img11.jpg', 1),
(12, 3, '/hotel_images/hotel-img12.jpg', 0),
(13, 3, '/hotel_images/hotel-img13.jpg', 0),
(14, 3, '/hotel_images/hotel-img14.jpg', 0),
(15, 3, '/hotel_images/hotel-img15.jpg', 0),
(16, 4, '/hotel_images/hotel-img16.jpg', 0),
(17, 4, '/hotel_images/hotel-img17.jpg', 1),
(18, 4, '/hotel_images/hotel-img18.jpg', 0),
(19, 4, '/hotel_images/hotel-img19.jpg', 0),
(20, 5, '/hotel_images/hotel-img20.jpg', 0),
(21, 5, '/hotel_images/hotel-img21.jpg', 1),
(22, 5, '/hotel_images/hotel-img22.jpg', 0),
(23, 5, '/hotel_images/hotel-img23.jpg', 0),
(24, 5, '/hotel_images/hotel-img24.jpg', 0),
(25, 5, '/hotel_images/hotel-img25.jpg', 0),
(26, 6, '/hotel_images/hotel-img26.jpg', 1),
(27, 6, '/hotel_images/hotel-img27.jpg', 0),
(28, 6, '/hotel_images/hotel-img28.jpg', 0),
(29, 6, '/hotel_images/hotel-img29.jpg', 0),
(30, 6, '/hotel_images/hotel-img30.jpg', 0),
(31, 7, '/hotel_images/hotel-img31.jpg', 1),
(32, 7, '/hotel_images/hotel-img32.jpg', 0),
(33, 7, '/hotel_images/hotel-img33.jpg', 0),
(34, 7, '/hotel_images/hotel-img34.jpg', 0),
(35, 7, '/hotel_images/hotel-img35.jpg', 0),
(36, 8, '/hotel_images/hotel-img36.jpg', 1),
(37, 8, '/hotel_images/hotel-img37.jpg', 0),
(38, 8, '/hotel_images/hotel-img38.jpg', 0),
(39, 8, '/hotel_images/hotel-img39.jpg', 0),
(40, 8, '/hotel_images/hotel-img40.jpg', 0),
(41, 9, '/hotel_images/hotel-img41.jpg', 1),
(42, 9, '/hotel_images/hotel-img42.jpg', 0),
(43, 9, '/hotel_images/hotel-img43.jpg', 0),
(44, 9, '/hotel_images/hotel-img44.jpg', 0),
(45, 9, '/hotel_images/hotel-img45.jpg', 0),
(46, 10, '/hotel_images/hotel-img46.jpg', 1),
(47, 10, '/hotel_images/hotel-img47.jpg', 0),
(48, 10, '/hotel_images/hotel-img48.jpg', 0),
(49, 10, '/hotel_images/hotel-img49.jpg', 0),
(50, 10, '/hotel_images/hotel-img50.jpg', 0),
(51, 11, '/hotel_images/hotel-img51.jpg', 1),
(52, 11, '/hotel_images/hotel-img52.jpg', 0),
(53, 11, '/hotel_images/hotel-img53.jpg', 0),
(54, 11, '/hotel_images/hotel-img54.jpg', 0),
(55, 11, '/hotel_images/hotel-img55.jpg', 0),
(56, 12, '/hotel_images/hotel-img56.jpg', 1),
(57, 12, '/hotel_images/hotel-img57.jpg', 0),
(58, 12, '/hotel_images/hotel-img58.jpg', 0),
(59, 12, '/hotel_images/hotel-img59.jpg', 0),
(60, 12, '/hotel_images/hotel-img60.jpg', 0),
(61, 13, '/hotel_images/hotel-img61.jpg', 1),
(62, 13, '/hotel_images/hotel-img62.jpg', 0),
(63, 13, '/hotel_images/hotel-img63.jpg', 0),
(64, 13, '/hotel_images/hotel-img64.jpg', 0),
(65, 13, '/hotel_images/hotel-img65.jpg', 0),
(66, 14, '/hotel_images/hotel-img66.jpg', 1),
(67, 14, '/hotel_images/hotel-img67.jpg', 0),
(68, 14, '/hotel_images/hotel-img68.jpg', 0),
(69, 14, '/hotel_images/hotel-img69.jpg', 0),
(70, 14, '/hotel_images/hotel-img70.jpg', 0),
(71, 15, '/hotel_images/hotel-img71.jpg', 1),
(72, 15, '/hotel_images/hotel-img72.jpg', 0),
(73, 15, '/hotel_images/hotel-img73.jpg', 0),
(74, 15, '/hotel_images/hotel-img74.jpg', 0),
(75, 16, '/hotel_images/hotel-img75.jpg', 1),
(76, 16, '/hotel_images/hotel-img76.jpg', 0),
(77, 16, '/hotel_images/hotel-img77.jpg', 0),
(78, 16, '/hotel_images/hotel-img78.jpg', 0),
(79, 16, '/hotel_images/hotel-img79.jpg', 0),
(80, 16, '/hotel_images/hotel-img80.jpg', 0);

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
(1, 1, 'The Great London Hotel', '123 Oxford Street, London', 'London', 'United Kingdom', 51.5074, -0.1278, 'Experience the heart of London in style...', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours.', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0),
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
(12, 12, 'Luxury Tower Tokyo', '567 Ginza Road, Tokyo', 'Tokyo', 'Japan', 0, 0, 'Enjoy penthouse suites...', 5, '14:00:00', '12:00:00', 'Free cancellation...', NULL, '2025-04-06 13:58:50', 0, 0, 0),
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
  `hotel_id` bigint(20) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `managers`
--

INSERT INTO `managers` (`manager_id`, `user_id`, `hotel_id`, `assigned_at`) VALUES
(1, 16, 1, '2025-04-08 20:32:15'),
(2, 17, 2, '2025-04-08 14:40:26'),
(3, 18, 3, '2025-04-08 14:40:26'),
(4, 19, 4, '2025-04-08 14:40:26'),
(5, 20, 5, '2025-04-08 14:40:26'),
(6, 21, 6, '2025-04-08 14:40:26'),
(7, 22, 7, '2025-04-08 14:40:26'),
(8, 23, 8, '2025-04-08 14:40:26'),
(9, 24, 9, '2025-04-08 20:32:15'),
(10, 25, 10, '2025-04-08 20:32:15'),
(11, 26, 11, '2025-04-08 20:32:15'),
(12, 27, 12, '2025-04-08 20:32:15'),
(13, 28, 13, '2025-04-08 20:32:15'),
(14, 29, 14, '2025-04-08 20:35:48'),
(15, 30, 15, '2025-04-08 20:35:48'),
(16, 31, 16, '2025-04-08 20:36:11');

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

--
-- Tablo döküm verisi `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `hotel_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 1, 5, 'Amazing hotel with top-notch service!', '2025-04-09 03:21:49'),
(2, 2, 1, 4, 'Very clean and comfortable. Would recommend.', '2025-04-05 07:21:49'),
(3, 3, 1, 3, 'Decent stay but the breakfast could be better.', '2025-04-07 07:21:49'),
(4, 1, 2, 4, 'Great location near the city center.', '2025-04-10 07:21:49'),
(5, 2, 2, 5, 'The view from the room was breathtaking!', '2025-04-10 07:21:49'),
(6, 3, 2, 4, 'Nice rooms and helpful staff.', '2025-04-10 07:21:49'),
(7, 1, 3, 2, 'Not what I expected. Room was a bit small.', '2025-04-10 07:21:49'),
(8, 2, 3, 3, 'Average experience. AC wasn’t working.', '2025-04-10 07:21:49'),
(9, 3, 3, 4, 'Affordable and clean. Good value overall.', '2025-04-10 07:21:49');

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
(2, 1, '/public/room_images/room-img02.jpg', 0),
(3, 2, '/public/room_images/room-img03.jpg', 1),
(4, 2, '/public/room_images/room-img04.jpg', 0),
(5, 1, '/public/room_images/room-img01.jpg', 1),
(6, 1, '/public/room_images/room-img03.jpg', 0),
(7, 2, '/public/room_images/room-img03.jpg', 1),
(8, 2, '/public/room_images/room-img04.jpg', 0),
(9, 5, '/public/room_images/room-img03.jpg', 1),
(10, 6, '/public/room_images/room-img03.jpg', 0),
(11, 3, '/public/room_images/room-img01.jpg', 1),
(12, 4, '/public/room_images/room-img03.jpg', 1),
(13, 7, '/public/room_images/room-img01.jpg', 1),
(14, 8, '/public/room_images/room-img01.jpg', 1),
(15, 9, '/public/room_images/room-img01.jpg', 1),
(16, 10, '/public/room_images/room-img01.jpg', 1),
(17, 11, '/public/room_images/room-img03.jpg', 1),
(18, 12, '/public/room_images/room-img01.jpg', 1),
(19, 13, '/public/room_images/room-img03.jpg', 1),
(20, 14, '/public/room_images/room-img03.jpg', 1),
(21, 15, '/public/room_images/room-img03.jpg', 1),
(22, 16, '/public/room_images/room-img03.jpg', 1),
(23, 17, '/public/room_images/room-img01.jpg', 1),
(24, 17, '/public/room_images/room-img01.jpg', 1),
(25, 18, '/public/room_images/room-img03.jpg', 1),
(26, 19, '/public/room_images/room-img01.jpg', 1),
(27, 20, '/public/room_images/room-img01.jpg', 1),
(28, 21, '/public/room_images/room-img01.jpg', 1),
(29, 22, '/public/room_images/room-img02.jpg', 1),
(30, 23, '/public/room_images/room-img02.jpg', 1),
(31, 24, '/public/room_images/room-img02.jpg', 1);

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
  `name` varchar(100) NOT NULL,
  `room_size` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `rooms`
--

INSERT INTO `rooms` (`room_id`, `hotel_id`, `room_type`, `description`, `price_per_night`, `capacity`, `total_rooms`, `size`, `bed_type`, `created_at`, `name`, `room_size`, `image_id`) VALUES
(1, 1, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 150.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:38:04', 'Deluxe Sea View', 35, NULL),
(2, 1, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:38:04', 'Standard Comfort', 25, NULL),
(3, 2, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 150.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:40:01', 'Deluxe Sea View', 35, NULL),
(4, 2, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:01', 'Standard Comfort', 25, NULL),
(5, 3, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 150.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:40:20', 'Deluxe Sea View', 35, NULL),
(6, 3, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(7, 4, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(8, 4, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(9, 5, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(10, 5, 'Family Room', 'Comfortable room for your family peace', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(11, 6, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(12, 7, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(13, 8, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(14, 9, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(15, 10, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(16, 11, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(17, 12, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(18, 14, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(19, 15, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(20, 16, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(21, 9, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(22, 6, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(23, 7, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(24, 8, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL);

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
(1, 'iamsahinemir', 'user', 'esad.emir34@gmail.com', '123456', 'emir esad', 'şahin', '05438813007', '2025-03-31 17:36:25', '2025-04-10 06:49:55', 1),
(2, 'sezo', 'user', 'sezo@sezo.com', '123456', 'Sezai', 'Araplarlı', '05313313131', '2025-04-02 10:59:15', '2025-04-10 06:49:57', 1),
(3, 'dede', 'user', 'dede@dede.com', '123456', 'dede', 'dede', '05313313131', '2025-04-03 17:57:28', '2025-04-10 06:50:00', 0),
(4, 'admin', 'admin', 'admin@admin.com', '1234567', 'admin', 'admin', '05467897895', '2025-04-03 18:54:48', '2025-04-10 06:50:02', 0),
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
  MODIFY `booking_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
-- Tablo için AUTO_INCREMENT değeri `hotelimages`
--
ALTER TABLE `hotelimages`
  MODIFY `image_id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

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
  MODIFY `review_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `roomamenities`
--
ALTER TABLE `roomamenities`
  MODIFY `amenity_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Tablo için AUTO_INCREMENT değeri `roomimages`
--
ALTER TABLE `roomimages`
  MODIFY `image_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Tablo için AUTO_INCREMENT değeri `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  ADD CONSTRAINT `fk_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bookings_user_cascade` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `FK6m61o9a1cc0ofy4tu2yvvjhn0` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  ADD CONSTRAINT `fk_roomamenityjunction_amenity` FOREIGN KEY (`amenity_id`) REFERENCES `roomamenities` (`amenity_id`);

--
-- Tablo kısıtlamaları `roomimages`
--
ALTER TABLE `roomimages`
  ADD CONSTRAINT `FK9mcck8d7c05lsuuospj0n0hkv` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`);

--
-- Tablo kısıtlamaları `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_rooms_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
