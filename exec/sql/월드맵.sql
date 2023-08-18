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

--
-- Dumping data for table `world`
--

LOCK TABLES `world` WRITE;
/*!40000 ALTER TABLE `world` DISABLE KEYS */;
INSERT INTO `world` VALUES (1,'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/StatueLibertyBack.png','https://peekpick-app.s3.ap-northeast-2.amazonaws.com/StatueLibertyChoice.png'),(2,'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/TajimahalBack.png','https://peekpick-app.s3.ap-northeast-2.amazonaws.com/TajimahalChoice.png'),(3,'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/PiramidsBack.png','https://peekpick-app.s3.ap-northeast-2.amazonaws.com/PiramidsChoice.png'),(4,'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/PisaTowerBack.png','https://peekpick-app.s3.ap-northeast-2.amazonaws.com/PisaTowerChoice.png'),(5,'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/KermlinBack.png','https://peekpick-app.s3.ap-northeast-2.amazonaws.com/KermlinChoice.png'),(6,'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/BigBenBack.png','https://peekpick-app.s3.ap-northeast-2.amazonaws.com/BigBenChoice.png'),(7,'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/EiffelTowerBack.png','https://peekpick-app.s3.ap-northeast-2.amazonaws.com/EiffelTowerChoice.png');
/*!40000 ALTER TABLE `world` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  8:05:48
