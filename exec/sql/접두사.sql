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
-- Dumping data for table `prefix`
--

LOCK TABLES `prefix` WRITE;
/*!40000 ALTER TABLE `prefix` DISABLE KEYS */;
INSERT INTO `prefix` VALUES (1,'미소천사인'),(2,'지적인'),(3,'발랄한'),(4,'귀여운'),(5,'눈치빠른'),(6,'쿨한'),(7,'샤방한'),(8,'살인미소인'),(9,'아름다운'),(10,'빛나는'),(11,'시크한'),(12,'훈훈한'),(13,'모델같은'),(14,'청순한'),(15,'센스있는'),(16,'깔끔한'),(17,'후덕한'),(18,'애교많은'),(19,'귀여운'),(20,'태생이좋은'),(21,'상냥한'),(22,'멋쟁이인'),(23,'알통많은'),(24,'가수같은'),(25,'토끼같은'),(26,'말잘하는'),(27,'피부좋은'),(28,'효도하는'),(29,'능력있는'),(30,'월척낚은'),(31,'부잣집인'),(32,'얼굴작은'),(33,'빠져드는'),(34,'넉살좋은   '),(35,'뭘해도되는'),(36,'효도하는'),(37,'아빠같은'),(38,'실력되는'),(39,'경청하는'),(40,'대담한'),(41,'인기많은'),(42,'톨부자인'),(43,'럭셔리한'),(44,'불사신인'),(45,'매력적인'),(46,'킹왕짱인'),(47,'섹시한'),(48,'돈많은'),(49,'사랑스러운'),(50,'깜찍한'),(51,'웃긴'),(52,'앙증맞은'),(53,'간지나는'),(54,'초특급인'),(55,'끝내주는'),(56,'엘프녀인'),(57,'귀티나는'),(58,'얼짱인'),(59,'톱스타인 '),(60,'천사닮은'),(61,'헌신적인'),(62,'신사적인'),(63,'머리좋은'),(64,'숙녀같은'),(65,'헌신하는'),(66,'친화력좋은'),(67,'억척스러운'),(68,'인기없는'),(69,'백번차인'),(70,'초딩같은'),(71,'돈없는'),(72,'매를부르는'),(73,'밉상인'),(74,'솔로인'),(75,'타락한'),(76,'추한'),(77,'바지먹은'),(78,'쪼잔한'),(79,'혼자신난'),(80,'가진것없는'),(81,'되는일없는'),(82,'그지같은'),(83,'해도안되는'),(84,'정줄놓은'),(85,'개념없는'),(86,'노매너인'),(87,'귀얇은'),(88,'개털인'),(89,'호빗스러운'),(90,'냄새나는'),(91,'변비걸린'),(92,'까칠한'),(93,'애인없는'),(94,'짠돌이인'),(95,'소심한  '),(96,'백수인'),(97,'딱한'),(98,'뺀질대는'),(99,'저질인'),(100,'정신나간'),(101,'모자른'),(102,'바보같은'),(103,'지저분한'),(104,'박쥐같은'),(105,'빈티나는'),(106,'비호감인'),(107,'깔창깐'),(108,'눈치없는'),(109,'못난'),(110,'구멍파는'),(111,'야행성인'),(112,'외톨이인'),(113,'맨날밤샌'),(114,'폭식하는'),(115,'꽁한'),(116,'4차원인'),(117,'덤벙대는'),(118,'기린닮은 '),(119,'코잘파는'),(120,'코잘먹는'),(121,'코 흘리는'),(122,'생기다만'),(123,'무좀있는'),(124,'목소리쉰'),(125,'식성강한'),(126,'손톱때낀 '),(127,'치타닮은'),(128,'궁상맞은'),(129,'돼지닮은'),(130,'머리뻗친'),(131,'나이많은'),(132,'호박같은'),(133,'굴욕적인'),(134,'짠순이인'),(135,'구수한'),(136,'바지터진'),(137,'힙스터');
/*!40000 ALTER TABLE `prefix` ENABLE KEYS */;
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

-- Dump completed on 2023-08-18  8:05:49
