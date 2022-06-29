-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.21-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for piivt_projekat
DROP DATABASE IF EXISTS `piivt_projekat`;
CREATE DATABASE IF NOT EXISTS `piivt_projekat` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `piivt_projekat`;

-- Dumping structure for table piivt_projekat.administrator
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_projekat.administrator: ~8 rows (approximately)
REPLACE INTO `administrator` (`administrator_id`, `username`, `password_hash`, `created_at`, `is_active`) VALUES
	(2, 'aleksa', 'aleksa', '2022-05-21 13:01:21', 1),
	(3, 'zika', 'zika', '2022-05-21 13:01:44', 1),
	(4, 'pera', 'pera', '2022-05-21 13:01:55', 1),
	(5, 'marko', 'marko', '2022-05-21 15:30:04', 1),
	(6, 'marko23', 'marko123', '2022-05-21 15:45:27', 0),
	(8, 'aleksav', '$2b$10$3sIhzghzaOdiDLU/ilpbdeh6WmXMx95ofW0r1C1os6EN0TRltx0zC', '2022-05-28 12:37:58', 1),
	(9, 'admin', '$2b$10$JTzzUzNwmf/WZuvDphIQ0OsGfnxmmuTcdL5dwA76M1NCqYR47RC9G', '2022-06-04 13:53:26', 1),
	(10, 'admin-dva', '$2b$10$0WpCdDespRgaD2Pqz8BNI.kdKyfRLtkoluw0EKvG8Hce/qniaAZLS', '2022-06-29 14:14:42', 1);

-- Dumping structure for table piivt_projekat.contact_info
DROP TABLE IF EXISTS `contact_info`;
CREATE TABLE IF NOT EXISTS `contact_info` (
  `contact_info_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`contact_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_projekat.contact_info: ~1 rows (approximately)
REPLACE INTO `contact_info` (`contact_info_id`, `phone`, `email`, `address`) VALUES
	(1, '111222333444', 'bazen@email.com', 'Neka adresa 5, Beograd, Srbija');

-- Dumping structure for table piivt_projekat.period
DROP TABLE IF EXISTS `period`;
CREATE TABLE IF NOT EXISTS `period` (
  `period_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `period` datetime NOT NULL,
  PRIMARY KEY (`period_id`),
  UNIQUE KEY `uq_period_period` (`period`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_projekat.period: ~14 rows (approximately)
REPLACE INTO `period` (`period_id`, `period`) VALUES
	(1, '2019-05-27 18:00:00'),
	(4, '2021-05-27 18:00:00'),
	(2, '2022-05-26 09:00:00'),
	(3, '2022-05-27 10:00:00'),
	(6, '2022-06-30 23:10:00'),
	(10, '2022-07-05 21:00:00'),
	(7, '2022-07-07 15:10:00'),
	(12, '2022-07-07 22:00:00'),
	(13, '2022-07-08 11:00:00'),
	(8, '2022-07-08 17:00:00'),
	(11, '2022-07-26 21:00:00'),
	(14, '2022-08-23 15:00:00'),
	(9, '2022-09-20 14:00:00'),
	(5, '2022-09-27 08:00:00');

-- Dumping structure for table piivt_projekat.period_user
DROP TABLE IF EXISTS `period_user`;
CREATE TABLE IF NOT EXISTS `period_user` (
  `period_user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `period_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `is_canceled` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`period_user_id`),
  UNIQUE KEY `uq_period_user_period_id_user_id` (`period_id`,`user_id`),
  KEY `fk_period_user_user_id` (`user_id`),
  CONSTRAINT `fk_period_user_period_id` FOREIGN KEY (`period_id`) REFERENCES `period` (`period_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_period_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_projekat.period_user: ~17 rows (approximately)
REPLACE INTO `period_user` (`period_user_id`, `period_id`, `user_id`, `is_canceled`) VALUES
	(2, 1, 1, 0),
	(3, 1, 2, 1),
	(6, 1, 3, 0),
	(7, 2, 1, 0),
	(8, 3, 2, 0),
	(9, 1, 5, 0),
	(14, 1, 6, 1),
	(15, 4, 6, 1),
	(19, 3, 6, 1),
	(20, 2, 6, 1),
	(21, 5, 6, 1),
	(30, 5, 2, 1),
	(31, 5, 22, 1),
	(32, 8, 22, 0),
	(33, 7, 22, 1),
	(36, 6, 22, 0),
	(37, 9, 22, 0),
	(38, 1, 22, 0);

-- Dumping structure for table piivt_projekat.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `activation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_reset_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_activation_code` (`activation_code`),
  UNIQUE KEY `uq_user_password_reset_code` (`password_reset_code`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_projekat.user: ~7 rows (approximately)
REPLACE INTO `user` (`user_id`, `email`, `password_hash`, `first_name`, `last_name`, `phone_number`, `created_at`, `is_active`, `activation_code`, `password_reset_code`) VALUES
	(1, 'aleksa@email.com', '$2b$10$xakxpz.Kr2Zuc/jI8pjz4uteATkJlk5xPLgdVWbTtTv0f./2TRdiC', 'Aleksa', 'Vidakovic', '123456', '2022-05-21 17:19:36', 0, NULL, NULL),
	(2, 'marko@email.com', '$2b$10$4xSjY4PBCabkJLWHoe1US.ht8MEYzi4/lOE7hMSkkwTHxC..IqMOG', 'Marko', 'Markovic', '123456789', '2022-05-21 17:19:54', 1, NULL, NULL),
	(3, 'pera@email.com', '$2b$10$YQFIG1xqUxsvuAX3A3fFh.daKRDApsy0fJDuGUuIUNqRAhMUaea1e', 'Pera', 'Peric', '98765', '2022-05-21 17:20:23', 1, NULL, NULL),
	(5, 'neko@email.com', '$2b$10$ZeSVrFkWbQMAmGtbhwznru3qDTQHgYrRzTauzoKmSyJpP2TOa02oa', 'Petarrrr', 'Petrovic', '9876521312321', '2022-05-28 13:55:31', 1, NULL, NULL),
	(6, 'nekodrugi@email.com', '$2b$10$VAo371HZXJUaV6JIFcB1qu9VgsE4UkK0HgtQsHz8i6gOACZ/dqPk.', 'Petarrrr', 'Petrovicccc', '987652131232189889', '2022-05-29 17:41:30', 1, NULL, NULL),
	(22, 'aleksa.vidakovic2508@gmail.com', '$2b$10$zqfhLyK6HPW8pWqiaJY8c.taVkNiSTnJGSGTOucdP0tPkwC4nHX5G', 'Aleksa', 'Vidakovic', '111222333', '2022-06-04 12:48:23', 1, NULL, NULL),
	(23, 'aleksatest@email.com', '$2b$10$yicqdiq7VLEN2dhPt5Ky7.ND6JRnmZCQkdwjl3J21wsrIavvNY9DK', 'Aleksa', 'Vidakovic', '12345678', '2022-06-29 13:34:15', 1, NULL, NULL);

-- Dumping structure for table piivt_projekat.website_content
DROP TABLE IF EXISTS `website_content`;
CREATE TABLE IF NOT EXISTS `website_content` (
  `website_content_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `swimming_pool_rules` text COLLATE utf8_unicode_ci NOT NULL,
  `period_reservation_guide` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`website_content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table piivt_projekat.website_content: ~1 rows (approximately)
REPLACE INTO `website_content` (`website_content_id`, `swimming_pool_rules`, `period_reservation_guide`) VALUES
	(1, '- Pre ulaska u bazen obavezno je tuširanje\n\n- Pre ulaska u bazen obazevan je prolazak kroz bazen za dezinfekciju nogu\n\n- Obavezno je da se sve vreme nosi plivačka kapa\n\n- Zabranjeno je kupanje bez prisustva spasioca\n\n- Zabranjeno je guranje oko bazena\n\n- Zabranjeno je trčanje oko bazena\n\n- Zabranjeno je skakanje u bazen\n\n- U blizini bazena ne smeju se konzumirati hrana i piće', 'Rezervisane ulaznice neophodno je preuzeti na blagajni bazena najmanje 30 minuta pre početka termina.');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
