CREATE DATABASE  IF NOT EXISTS `peekpick_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `peekpick_db`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: peekpick-db.cxl5ipdf2trc.ap-northeast-2.rds.amazonaws.com    Database: peekpick_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `achievement`
--

DROP TABLE IF EXISTS `achievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievement` (
  `achievement_id` bigint NOT NULL AUTO_INCREMENT,
  `chat_count` int NOT NULL DEFAULT '0',
  `dis_like_count` int NOT NULL DEFAULT '0',
  `like_count` int NOT NULL DEFAULT '0',
  `pick_point` int NOT NULL DEFAULT '0',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`achievement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `avatar`
--

DROP TABLE IF EXISTS `avatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar` (
  `avatar_id` bigint NOT NULL AUTO_INCREMENT,
  `bio` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `emoji_id` bigint DEFAULT NULL,
  `prefix_id` bigint DEFAULT NULL,
  `world_id` bigint DEFAULT NULL,
  PRIMARY KEY (`avatar_id`),
  KEY `FKg946hhug3t9i0mjy9idooeutf` (`emoji_id`),
  KEY `world_id` (`world_id`),
  KEY `FKcvbjomvfagurttt88qbtcu5ep` (`prefix_id`),
  CONSTRAINT `FKcvbjomvfagurttt88qbtcu5ep` FOREIGN KEY (`prefix_id`) REFERENCES `prefix` (`prefix_id`),
  CONSTRAINT `FKg946hhug3t9i0mjy9idooeutf` FOREIGN KEY (`emoji_id`) REFERENCES `emoji` (`emoji_id`),
  CONSTRAINT `world_id` FOREIGN KEY (`world_id`) REFERENCES `world` (`world_id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `large` varchar(255) DEFAULT NULL,
  `middle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chat_room_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `room_id` varchar(255) NOT NULL,
  `receiver_id` bigint DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  PRIMARY KEY (`chat_room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=644 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emoji`
--

DROP TABLE IF EXISTS `emoji`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emoji` (
  `emoji_id` bigint NOT NULL AUTO_INCREMENT,
  `animated_image_url` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `rate` char(1) NOT NULL,
  PRIMARY KEY (`emoji_id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `birthday` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `avatar_id` bigint DEFAULT NULL,
  `achievement_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FKc4fg82ljqg9p0wbb3bvgc8w4b` (`achievement_id`),
  KEY `FK7ybged4jpsq02kfboou5rwy6t` (`avatar_id`),
  CONSTRAINT `FK7ybged4jpsq02kfboou5rwy6t` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`avatar_id`),
  CONSTRAINT `FKc4fg82ljqg9p0wbb3bvgc8w4b` FOREIGN KEY (`achievement_id`) REFERENCES `achievement` (`achievement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `peek`
--

DROP TABLE IF EXISTS `peek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peek` (
  `peek_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `dis_like_count` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `like_count` int NOT NULL,
  `member_id` bigint DEFAULT NULL,
  `write_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`peek_id`),
  KEY `FKhvdibrpdkg3q1bndnj6cdilwh` (`member_id`),
  CONSTRAINT `FKhvdibrpdkg3q1bndnj6cdilwh` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=903 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `peek_reaction`
--

DROP TABLE IF EXISTS `peek_reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peek_reaction` (
  `peek_reaction_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `peek_id` bigint DEFAULT NULL,
  `type` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`peek_reaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `prefix`
--

DROP TABLE IF EXISTS `prefix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prefix` (
  `prefix_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(20) NOT NULL,
  PRIMARY KEY (`prefix_id`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `avatar_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8xyyavbij34uv0pubv2wbrkfl` (`avatar_id`),
  CONSTRAINT `FK8xyyavbij34uv0pubv2wbrkfl` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`avatar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=425 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` bigint NOT NULL,
  `contetn_type` varchar(1) DEFAULT NULL,
  `report_content` varchar(255) DEFAULT NULL,
  `report_content_id` varchar(255) DEFAULT NULL,
  `report_time` datetime(6) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `report_category_id` bigint DEFAULT NULL,
  `victim_id` bigint DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FKel7y5wyx42a6njav1dbe2torl` (`member_id`),
  KEY `FKgaxwvjrvo9d5sfnlylknu40bt` (`report_category_id`),
  KEY `FKhuy6e961tpoc0olcbx4h6p5dg` (`victim_id`),
  CONSTRAINT `FKel7y5wyx42a6njav1dbe2torl` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKgaxwvjrvo9d5sfnlylknu40bt` FOREIGN KEY (`report_category_id`) REFERENCES `report_category` (`report_category_id`),
  CONSTRAINT `FKhuy6e961tpoc0olcbx4h6p5dg` FOREIGN KEY (`victim_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_category`
--

DROP TABLE IF EXISTS `report_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_category` (
  `report_category_id` bigint NOT NULL,
  `report_category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`report_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `taste`
--

DROP TABLE IF EXISTS `taste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taste` (
  `taste_id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_id` bigint DEFAULT NULL,
  `type` varchar(1) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`taste_id`),
  KEY `taste` (`category_id`),
  KEY `FKk8je0eiwhkk0ucn6ldcrkqhlq` (`avatar_id`),
  CONSTRAINT `FK8vkqwvmvtco3exyrwxwwkyngs` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKk8je0eiwhkk0ucn6ldcrkqhlq` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`avatar_id`),
  CONSTRAINT `taste` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=800 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `world`
--

DROP TABLE IF EXISTS `world`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `world` (
  `world_id` bigint NOT NULL AUTO_INCREMENT,
  `open_url` varchar(255) DEFAULT NULL,
  `close_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`world_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  8:32:24
