CREATE DATABASE  IF NOT EXISTS `u-know` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `u-know`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: u-know
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

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `courseId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int NOT NULL DEFAULT '200',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `approved` tinyint NOT NULL DEFAULT '0',
  `difficulty` enum('Easy','Medium','Hard') NOT NULL DEFAULT 'Easy',
  `topic` varchar(255) NOT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT '5.0',
  `stars` json DEFAULT NULL,
  `content` text,
  `creatorId` int DEFAULT NULL,
  `comments` json DEFAULT NULL,
  PRIMARY KEY (`courseId`),
  UNIQUE KEY `IDX_ac5edecc1aefa58ed0237a7ee4` (`title`),
  UNIQUE KEY `IDX_6694f68765de7f95192cb8f5d4` (`description`),
  KEY `FK_cabe77f81b36bb1d647ef9c149d` (`creatorId`),
  CONSTRAINT `FK_cabe77f81b36bb1d647ef9c149d` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'title1','descrip1',200,'2023-06-25 11:19:19','2023-07-03 22:36:33',1,'Medium','Topic1',4.8,'[{\"value\": 4}]','content1',10,'[{\"value\": \"comentario de user 8 para curso 1\", \"userId\": 8}]'),(3,'my title test user 8','cambio teste',200,'2023-06-26 20:26:54','2023-07-03 22:20:28',1,'Medium','cambio teste',5.0,NULL,'cambio teste',8,'[{\"value\": \"comentario de user 9 para curso 3\", \"userId\": 9}]'),(4,'title4','descrip4',200,'2023-06-26 20:34:48','2023-07-03 22:21:27',1,'Easy','Topic4',5.0,NULL,'content4',8,'[{\"value\": \"comentario de user 9 para curso 3\", \"userId\": 9}]'),(5,'title5','descrip5',194,'2023-06-26 22:23:50','2023-07-03 22:09:06',1,'Easy','Topic5',5.0,NULL,'content tests by id10',10,NULL),(6,'title6','descrip6',198,'2023-06-26 23:50:40','2023-07-03 19:11:59',1,'Hard','Topic6',5.0,NULL,'content6',10,NULL),(7,'my title test','descrip7',196,'2023-06-27 13:03:54','2023-07-03 19:11:59',1,'Hard','Topic7',5.0,NULL,'content7',10,NULL),(9,'title10','descrip10',200,'2023-07-01 19:08:46','2023-07-03 16:57:53',0,'Hard','Topic10',5.0,NULL,'content10',10,NULL),(12,'title11','descrip11',200,'2023-07-02 01:18:14','2023-07-03 16:57:53',0,'Easy','Topic11',5.0,NULL,'content11',8,NULL),(13,'title12','descrip12',200,'2023-07-02 12:49:42','2023-07-03 16:57:53',0,'Medium','Topic12',5.0,NULL,'content12',9,NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_buyers_user`
--

DROP TABLE IF EXISTS `course_buyers_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_buyers_user` (
  `courseCourseId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`courseCourseId`,`userId`),
  KEY `IDX_feb40149984a29362a5d1c3fff` (`courseCourseId`),
  KEY `IDX_a07aca032b82ff57c8122400ca` (`userId`),
  CONSTRAINT `FK_a07aca032b82ff57c8122400cae` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_feb40149984a29362a5d1c3fff2` FOREIGN KEY (`courseCourseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_buyers_user`
--

LOCK TABLES `course_buyers_user` WRITE;
/*!40000 ALTER TABLE `course_buyers_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_buyers_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `purchaseId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `reviewed` tinyint NOT NULL DEFAULT '0',
  `commented` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`purchaseId`),
  KEY `FK_33520b6c46e1b3971c0a649d38b` (`userId`),
  KEY `FK_de02d16582b8f768a0a9cf3cb00` (`courseId`),
  CONSTRAINT `FK_33520b6c46e1b3971c0a649d38b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_de02d16582b8f768a0a9cf3cb00` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,9,3,'2023-07-01 17:26:39.056426','2023-07-01 17:26:39.056426',0,0),(2,9,4,'2023-07-01 17:29:43.186832','2023-07-01 17:29:43.186832',0,0),(3,10,3,'2023-07-01 17:30:29.708147','2023-07-01 17:30:29.708147',0,0),(4,10,NULL,'2023-07-01 17:34:44.381629','2023-07-01 17:34:44.000000',0,0),(5,10,1,'2023-07-01 17:36:28.056830','2023-07-01 17:36:28.056830',0,0),(6,10,4,'2023-07-01 17:37:02.133159','2023-07-01 17:37:02.133159',0,0),(7,8,1,'2023-07-01 18:13:13.030277','2023-07-01 18:13:13.030277',0,0),(8,9,1,'2023-07-02 11:47:50.390172','2023-07-02 11:47:50.390172',0,0),(9,9,5,'2023-07-02 12:04:48.552076','2023-07-02 12:04:48.552076',0,0),(10,9,6,'2023-07-02 12:13:10.736099','2023-07-02 12:13:10.736099',0,0),(11,9,7,'2023-07-02 12:13:59.576938','2023-07-02 12:13:59.576938',0,0),(12,8,5,'2023-07-03 22:09:03.684832','2023-07-03 22:09:03.684832',0,0);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `wallet` int NOT NULL DEFAULT '1000',
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'adm_name','adm_surname',1000,'$2b$10$NykqmBJIzSWzObQen28tYuLH17OH4GNnLGO7PzpKhAuzBHsfGPc/K','adm@example.com','bio adm example','2023-06-23 16:18:58','2023-06-23 16:24:10','admin'),(8,'usr8','usr4_surname',806,'$2b$10$LU3imZFtdQM3uY2puamchOPRjOaLL2Ix.o1npAlPAS12VZCeNq7cq','usr4@example.com','user8update','2023-06-24 19:07:21','2023-07-03 22:09:06','user'),(9,'usr5_name','usr5_surname',100,'$2b$10$5fQXBgX4bQ/eR8sehAKusuIw9lCrmUiQkJrRa1DIzE1JV8D3pkfj2','usr5@example.com','','2023-06-26 20:36:17','2023-07-03 22:06:29','user'),(10,'usr6_name','usr6_surname',1000,'$2b$10$GxbmHw.Q6kHVsFfi4s066.RLC7OInIU/IBrh35lllWDAd1X3i8kpG','usr6@example.com','','2023-06-26 22:22:43','2023-06-26 22:22:43','user'),(13,'usr7_name','usr7_surname',1000,'$2b$10$0b.R.BP3fG1RkasxRijkfu1iekqYiXIFk3DEgvMkRMj3ZTvYkP78.','usr7@example.com','','2023-07-01 18:30:39','2023-07-01 18:30:39','user'),(14,'usr8_name','usr8_surname',1000,'$2b$10$BmRtQyvPnKOmwooNrxp10OrzUKKQlI6DlfPCzoDE/xqNU00B49286','usr8@example.com','','2023-07-03 16:00:08','2023-07-03 16:00:08','user'),(16,'usr9_name','usr9_surname',1000,'$2b$10$VHwhQ0ToEcdBDgYgbIOMAen116RHcUY8VFSzeso5gnoHchGrutUru','usr9@example.com','','2023-07-03 22:13:51','2023-07-03 22:13:51','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'u-know'
--

--
-- Dumping routines for database 'u-know'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-04  8:13:51
