-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 10 May 2025, 08:53:54
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
-- Tablo için tablo yapısı `amenity_translations`
--

CREATE TABLE `amenity_translations` (
  `translation_id` bigint(20) NOT NULL,
  `amenity_id` bigint(20) NOT NULL,
  `language_code` varchar(5) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `amenity_translations`
--

INSERT INTO `amenity_translations` (`translation_id`, `amenity_id`, `language_code`, `name`) VALUES
(1, 1, 'en', 'Free Wi-Fi'),
(2, 1, 'tr', 'Ücretsiz Wi-Fi'),
(3, 2, 'en', 'Breakfast Included'),
(4, 2, 'tr', 'Kahvaltı Dahil'),
(5, 3, 'en', 'Swimming Pool'),
(6, 3, 'tr', 'Yüzme Havuzu'),
(7, 4, 'en', 'Gym'),
(8, 4, 'tr', 'Spor Salonu'),
(9, 5, 'en', 'Private Beach'),
(10, 5, 'tr', 'Özel Plaj'),
(11, 6, 'en', 'Bar'),
(12, 6, 'tr', 'Bar'),
(13, 7, 'en', 'City View'),
(14, 7, 'tr', 'Şehir Manzarası'),
(15, 8, 'en', 'Free Parking'),
(16, 8, 'tr', 'Ücretsiz Otopark'),
(17, 9, 'en', 'Riverside View'),
(18, 9, 'tr', 'Nehir Manzarası'),
(19, 10, 'en', 'Restaurant'),
(20, 10, 'tr', 'Restoran'),
(21, 11, 'en', 'Skyline View'),
(22, 11, 'tr', 'Skyline Manzarası'),
(23, 12, 'en', 'Luxury Suites'),
(24, 12, 'tr', 'Lüks Süitler'),
(25, 13, 'en', 'Helipad'),
(26, 13, 'tr', 'Helikopter Pisti'),
(27, 14, 'en', 'Beachfront'),
(28, 14, 'tr', 'Deniz Kenarı'),
(29, 15, 'en', 'Private Pool'),
(30, 15, 'tr', 'Özel Havuz'),
(31, 16, 'en', 'Beach View'),
(32, 16, 'tr', 'Plaj Manzarası'),
(33, 17, 'en', 'Luxury Spa'),
(34, 17, 'tr', 'Lüks Spa'),
(35, 18, 'en', 'Sunset View'),
(36, 18, 'tr', 'Gün Batımı Manzarası'),
(37, 19, 'en', 'Cocktail Bar'),
(38, 19, 'tr', 'Kokteyl Barı'),
(39, 20, 'en', 'Massage Therapy'),
(40, 20, 'tr', 'Masaj Terapisi'),
(41, 21, 'en', 'Private Beach'),
(42, 21, 'tr', 'Özel Plaj'),
(43, 22, 'en', 'Infinity Pool'),
(44, 22, 'tr', 'Sonsuzluk Havuzu'),
(45, 23, 'en', 'Scuba Diving'),
(46, 23, 'tr', 'Dalgıçlık'),
(47, 24, 'en', 'Business Center'),
(48, 24, 'tr', 'İş Merkezi');

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
(1, 1, 1, '2025-04-24', '2025-04-26', 1, 2, 100.00, 210.00, 'confirmed', '2025-04-10 10:22:07'),
(2, 2, 1, '2025-04-24', '2025-04-26', 1, 1, 100.00, 200.00, 'confirmed', '2025-04-10 10:22:07'),
(3, 3, 1, '2025-04-24', '2025-04-26', 1, 3, 100.00, 230.00, 'confirmed', '2025-04-10 10:22:07'),
(4, 4, 1, '2025-04-24', '2025-04-26', 1, 2, 100.00, 210.00, 'confirmed', '2025-04-10 10:22:07'),
(13, 31, 16, '2025-04-12', '2025-04-13', 1, 2, 100.00, 210.00, 'pending', '2025-04-11 17:02:17'),
(15, 2, 1, '2025-03-05', '2025-04-04', 1, 1, 160.00, 330.00, 'pending', '2025-04-11 20:10:37'),
(16, 2, 1, '2025-04-24', '2025-04-26', 1, 1, 160.00, 330.00, 'pending', '2025-04-21 08:38:50');

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
(1, 5),
(1, 7),
(1, 8),
(1, 9),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 23),
(1, 24),
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
(28, 1),
(28, 2),
(28, 3),
(28, 6),
(28, 10),
(29, 7),
(29, 10),
(29, 11),
(29, 12),
(29, 18),
(29, 19),
(29, 24);

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
(20, 5, '/hotel_images/hotel-img21.jpg', 0),
(21, 5, '/hotel_images/hotel-img20.jpg', 1),
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
(81, 28, '/hotel_images/1746856332675.jpg', 1),
(82, 29, '/hotel_images/1746856775713.jpg', 1),
(83, 29, '/hotel_images/1746856775743.jpg', 0),
(84, 29, '/hotel_images/1746856775768.jpg', 0),
(85, 29, '/hotel_images/1746856775799.png', 0);

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
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `amenities` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotels`
--

INSERT INTO `hotels` (`hotel_id`, `manager_id`, `name`, `address`, `city`, `country`, `latitude`, `longitude`, `description`, `star_rating`, `check_in_time`, `check_out_time`, `cancellation_policy`, `status`, `created_at`, `capacity`, `price_per_night`, `featured`, `amenities`) VALUES
(1, 1, 'The Great London Hotel', '123 Oxford Street, London', 'London', 'United Kingdom', 51.5074, -0.1278, 'Experience the heart of London in style...', 5, '14:00:00', '12:00:00', 'Free cancellation up to 24 hours.', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(2, 2, 'Royal Palace London', '10 Downing Street, London', 'London', 'United Kingdom', 51.5034, -0.1276, 'Stay like royalty...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(3, 3, 'London River Hotel', '567 River Road, London', 'London', 'United Kingdom', 51.509, -0.118, 'Wake up to stunning river views...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(4, 4, 'Skyline Tower London', '321 Skyline Avenue, London', 'London', 'United Kingdom', 51.515, -0.141, 'Reach new heights...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(5, 5, 'Bali Beach Resort', '456 Sunset Road, Bali', 'Bali', 'Indonesia', -8.4095, 115.1889, 'Enjoy tropical paradise...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(6, 6, 'Tropical Paradise Bali', '789 Island Street, Bali', 'Bali', 'Indonesia', -8.414, 115.195, 'Dive into luxury...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(7, 7, 'Golden Sands Resort', '999 Ocean Drive, Bali', 'Bali', 'Indonesia', -8.42, 115.2, 'Relax on golden sands...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(8, 8, 'Island Escape Hotel', '222 Paradise Lane, Bali', 'Bali', 'Indonesia', -8.43, 115.21, 'A secluded retreat...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(9, 9, 'Tokyo Sky Hotel', '789 Shibuya, Tokyo', 'Tokyo', 'Japan', 35.658, 139.7016, 'Enjoy panoramic city views...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(10, 10, 'Shinjuku Business Hotel', '45 Business Street, Tokyo', 'Tokyo', 'Japan', 35.6938, 139.7034, 'Perfect for business travelers...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(11, 11, 'Cherry Blossom Resort', '22 Sakura Avenue, Tokyo', 'Tokyo', 'Japan', 35.6895, 139.6917, 'Experience traditional Japanese hospitality...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(12, 12, 'Luxury Tower Tokyo', '567 Ginza Road, Tokyo', 'Tokyo', 'Japan', 0, 0, 'Enjoy penthouse suites...', 5, '14:00:00', '12:00:00', 'Free cancellation...', NULL, '2025-04-06 13:58:50', 0, 0, 0, NULL),
(13, 13, 'Eiffel Grand Hotel', '123 Champs Elysees, Paris', 'Paris', 'France', 48.8566, 2.3522, 'Stay steps away from the Eiffel Tower...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(14, 14, 'Louvre Palace Hotel', '89 Louvre Street, Paris', 'Paris', 'France', 48.8606, 2.3376, 'Discover art and culture...', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-06 13:58:50', NULL, NULL, 0, NULL),
(15, 15, 'Seine River Hotel', '456 Riverfront, Paris', 'Paris', 'France', 48.857, 2.354, 'Enjoy riverside dining...', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-04-07 13:25:25', NULL, NULL, 0, NULL),
(28, 21, 'Grand Cettia', 'Armutalan, 221. Sk. No:5, 48700 Marmaris/Muğla', 'Muğla', 'Türkiye', 36.84922527902371, 28.245937800741128, 'Ege\'nin incisi Marmaris\'in eşsiz mavi ve yeşilinin görsel şölenini Grand Cettia Hotel ayrıcalığıyla yaşamanın keyfine doyamayacaksınız. Her anınızın huzurlu, şehir stresinden uzak, mutlu, eğlenceli ve dopdolu geçmesi için Grand Cettia Hotel ailesi olarak siz değerli misafirlerimizi bekliyoruz.', 4, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-05-10 02:51:59', 0, 0, 0, 'Breakfast Included, Free Wi-Fi, Bar, Swimming Pool, Restaurant'),
(29, 22, 'Pera Palace Hotel', 'Meşrutiyet Caddesi, Evliya Çelebi, Tepebaşı Cd. No:52, 34430 Beyoğlu/İstanbul', 'İstanbul', 'Türkiye', 41.031221699916586, 28.973532244178347, 'Placed against a backdrop of glimmering art-nouveau beauties, Pera Palace Hotel, Istanbul is a historic luxury hotel in the heart of Turkey’s best-looking city. A stylish retreat with more than a century-old past, we are perfectly positioned for exploring all of the views.', 5, '14:00:00', '12:00:00', 'Free cancellation...', 'approved', '2025-05-10 02:59:35', 0, 0, 0, 'Cocktail Bar, Sunset View, Business Center, Luxury Suites, Restaurant, City View, Skyline View');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `managers`
--

CREATE TABLE `managers` (
  `manager_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `hotel_id` bigint(20) DEFAULT NULL,
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
(16, 31, 16, '2025-04-08 20:36:11'),
(20, 43, NULL, '2025-05-08 09:15:32'),
(21, 45, 28, '2025-05-10 02:05:43'),
(22, 46, 29, '2025-05-10 02:55:53');

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
(9, 3, 3, 4, 'Affordable and clean. Good value overall.', '2025-04-10 07:21:49'),
(10, 1, 1, 3, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:31:04'),
(11, 44, 1, 3, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:31:04'),
(12, 3, 1, 4, 'A true hidden gem — everything from the breakfast to the sunset view was just magical.', '2025-05-10 06:31:04'),
(13, 47, 1, 4, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:31:04'),
(14, 2, 1, 5, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:31:04'),
(15, 46, 1, 5, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:31:04'),
(16, 47, 2, 5, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:31:04'),
(17, 46, 2, 3, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:31:04'),
(18, 44, 2, 3, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:31:04'),
(19, 2, 2, 3, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:31:04'),
(20, 3, 2, 3, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:31:04'),
(21, 1, 2, 5, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:31:04'),
(22, 2, 3, 3, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:31:58'),
(23, 1, 3, 4, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:31:58'),
(24, 44, 3, 4, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:31:58'),
(25, 3, 3, 3, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:31:58'),
(26, 47, 3, 4, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:31:58'),
(27, 46, 3, 3, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:31:58'),
(28, 44, 4, 5, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:31:58'),
(29, 1, 4, 3, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:31:58'),
(30, 46, 4, 3, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:31:58'),
(31, 47, 4, 5, 'A true hidden gem — everything from the breakfast to the sunset view was just magical.', '2025-05-10 06:31:58'),
(32, 2, 4, 5, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:31:58'),
(33, 3, 4, 5, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:31:58'),
(34, 44, 7, 3, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:36:19'),
(35, 46, 7, 3, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:36:20'),
(36, 2, 7, 4, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:36:20'),
(37, 47, 7, 4, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:36:20'),
(38, 3, 7, 4, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:36:20'),
(39, 1, 7, 4, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:36:20'),
(40, 46, 8, 4, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:36:20'),
(41, 47, 8, 4, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:36:20'),
(42, 44, 8, 4, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:36:20'),
(43, 2, 8, 4, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:36:20'),
(44, 3, 8, 4, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:36:20'),
(45, 1, 8, 5, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:36:20'),
(46, 47, 9, 3, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:38:00'),
(47, 2, 9, 3, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:38:00'),
(48, 3, 9, 2, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:38:00'),
(49, 44, 9, 3, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:38:00'),
(50, 1, 9, 3, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:38:00'),
(51, 46, 9, 2, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:38:00'),
(52, 3, 10, 3, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:38:00'),
(53, 44, 10, 3, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:38:00'),
(54, 1, 10, 3, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:38:00'),
(55, 2, 10, 3, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:38:00'),
(56, 46, 10, 3, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:38:00'),
(57, 47, 10, 4, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:38:00'),
(58, 3, 11, 4, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:39:39'),
(59, 2, 11, 4, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:39:39'),
(60, 44, 11, 5, 'A true hidden gem — everything from the breakfast to the sunset view was just magical.', '2025-05-10 06:39:39'),
(61, 46, 11, 5, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:39:39'),
(62, 1, 11, 4, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:39:39'),
(63, 47, 11, 4, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:39:39'),
(64, 3, 12, 2, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:39:39'),
(65, 46, 12, 3, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:39:39'),
(66, 2, 12, 2, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:39:39'),
(67, 47, 12, 2, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:39:39'),
(68, 44, 12, 2, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:39:39'),
(69, 1, 12, 2, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:39:39'),
(70, 1, 13, 2, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:41:16'),
(71, 44, 13, 2, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:41:16'),
(72, 3, 13, 3, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:41:16'),
(73, 47, 13, 2, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:41:16'),
(74, 2, 13, 2, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:41:16'),
(75, 46, 13, 2, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:41:16'),
(76, 2, 14, 3, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:41:16'),
(77, 3, 14, 3, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:41:16'),
(78, 1, 14, 4, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:41:16'),
(79, 46, 14, 3, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:41:16'),
(80, 47, 14, 4, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:41:16'),
(81, 44, 14, 3, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:41:16'),
(82, 46, 15, 4, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:41:16'),
(83, 1, 15, 4, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:41:16'),
(84, 47, 15, 5, 'A true hidden gem — everything from the breakfast to the sunset view was just magical.', '2025-05-10 06:41:16'),
(85, 44, 15, 4, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:41:16'),
(86, 3, 15, 4, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:41:16'),
(87, 2, 15, 5, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:41:16'),
(88, 3, 28, 4, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:42:13'),
(89, 2, 28, 4, 'Delicious food, professional staff, and elegant interiors.', '2025-05-10 06:42:13'),
(90, 47, 28, 4, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:42:13'),
(91, 44, 28, 4, 'Could use some renovation in the bathroom area, but overall a nice stay.', '2025-05-10 06:42:13'),
(92, 1, 28, 3, 'Room was cozy, clean, and had a breathtaking city view.', '2025-05-10 06:42:13'),
(93, 46, 28, 3, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:42:13'),
(94, 2, 29, 5, 'Great ambiance and location, but the Wi-Fi could be faster.', '2025-05-10 06:42:13'),
(95, 46, 29, 5, 'The spa and wellness area exceeded all expectations!', '2025-05-10 06:42:13'),
(96, 3, 29, 5, 'Felt like royalty the moment I stepped in. Superb service!', '2025-05-10 06:42:13'),
(97, 1, 29, 4, 'Ideal for a peaceful getaway. Slept like a baby.', '2025-05-10 06:42:13'),
(98, 44, 29, 4, 'Loved the vintage charm mixed with modern comfort.', '2025-05-10 06:42:13'),
(99, 47, 29, 4, 'Top-notch experience — would absolutely come back!', '2025-05-10 06:42:13'),
(100, 2, 5, 5, 'asd', '2025-05-10 03:47:18'),
(101, 2, 29, 3, 'selam', '2025-05-10 03:49:14');

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
(9, 5, '/public/room_images/room-img01.jpg', 1),
(10, 6, '/public/room_images/room-img03.jpg', 0),
(11, 3, '/public/room_images/room-img01.jpg', 1),
(12, 4, '/public/room_images/room-img03.jpg', 1),
(13, 7, '/public/room_images/room-img03.jpg', 1),
(14, 8, '/public/room_images/room-img01.jpg', 1),
(15, 9, '/public/room_images/room-img03.jpg', 1),
(16, 10, '/public/room_images/room-img01.jpg', 1),
(17, 11, '/public/room_images/room-img03.jpg', 1),
(18, 12, '/public/room_images/room-img03.jpg', 1),
(19, 13, '/public/room_images/room-img03.jpg', 1),
(20, 14, '/public/room_images/room-img03.jpg', 1),
(21, 15, '/public/room_images/room-img03.jpg', 1),
(22, 16, '/public/room_images/room-img03.jpg', 1),
(23, 17, '/public/room_images/room-img01.jpg', 1),
(24, 17, '/public/room_images/room-img01.jpg', 1),
(25, 18, '/public/room_images/room-img03.jpg', 1),
(26, 19, '/public/room_images/room-img03.jpg', 1),
(28, 21, '/public/room_images/room-img01.jpg', 1),
(29, 22, '/public/room_images/room-img01.jpg', 1),
(30, 23, '/public/room_images/room-img01.jpg', 1),
(31, 24, '/public/room_images/room-img01.jpg', 1),
(32, 25, '/public/room_images/room-img03.jpg', 1),
(35, 29, '/room_images/1746856378372.png', 1),
(36, 30, '/room_images/1746856942547.jpg', 0),
(37, 30, '/room_images/1746856949622.jpg', 1);

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
(1, 1, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 160.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:38:04', 'Deluxe Sea View', 35, NULL),
(2, 1, 'Standard Room', 'Comfortable room with essential facilities.', 120.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:38:04', 'Standard Comfort', 25, NULL),
(3, 2, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 150.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:40:01', 'Deluxe Sea View', 35, NULL),
(4, 2, 'Standard Room', 'Comfortable room with essential facilities.', 90.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:01', 'Standard Comfort', 25, NULL),
(5, 3, 'Deluxe Room', 'Spacious room with sea view and modern amenities.', 130.00, 2, 5, '35 sqm', 'King Size', '2025-04-09 13:40:20', 'Deluxe Sea View', 35, NULL),
(6, 3, 'Standard Room', 'Comfortable room with essential facilities.', 70.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(7, 4, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(8, 4, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(9, 5, 'Standard Room', 'Comfortable room with essential facilities.', 100.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(10, 5, 'Family Room', 'Comfortable room for your family peace', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(11, 6, 'Standard Room', 'Comfortable room with essential facilities.', 90.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(12, 7, 'Standard Room', 'Comfortable room with essential facilities.', 110.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(13, 8, 'Standard Room', 'Comfortable room with essential facilities.', 115.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(14, 9, 'Standard Room', 'Comfortable room with essential facilities.', 175.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(15, 10, 'Standard Room', 'Comfortable room with essential facilities.', 90.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(16, 11, 'Standard Room', 'Comfortable room with essential facilities.', 75.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(17, 12, 'Standard Room', 'Comfortable room with essential facilities.', 160.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(18, 14, 'Standard Room', 'Comfortable room with essential facilities.', 140.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(19, 15, 'Standard Room', 'Comfortable room with essential facilities.', 65.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(21, 9, 'Deluxe Room', 'Comfortable room with essential facilities.', 250.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Deluxe Room', 25, NULL),
(22, 6, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(23, 7, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(24, 8, 'Family Room', 'Comfortable room for your family peace.', 180.00, 4, 10, '45 sqm', 'King Size', '2025-04-09 13:40:20', 'Family Comfort', 45, NULL),
(25, 13, 'Standard Room', 'Comfortable room with essential facilities.', 125.00, 2, 10, '25 sqm', 'Queen Size', '2025-04-09 13:40:20', 'Standard Comfort', 25, NULL),
(29, 28, 'Standart', 'Standart bir oda', 75.00, 2, 10, NULL, 'King Size', '2025-05-10 05:52:58', 'Standart', 35, NULL),
(30, 29, 'Suit', 'Feel yourself in the victorian era!', 350.00, 4, 20, NULL, '2x King Size', '2025-05-10 06:02:22', 'Luxury Suit', 80, NULL);

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
(2, 'sezo', 'user', 'sezo@sezo.com', '$2a$10$7dtp/gc3N7Am4Z2o3Lu4i.CDe9NDlmd4mRpjQoMQQwz3LeYYSmbF.', 'Sezai', 'Araplarlı', '05313313131', '2025-04-02 10:59:15', '2025-04-10 06:49:57', 1),
(3, 'dede', 'user', 'dede@dede.com', '123456', 'dede', 'dede', '05313313131', '2025-04-03 17:57:28', '2025-04-10 06:50:00', 0),
(4, 'admin', 'admin', 'admin@admin.com', '$2a$10$4ivO5hjwwFgbo5MtT8UaXeBt2kUC0IxS6NvNLQHX4eF6D/MdZduwm', 'admin', 'admin', '05467897895', '2025-04-03 18:54:48', '2025-04-10 06:50:02', 0),
(16, 'manager_royal_palace', 'manager', 'royal.manager@example.com', '$2a$10$7.fHsjEx.kySznBmTehL0e3Fu9DbEXY7hRtrRzw5BaFl16mw5gb7S', 'Royalaaaa', 'Manager', '0000000001', '2025-04-08 14:34:31', '2025-04-08 14:34:31', 0),
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
(30, 'manager_mountain', 'manager', 'mountain.manager@example.com', '$2a$10$o0TlMz1YxxkCMZfkcKzmpOYXX1hVsHmRF3zrxBZQOknLgdtoDJXF2', 'Mountain', 'Manager', '0000000015', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0),
(31, 'manager_ocean', 'manager', 'ocean.manager@example.com', '$2a$10$fZnN1k5b2t9Cny93gv2Ssu.nf3GbVvTNdShvZij/Hh9qQBH17B3lS', 'Ocean', 'Manager', '0000000016', '2025-04-08 12:00:00', '2025-04-08 12:00:00', 0),
(43, 'aaaaaaaaaaa', 'manager', 'aaaaaaa@a.com', '$2a$10$NDsDJEkgmTaT0b9mLqC0X.SRRKydmJjGfurMexen4S8p8veim2qyG', 'emir emir', 'bacın', '05438813007', '2025-05-08 09:15:31', '2025-05-08 12:19:29', 0),
(44, 'beril', 'user', 'beril@beril.com', '$2a$10$U6TfdyxhxsOlFteG81ms4OVE6QvCHm9GjMQbMeWtj9P/MRZdzRJeK', 'beril', 'kurt', '05555555555', '2025-05-08 09:21:12', '2025-05-08 09:21:12', 0),
(45, 'ahmet', 'manager', 'ahmetmanager@gmail.com', '$2a$10$syqIQvVkwGehfmwayvqVhet8pdQwVPhpgkE2aB8EgQ3XwZbdUoLy6', 'Ahmet', 'Ahmetoglu', '05513215547', '2025-05-10 02:05:43', '2025-05-10 02:05:43', 0),
(46, 'sabo', 'manager', 'sabo@sabo.com', '$2a$10$mgPVW/ZKrXno7abpcrE7ROXFWruGBMZoSWO8HjnoJJPQrZUnHYLSi', 'Sabo', 'Palace', '05346789551', '2025-05-10 02:55:53', '2025-05-10 02:55:53', 0),
(47, 'zehra', 'user', 'zehra.haydin@gmail.com', '$2a$10$4tD4tHwISsnR1e.v6bCHu.78WaOgBLKNV5AmMTvgF9Uqicnf4tfIy', 'zehra', 'haydin', '05311008707', '2025-05-10 03:28:21', '2025-05-10 03:28:21', 0);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `amenity_translations`
--
ALTER TABLE `amenity_translations`
  ADD PRIMARY KEY (`translation_id`),
  ADD UNIQUE KEY `amenity_id` (`amenity_id`,`language_code`),
  ADD UNIQUE KEY `UKsd0otho85r5rxowltvrdouima` (`amenity_id`,`language_code`);

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
-- Tablo için AUTO_INCREMENT değeri `amenity_translations`
--
ALTER TABLE `amenity_translations`
  MODIFY `translation_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Tablo için AUTO_INCREMENT değeri `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
  MODIFY `image_id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- Tablo için AUTO_INCREMENT değeri `hotels`
--
ALTER TABLE `hotels`
  MODIFY `hotel_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Tablo için AUTO_INCREMENT değeri `managers`
--
ALTER TABLE `managers`
  MODIFY `manager_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
  MODIFY `review_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- Tablo için AUTO_INCREMENT değeri `roomamenities`
--
ALTER TABLE `roomamenities`
  MODIFY `amenity_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Tablo için AUTO_INCREMENT değeri `roomimages`
--
ALTER TABLE `roomimages`
  MODIFY `image_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Tablo için AUTO_INCREMENT değeri `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `amenity_translations`
--
ALTER TABLE `amenity_translations`
  ADD CONSTRAINT `amenity_translations_ibfk_1` FOREIGN KEY (`amenity_id`) REFERENCES `hotelamenities` (`amenity_id`) ON DELETE CASCADE;

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
