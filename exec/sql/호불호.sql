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
-- Dumping data for table `taste`
--

LOCK TABLES `taste` WRITE;
/*!40000 ALTER TABLE `taste` DISABLE KEYS */;
INSERT INTO `taste` VALUES (12,4,'L',64),(13,4,'D',112),(20,11,'L',63),(21,11,'L',68),(22,11,'D',161),(23,11,'D',13),(24,12,'L',8),(25,12,'L',49),(26,12,'L',112),(27,12,'D',93),(28,12,'D',74),(29,12,'D',16),(47,15,'L',3),(48,15,'L',4),(49,15,'L',13),(50,15,'L',19),(51,15,'L',6),(52,15,'D',90),(53,15,'D',93),(54,15,'D',87),(55,15,'D',99),(56,15,'D',97),(62,16,'D',6),(63,16,'D',7),(64,16,'D',8),(65,16,'D',9),(66,16,'D',10),(67,17,'L',1),(68,17,'L',2),(69,17,'L',3),(70,17,'L',4),(71,17,'L',5),(72,17,'D',6),(73,17,'D',7),(74,17,'D',8),(75,17,'D',9),(76,17,'D',10),(77,18,'L',1),(78,18,'L',2),(79,18,'L',3),(80,18,'L',4),(81,18,'L',5),(82,18,'D',6),(83,18,'D',7),(84,18,'D',8),(85,18,'D',9),(86,18,'D',10),(87,19,'L',1),(88,19,'L',2),(89,19,'L',3),(90,19,'L',4),(91,19,'L',5),(92,19,'D',6),(93,19,'D',7),(94,19,'D',8),(95,19,'D',9),(96,19,'D',10),(107,21,'L',1),(108,21,'L',2),(109,21,'L',3),(110,21,'L',4),(111,21,'L',5),(112,21,'D',6),(113,21,'D',7),(114,21,'D',8),(115,21,'D',9),(116,21,'D',10),(117,22,'L',1),(118,22,'L',2),(119,22,'L',3),(120,22,'L',4),(121,22,'L',5),(127,24,'L',61),(128,24,'L',65),(129,24,'L',67),(130,24,'D',1),(131,24,'D',14),(132,25,'L',63),(133,25,'L',79),(134,25,'D',4),(135,25,'D',6),(163,26,'L',81),(164,26,'L',83),(165,26,'L',80),(166,26,'D',30),(167,26,'D',37),(168,26,'D',23),(169,27,'L',91),(170,27,'L',94),(171,27,'L',93),(172,27,'L',89),(173,27,'D',131),(174,27,'D',130),(175,27,'D',136),(176,16,'L',127),(177,16,'L',128),(178,16,'L',130),(179,16,'L',136),(180,16,'L',135),(184,28,'D',102),(185,28,'D',105),(186,28,'D',117),(189,30,'L',40),(190,30,'L',41),(191,30,'L',83),(192,30,'L',5),(193,30,'L',140),(194,30,'D',61),(236,32,'L',66),(237,32,'L',41),(238,32,'L',3),(239,32,'D',39),(288,28,'L',1),(289,28,'L',2),(290,28,'L',3),(297,20,'D',14),(298,20,'D',17),(306,36,'D',67),(307,36,'D',70),(308,36,'D',79),(309,36,'D',171),(310,36,'D',172),(311,37,'L',20),(312,37,'D',40),(315,38,'L',8),(316,38,'D',179),(317,40,'L',61),(318,40,'L',70),(319,40,'D',133),(320,40,'D',127),(323,42,'L',107),(324,42,'D',73),(327,20,'L',67),(328,20,'L',88),(329,43,'L',122),(330,43,'D',172),(331,44,'L',141),(332,44,'L',26),(333,44,'D',61),(334,44,'D',78),(340,41,'L',60),(341,41,'L',72),(342,41,'L',80),(343,41,'L',1),(344,41,'L',120),(345,45,'L',5),(346,45,'L',6),(347,45,'D',162),(349,20,'L',93),(350,20,'L',136),(351,47,'L',12),(352,47,'L',13),(353,47,'L',16),(354,47,'D',67),(355,47,'D',76),(356,47,'D',64),(357,20,'L',107),(358,30,'D',73),(359,30,'D',71),(360,41,'D',43),(361,41,'D',44),(373,49,'L',73),(374,49,'D',140),(375,49,'D',141),(376,49,'D',142),(377,49,'D',143),(378,49,'D',144),(379,36,'L',7),(380,36,'L',18),(381,36,'L',67),(382,36,'L',102),(383,36,'L',165),(384,51,'L',1),(385,51,'L',140),(386,51,'L',159),(387,51,'D',139),(388,53,'L',20),(389,53,'L',21),(390,53,'L',22),(391,53,'L',104),(392,53,'L',19),(393,53,'D',1),(394,53,'D',43),(395,54,'L',21),(396,54,'L',22),(397,54,'L',32),(398,54,'L',38),(399,54,'L',120),(400,28,'L',61),(401,55,'L',60),(402,55,'D',20),(403,57,'L',8),(404,57,'L',10),(405,57,'L',87),(406,57,'L',93),(407,57,'D',52),(408,57,'D',48),(409,58,'L',83),(410,58,'L',104),(411,58,'L',140),(412,58,'L',7),(413,58,'L',20),(414,58,'D',43),(415,58,'D',61),(416,58,'D',87),(417,58,'D',88),(418,59,'L',61),(419,59,'L',81),(420,59,'L',41),(421,59,'L',37),(422,59,'L',5),(423,59,'D',122),(424,59,'D',125),(425,59,'D',128),(426,59,'D',131),(427,59,'D',134),(428,35,'L',5),(429,35,'L',3),(430,35,'L',80),(431,35,'L',42),(432,35,'D',117),(433,35,'D',90),(434,35,'D',59),(436,39,'L',27),(437,63,'L',20),(438,63,'D',91),(439,68,'L',1),(440,68,'D',167),(441,69,'L',25),(442,69,'D',30),(443,70,'L',87),(444,70,'L',89),(445,71,'L',20),(446,71,'L',24),(447,71,'L',28),(448,71,'D',49),(449,71,'D',47),(450,35,'L',64),(451,72,'L',21),(452,72,'D',137),(453,73,'L',21),(454,73,'L',27),(455,73,'L',62),(456,73,'L',67),(457,73,'L',147),(458,73,'D',50),(459,73,'D',162),(460,73,'D',121),(461,73,'D',130),(462,73,'D',112),(463,39,'D',43),(464,39,'D',44),(468,75,'L',4),(469,75,'L',27),(470,76,'L',20),(471,76,'L',21),(472,76,'L',22),(473,76,'D',1),(474,76,'D',5),(475,76,'D',3),(478,79,'L',6),(480,79,'L',20),(481,80,'L',23),(482,80,'L',26),(483,80,'L',24),(484,80,'L',27),(485,80,'L',38),(486,80,'D',73),(487,81,'L',1),(488,81,'L',21),(489,81,'L',45),(490,81,'L',60),(491,81,'L',82),(492,81,'D',36),(493,82,'L',1),(494,82,'L',9),(495,82,'L',5),(496,82,'L',66),(497,83,'L',119),(498,83,'L',109),(499,83,'L',107),(500,83,'L',115),(501,83,'L',101),(502,83,'D',32),(503,84,'L',47),(504,84,'L',21),(505,84,'L',23),(506,85,'L',48),(507,85,'L',47),(508,85,'L',51),(509,85,'L',53),(510,85,'L',57),(511,85,'D',22),(512,85,'D',27),(513,85,'D',28),(514,86,'L',1),(515,86,'L',2),(516,86,'L',49),(517,86,'L',46),(518,86,'L',69),(519,86,'D',56),(520,88,'L',162),(521,88,'L',164),(522,88,'L',175),(523,88,'L',161),(524,88,'L',179),(525,89,'L',48),(526,89,'L',46),(527,89,'L',23),(528,89,'L',31),(529,89,'L',165),(530,33,'L',23),(531,33,'L',31),(532,33,'L',7),(533,33,'L',60),(534,33,'L',121),(535,33,'D',138),(536,79,'L',61),(537,79,'L',23),(539,79,'L',26),(540,79,'D',43),(541,91,'L',20),(542,91,'L',82),(543,91,'D',32),(544,93,'L',7),(545,93,'L',6),(546,93,'L',20),(547,93,'L',37),(548,93,'L',104),(549,93,'D',28),(550,93,'D',34),(551,93,'D',32),(552,93,'D',4),(553,93,'D',36),(554,94,'D',43),(555,94,'D',47),(556,94,'D',53),(557,95,'L',1),(558,95,'L',8),(559,95,'L',20),(560,95,'L',30),(561,96,'L',60),(562,96,'L',62),(563,96,'L',81),(564,96,'L',120),(565,96,'L',165),(566,96,'D',32),(567,96,'D',12),(568,96,'D',15),(569,96,'D',127),(570,96,'D',174),(571,97,'L',22),(572,97,'L',24),(573,97,'L',36),(574,97,'L',39),(575,97,'L',121),(576,97,'D',32),(577,97,'D',131),(578,97,'D',138),(579,97,'D',141),(580,98,'L',4),(581,98,'L',5),(582,98,'L',20),(583,98,'L',23),(584,98,'L',21),(585,98,'D',28),(586,98,'D',34),(587,99,'L',4),(588,99,'L',37),(589,99,'L',60),(590,99,'L',5),(591,99,'L',3),(592,99,'D',43),(593,99,'D',96),(594,99,'D',139),(595,99,'D',156),(596,99,'D',152),(597,100,'L',20),(598,100,'L',26),(599,100,'L',40),(600,100,'L',60),(601,100,'L',101),(602,100,'D',34),(603,102,'L',20),(604,102,'D',32),(605,105,'L',5),(606,105,'L',17),(607,105,'L',20),(608,105,'L',40),(609,105,'D',32),(610,105,'D',127),(611,52,'L',22),(612,52,'L',24),(613,52,'L',27),(614,52,'L',29),(615,52,'L',30),(616,52,'D',160),(617,52,'D',162),(618,52,'D',166),(619,52,'D',168),(620,52,'D',170),(621,106,'L',60),(622,106,'L',140),(623,106,'L',141),(624,106,'L',160),(625,106,'L',161),(626,109,'L',120),(627,109,'L',121),(628,109,'L',122),(629,109,'L',166),(630,109,'L',161),(631,109,'D',32),(632,109,'D',28),(633,109,'D',57),(634,109,'D',139),(635,35,'D',15),(636,35,'D',29),(637,112,'L',20),(638,112,'L',21),(639,112,'L',24),(640,112,'L',62),(641,112,'L',60),(642,112,'D',34),(643,112,'D',43),(644,113,'L',1),(645,113,'L',35),(646,113,'L',47),(647,113,'L',83),(648,113,'L',121),(649,114,'L',2),(650,114,'L',21),(651,114,'L',41),(652,114,'L',61),(653,114,'L',81),(654,114,'D',20),(655,114,'D',1),(656,114,'D',40),(657,114,'D',60),(658,114,'D',80),(659,115,'L',2),(660,115,'L',21),(661,115,'L',41),(662,115,'L',61),(663,115,'L',81),(664,115,'D',1),(665,115,'D',20),(666,115,'D',40),(667,115,'D',60),(668,115,'D',80),(669,117,'L',20),(670,117,'L',28),(671,117,'L',31),(672,117,'L',33),(673,117,'L',24),(674,117,'D',47),(675,117,'D',50),(676,117,'D',65),(677,117,'D',82),(678,117,'D',23),(679,118,'L',80),(680,118,'D',32),(681,119,'L',4),(682,119,'L',5),(683,119,'L',33),(684,119,'L',55),(685,119,'L',121),(686,119,'D',28),(687,119,'D',138),(688,119,'D',139),(689,119,'D',152),(690,120,'L',6),(691,120,'L',167),(692,120,'L',31),(693,120,'L',33),(694,120,'L',37),(695,122,'L',7),(696,122,'L',41),(697,122,'L',40),(698,123,'L',7),(699,123,'L',28),(700,123,'L',43),(701,123,'L',32),(702,123,'L',4),(703,123,'D',1),(704,124,'L',21),(705,124,'L',23),(706,124,'L',32),(707,124,'L',37),(708,124,'L',45),(709,124,'D',138),(710,125,'L',45),(711,126,'L',62),(712,126,'L',46),(713,126,'L',7),(714,126,'L',6),(715,126,'L',82),(716,125,'D',34),(717,132,'L',31),(718,132,'L',26),(719,132,'L',3),(720,132,'L',6),(721,132,'L',42),(722,133,'L',34),(723,133,'L',162),(724,133,'L',160),(725,133,'L',163),(726,41,'D',46),(727,135,'L',44),(728,135,'L',47),(729,135,'L',56),(730,135,'L',53),(731,135,'L',46),(732,39,'L',1),(733,39,'L',2),(734,39,'L',7),(735,39,'L',64),(736,137,'L',40),(737,137,'L',56),(738,137,'L',46),(739,39,'D',100),(740,39,'D',101),(741,39,'D',28),(742,139,'L',160),(743,139,'L',18),(744,139,'L',17),(745,139,'D',54),(746,139,'D',56),(747,139,'D',43),(748,139,'D',4),(749,136,'L',4),(750,136,'L',80),(751,136,'L',81),(752,136,'L',83),(753,136,'L',82),(754,136,'D',19),(755,136,'D',17),(756,136,'D',18),(757,136,'D',15),(758,136,'D',16),(759,61,'L',26),(760,61,'L',3),(761,61,'L',45),(762,61,'L',79),(763,61,'L',60),(764,61,'D',20),(765,61,'D',52),(766,61,'D',4),(767,61,'D',65),(768,61,'D',51),(769,140,'L',1),(770,140,'L',2),(771,140,'L',21),(772,140,'L',23),(773,140,'L',36),(774,141,'L',40),(775,141,'L',44),(776,141,'L',47),(777,141,'D',20),(778,143,'L',6),(779,143,'L',11),(780,143,'L',14),(781,143,'L',65),(782,143,'D',45),(783,143,'D',58),(784,144,'L',9),(785,144,'L',19),(786,144,'D',65),(787,144,'D',51),(788,144,'L',6),(789,144,'L',2),(790,144,'D',42),(791,144,'D',43),(792,145,'L',24),(793,145,'L',28),(794,145,'D',29),(795,145,'D',37),(796,146,'L',7),(797,146,'L',12),(798,146,'D',43),(799,146,'D',48);
/*!40000 ALTER TABLE `taste` ENABLE KEYS */;
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
