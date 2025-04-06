-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: hotels_reservations
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`booking_id`),
  KEY `fk_bookings_user` (`user_id`),
  KEY `fk_bookings_room` (`room_id`),
  KEY `idx_bookings_check_in` (`check_in_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_messages` (
  `message_id` varchar(255) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES ('5850c479-e734-461a-b7b6-28df3e35b895','a','esad.emir34@stu.khas.edu.tr','05438813007','aa','2025-04-05 11:20:24',0),('7dae1e1d-8ce7-40c3-8459-fb19cefce8d2','a','esad.emir34@stu.khas.edu.tr','05438813007','nabe sabo','2025-04-05 10:59:17',0);
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelamenities`
--

DROP TABLE IF EXISTS `hotelamenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotelamenities` (
  `amenity_id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `icon_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelamenities`
--

LOCK TABLES `hotelamenities` WRITE;
/*!40000 ALTER TABLE `hotelamenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `hotelamenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelamenityjunction`
--

DROP TABLE IF EXISTS `hotelamenityjunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotelamenityjunction` (
  `hotel_id` char(36) NOT NULL,
  `amenity_id` char(36) NOT NULL,
  PRIMARY KEY (`hotel_id`,`amenity_id`),
  KEY `fk_hotelamenityjunc_amenity` (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelamenityjunction`
--

LOCK TABLES `hotelamenityjunction` WRITE;
/*!40000 ALTER TABLE `hotelamenityjunction` DISABLE KEYS */;
/*!40000 ALTER TABLE `hotelamenityjunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelimages`
--

DROP TABLE IF EXISTS `hotelimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotelimages` (
  `image_id` char(36) NOT NULL,
  `hotel_id` char(36) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`image_id`),
  KEY `fk_hotelimages_hotel` (`hotel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelimages`
--

LOCK TABLES `hotelimages` WRITE;
/*!40000 ALTER TABLE `hotelimages` DISABLE KEYS */;
INSERT INTO `hotelimages` VALUES ('01-img','01','/src/assets/images/hotel-img01.jpg',1),('02-img','02','/src/assets/images/hotel-img02.jpg',1),('03-img','03','/src/assets/images/hotel-img03.jpg',1),('04-img','04','/src/assets/images/hotel-img04.jpg',1),('05-img','05','/src/assets/images/hotel-img05.jpg',1),('06-img','06','/src/assets/images/hotel-img06.jpg',1),('07-img','07','/src/assets/images/hotel-img07.jpg',1),('08-img','08','/src/assets/images/hotel-img08.jpg',1),('09-img','09','/src/assets/images/hotel-img09.jpg',1),('10-img','10','/src/assets/images/hotel-img10.jpg',1),('11-img','11','/src/assets/images/hotel-img11.jpg',1),('12-img','12','/src/assets/images/hotel-img12.jpg',1),('13-img','13','/src/assets/images/hotel-img13.jpg',1),('14-img','14','/HotelsRezervationSystem/src/assets/images/hotel-img14.jpg',1);
/*!40000 ALTER TABLE `hotelimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  PRIMARY KEY (`hotel_id`),
  KEY `idx_hotels_city` (`city`),
  KEY `fk_hotels_manager` (`manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES ('01',1,'The Grand London Hotel','123 Oxford Street, London','London','United Kingdom',51.5074,-0.1278,'Experience the heart of London in style with spacious rooms and excellent city views.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('02',1,'Royal Palace London','10 Downing Street, London','London','United Kingdom',51.5034,-0.1276,'Stay like royalty at this prestigious address, with luxury amenities and impeccable service.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('03',1,'London River Hotel','567 River Road, London','London','United Kingdom',51.509,-0.118,'Wake up to stunning river views and enjoy relaxing riverside walks in central London.',4,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('04',1,'Skyline Tower London','321 Skyline Avenue, London','London','United Kingdom',51.515,-0.141,'Reach new heights at Skyline Tower with luxury suites and breathtaking city panoramas.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('05',1,'Bali Beach Resort','456 Sunset Road, Bali','Bali','Indonesia',-8.4095,115.1889,'Enjoy tropical paradise with beachfront access and unforgettable sunsets every day.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('06',1,'Tropical Paradise Bali','789 Island Street, Bali','Bali','Indonesia',-8.414,115.195,'Dive into luxury with private pools and ultimate relaxation in the heart of Bali.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('07',1,'Golden Sands Resort','999 Ocean Drive, Bali','Bali','Indonesia',-8.42,115.2,'Relax on golden sands and sip cocktails while enjoying Bali’s breathtaking sunsets.',4,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('08',1,'Island Escape Hotel','222 Paradise Lane, Bali','Bali','Indonesia',-8.43,115.21,'A secluded retreat offering private beaches and luxury amenities for an unforgettable escape.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('09',1,'Tokyo Sky Hotel','789 Shibuya, Tokyo','Tokyo','Japan',35.658,139.7016,'Enjoy panoramic city views and premium services at the heart of bustling Tokyo.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('10',1,'Shinjuku Business Hotel','45 Business Street, Tokyo','Tokyo','Japan',35.6938,139.7034,'Perfect for business travelers with fast Wi-Fi and professional meeting rooms.',4,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('11',1,'Cherry Blossom Resort','22 Sakura Avenue, Tokyo','Tokyo','Japan',35.6895,139.6917,'Experience traditional Japanese hospitality surrounded by beautiful cherry blossoms.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('12',1,'Luxury Tower Tokyo','567 Ginza Road, Tokyo','Tokyo','Japan',35.6717,139.765,'Enjoy penthouse suites and gourmet dining in Tokyo’s upscale Ginza district.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('13',1,'Eiffel Grand Hotel','123 Champs Elysees, Paris','Paris','France',48.8566,2.3522,'Stay steps away from the Eiffel Tower with luxurious accommodations and fine dining.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50'),('14',1,'Louvre Palace Hotel','89 Louvre Street, Paris','Paris','France',48.8606,2.3376,'Discover art and culture with premium access to the Louvre and luxury services.',5,'14:00:00','12:00:00','Free cancellation up to 24 hours before check-in.','approved','2025-04-06 13:58:50');
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `managers` (
  `manager_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `hotel_id` char(36) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`manager_id`),
  UNIQUE KEY `uk_manager_user` (`user_id`),
  UNIQUE KEY `uk_manager_hotel` (`hotel_id`),
  CONSTRAINT `fk_managers_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_managers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `payment_id` char(36) NOT NULL,
  `booking_id` char(36) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('credit_card','paypal','bank_transfer') NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`payment_id`),
  KEY `fk_payments_booking` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotions` (
  `promotion_id` char(36) NOT NULL,
  `hotel_id` char(36) DEFAULT NULL,
  `room_id` char(36) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount_percentage` int(11) DEFAULT NULL CHECK (`discount_percentage` between 1 and 100),
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `promo_code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`promotion_id`),
  KEY `fk_promotions_hotel` (`hotel_id`),
  KEY `fk_promotions_room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `review_id` char(36) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `hotel_id` char(36) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `idx_reviews_hotel` (`hotel_id`),
  KEY `fk_reviews_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomamenities`
--

DROP TABLE IF EXISTS `roomamenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roomamenities` (
  `amenity_id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomamenities`
--

LOCK TABLES `roomamenities` WRITE;
/*!40000 ALTER TABLE `roomamenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomamenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomamenityjunction`
--

DROP TABLE IF EXISTS `roomamenityjunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roomamenityjunction` (
  `room_id` char(36) NOT NULL,
  `amenity_id` char(36) NOT NULL,
  PRIMARY KEY (`room_id`,`amenity_id`),
  KEY `fk_roomamenityjunc_amenity` (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomamenityjunction`
--

LOCK TABLES `roomamenityjunction` WRITE;
/*!40000 ALTER TABLE `roomamenityjunction` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomamenityjunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomimages`
--

DROP TABLE IF EXISTS `roomimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roomimages` (
  `image_id` char(36) NOT NULL,
  `room_id` char(36) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`image_id`),
  KEY `fk_roomimages_room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomimages`
--

LOCK TABLES `roomimages` WRITE;
/*!40000 ALTER TABLE `roomimages` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`room_id`),
  KEY `fk_rooms_hotel` (`hotel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_verified` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `idx_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'iamsahinemir','user','esad.emir34@gmail.com','123456','emir esad','şahin','05438813007','2025-03-31 17:36:25','2025-03-31 21:21:00',1),(10,'sezo','user','sezo@sezo.com','123456','Sezai','Araplarlı','05313313131','2025-04-02 10:59:15','2025-04-02 10:59:15',0),(11,'dede','user','dede@dede.com','123456','dede','dede','05313313131','2025-04-03 17:57:28','2025-04-03 17:57:28',0),(12,'admin','admin','admin@admin.com','1234567','admin','admin','05467897895','2025-04-03 18:54:48','2025-04-05 12:07:35',0),(13,'deneme','user','esad.emir34@stu.khas.edu.tr','123456','emir','şahin','05512024369','2025-04-05 10:50:27','2025-04-05 10:50:27',0),(14,'hasantezcan','user','hasantezcan@gmail.com','abcd1234','Hasan','Tezcan','05531092919','2025-04-05 15:46:50','2025-04-05 15:46:50',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-06 19:28:21
