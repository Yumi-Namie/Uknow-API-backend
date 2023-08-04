/*CREATE DATABASE  IF NOT EXISTS `u-know` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
/*USE `u-know`;
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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_envia` int DEFAULT NULL,
  `usuario_recibe` int DEFAULT NULL,
  `mensaje` text,
  `fecha_envio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contenidos_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chat_usuarios_envia_idx` (`usuario_envia`),
  KEY `fk_chat_usuarios_recibe_idx` (`usuario_recibe`),
  KEY `fk_chat_contenidos1_idx` (`contenidos_id`),
  CONSTRAINT `fk_chat_contenidos1` FOREIGN KEY (`contenidos_id`) REFERENCES `contenidos` (`id`),
  CONSTRAINT `fk_chat_usuarios_envia` FOREIGN KEY (`usuario_envia`) REFERENCES `usuarios_registrados` (`id`),
  CONSTRAINT `fk_chat_usuarios_recibe` FOREIGN KEY (`usuario_recibe`) REFERENCES `usuarios_registrados` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `contenido_id` int DEFAULT NULL,
  `fecha_compra` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_compras_usuarios_idx` (`usuario_id`),
  KEY `fk_compras_contenidos_idx` (`contenido_id`),
  CONSTRAINT `fk_compras_contenidos` FOREIGN KEY (`contenido_id`) REFERENCES `contenidos` (`id`),
  CONSTRAINT `fk_compras_usuarios` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_registrados` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenidos`
--

DROP TABLE IF EXISTS `contenidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(244) DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL DEFAULT '10.00',
  `visualizaciones` int DEFAULT '0',
  `votos` int DEFAULT '0',
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `aprobado` tinyint DEFAULT '0',
  `usuarios_registrados_id` int NOT NULL,
  `dificultad_id` int NOT NULL,
  `tematica_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contenidos_usuarios_registrados1_idx` (`usuarios_registrados_id`),
  KEY `fk_contenidos_dificultad1_idx` (`dificultad_id`),
  KEY `fk_contenidos_tematica1_idx` (`tematica_id`),
  CONSTRAINT `fk_contenidos_dificultad1` FOREIGN KEY (`dificultad_id`) REFERENCES `dificultad` (`id`),
  CONSTRAINT `fk_contenidos_tematica1` FOREIGN KEY (`tematica_id`) REFERENCES `tematica` (`id`),
  CONSTRAINT `fk_contenidos_usuarios_registrados1` FOREIGN KEY (`usuarios_registrados_id`) REFERENCES `usuarios_registrados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenidos`
--

LOCK TABLES `contenidos` WRITE;
/*!40000 ALTER TABLE `contenidos` DISABLE KEYS */;
INSERT INTO `contenidos` VALUES (1,'Introducción a la programación','Aprende los fundamentos de la programación y cómo resolver problemas',0.02,0,0,'2023-06-05 21:22:59','2023-06-06 15:54:53',1,23,1,1),(2,'Desarrollo web con HTML y CSS','Aprende a crear páginas web utilizando HTML y CSS',0.02,0,0,'2023-06-05 21:22:59','2023-06-06 15:54:53',1,10,2,2),(3,'Programación en Python','Descubre el lenguaje de programación Python y sus aplicaciones',0.02,0,0,'2023-06-05 21:22:59','2023-06-06 15:54:53',1,7,1,3),(4,'Desarrollo de aplicaciones móviles','Aprende a desarrollar aplicaciones móviles para iOS y Android',0.02,0,0,'2023-06-05 21:22:59','2023-06-06 15:54:53',1,42,2,4),(5,'Inteligencia Artificial y Machine Learning','Sumérgete en el mundo de la IA y el aprendizaje automático',0.02,0,0,'2023-06-05 21:22:59','2023-06-06 15:54:53',1,18,3,5),(6,'Bases de datos y SQL','Aprende a manejar bases de datos y consulta datos utilizando SQL',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,35,2,6),(7,'Desarrollo de videojuegos','Aprende a crear tus propios videojuegos desde cero',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,12,3,7),(8,'Programación orientada a objetos','Dominio de la programación orientada a objetos y sus conceptos',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,29,2,8),(9,'Desarrollo de aplicaciones con JavaScript','Aprende a desarrollar aplicaciones web utilizando JavaScript',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,6,2,9),(10,'Ciberseguridad y hacking ético','Descubre los fundamentos de la ciberseguridad y el hacking ético',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,43,3,10),(11,'Desarrollo de aplicaciones con Java','Aprende a desarrollar aplicaciones utilizando el lenguaje Java',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,19,2,11),(12,'Big Data y análisis de datos','Explora las técnicas para trabajar con grandes volúmenes de datos',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,15,3,12),(13,'Desarrollo de aplicaciones con C++','Aprende a desarrollar aplicaciones utilizando el lenguaje C++',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,28,2,13),(14,'Programación funcional','Descubre la programación funcional y sus paradigmas',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,8,2,14),(15,'Desarrollo de aplicaciones con Ruby','Aprende a desarrollar aplicaciones utilizando el lenguaje Ruby',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,37,1,15),(16,'Automatización de tareas con scripting','Automatiza tareas repetitivas utilizando scripts',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,21,1,16),(17,'Desarrollo de aplicaciones con PHP','Aprende a desarrollar aplicaciones web utilizando PHP',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,16,2,17),(18,'Visualización de datos','Descubre las técnicas para visualizar y representar datos de forma efectiva',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,31,1,18),(19,'Desarrollo de aplicaciones con Swift','Aprende a desarrollar aplicaciones para iOS utilizando el lenguaje Swift',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,9,2,19),(20,'Programación de sistemas embebidos','Explora la programación de sistemas embebidos y sus aplicaciones',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,24,3,20),(21,'Introducción a la programación','Aprende los fundamentos de la programación y cómo resolver problemas',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,13,1,1),(22,'Desarrollo web con HTML y CSS','Aprende a crear páginas web utilizando HTML y CSS',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,30,2,2),(23,'Programación en Python','Descubre el lenguaje de programación Python y sus aplicaciones',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,17,1,3),(24,'Desarrollo de aplicaciones móviles','Aprende a desarrollar aplicaciones móviles para iOS y Android',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,44,2,4),(25,'Inteligencia Artificial y Machine Learning','Sumérgete en el mundo de la IA y el aprendizaje automático',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,22,3,5),(26,'Bases de datos y SQL','Aprende a manejar bases de datos y consulta datos utilizando SQL',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,33,2,6),(27,'Desarrollo de videojuegos','Aprende a crear tus propios videojuegos desde cero',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,11,3,7),(28,'Programación orientada a objetos','Dominio de la programación orientada a objetos y sus conceptos',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,26,2,8),(29,'Desarrollo de aplicaciones con JavaScript','Aprende a desarrollar aplicaciones web utilizando JavaScript',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,3,2,9),(30,'Ciberseguridad y hacking ético','Descubre los fundamentos de la ciberseguridad y el hacking ético',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,49,3,10),(31,'Desarrollo de aplicaciones con Java','Aprende a desarrollar aplicaciones utilizando el lenguaje Java',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,20,2,11),(32,'Big Data y análisis de datos','Explora las técnicas para trabajar con grandes volúmenes de datos',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,14,3,12),(33,'Desarrollo de aplicaciones con C++','Aprende a desarrollar aplicaciones utilizando el lenguaje C++',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,27,2,13),(34,'Programación funcional','Descubre la programación funcional y sus paradigmas',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,5,2,14),(35,'Desarrollo de aplicaciones con Ruby','Aprende a desarrollar aplicaciones utilizando el lenguaje Ruby',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,38,1,15),(36,'Automatización de tareas con scripting','Automatiza tareas repetitivas utilizando scripts',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,23,1,16),(37,'Desarrollo de aplicaciones con PHP','Aprende a desarrollar aplicaciones web utilizando PHP',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,18,2,17),(38,'Visualización de datos','Descubre las técnicas para visualizar y representar datos de forma efectiva',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,32,1,18),(39,'Desarrollo de aplicaciones con Swift','Aprende a desarrollar aplicaciones para iOS utilizando el lenguaje Swift',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,10,2,19),(40,'Programación de sistemas embebidos','Explora la programación de sistemas embebidos y sus aplicaciones',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,25,3,20),(41,'Introducción a la programación','Aprende los fundamentos de la programación y cómo resolver problemas',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,14,1,1),(42,'Desarrollo web con HTML y CSS','Aprende a crear páginas web utilizando HTML y CSS',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,31,2,2),(43,'Programación en Python','Descubre el lenguaje de programación Python y sus aplicaciones',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,18,1,3),(44,'Desarrollo de aplicaciones móviles','Aprende a desarrollar aplicaciones móviles para iOS y Android',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,45,2,4),(45,'Inteligencia Artificial y Machine Learning','Sumérgete en el mundo de la IA y el aprendizaje automático',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,21,3,5),(46,'Bases de datos y SQL','Aprende a manejar bases de datos y consulta datos utilizando SQL',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,36,2,6),(47,'Desarrollo de videojuegos','Aprende a crear tus propios videojuegos desde cero',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,13,3,7),(48,'Programación orientada a objetos','Dominio de la programación orientada a objetos y sus conceptos',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,30,2,8),(49,'Desarrollo de aplicaciones con JavaScript','Aprende a desarrollar aplicaciones web utilizando JavaScript',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,7,2,9),(50,'Ciberseguridad y hacking ético','Descubre los fundamentos de la ciberseguridad y el hacking ético',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,50,3,10),(51,'Desarrollo de aplicaciones con Java','Aprende a desarrollar aplicaciones utilizando el lenguaje Java',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,22,2,11),(52,'Big Data y análisis de datos','Explora las técnicas para trabajar con grandes volúmenes de datos',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,16,3,12),(53,'Desarrollo de aplicaciones con C++','Aprende a desarrollar aplicaciones utilizando el lenguaje C++',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,29,2,13),(54,'Programación funcional','Descubre la programación funcional y sus paradigmas',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,6,2,14),(55,'Desarrollo de aplicaciones con Ruby','Aprende a desarrollar aplicaciones utilizando el lenguaje Ruby',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,39,1,15),(56,'Automatización de tareas con scripting','Automatiza tareas repetitivas utilizando scripts',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,24,1,16),(57,'Desarrollo de aplicaciones con PHP','Aprende a desarrollar aplicaciones web utilizando PHP',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,19,2,17),(58,'Visualización de datos','Descubre las técnicas para visualizar y representar datos de forma efectiva',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,33,1,18),(59,'Desarrollo de aplicaciones con Swift','Aprende a desarrollar aplicaciones para iOS utilizando el lenguaje Swift',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,11,2,19),(60,'Programación de sistemas embebidos','Explora la programación de sistemas embebidos y sus aplicaciones',0.02,0,0,'2023-06-05 21:25:13','2023-06-06 15:54:53',1,26,3,20);
/*!40000 ALTER TABLE `contenidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `contenidos_BEFORE_UPDATE` BEFORE UPDATE ON `contenidos` FOR EACH ROW BEGIN
	IF (new.visualizaciones != old.visualizaciones) or (new.votos != old.votos) THEN
        SET new.precio = old.precio + new.votos + new.visualizaciones;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `detalle_contenido`
--

DROP TABLE IF EXISTS `detalle_contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_contenido` (
  `descripcion_capitulo` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `capitulo` varchar(255) DEFAULT NULL,
  `orden` int NOT NULL,
  `duracion` time NOT NULL DEFAULT '01:00:00',
  `contenidos_id` int NOT NULL,
  PRIMARY KEY (`id`,`contenidos_id`),
  KEY `fk_detalle_contenido_contenidos1_idx` (`contenidos_id`),
  CONSTRAINT `fk_detalle_contenido_contenidos1` FOREIGN KEY (`contenidos_id`) REFERENCES `contenidos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_contenido`
--

LOCK TABLES `detalle_contenido` WRITE;
/*!40000 ALTER TABLE `detalle_contenido` DISABLE KEYS */;
INSERT INTO `detalle_contenido` VALUES ('Aprende a construir aplicaciones web dinámicas utilizando el lenguaje de programación PHP.',205,'Introducción PHP',3,'01:00:00',18),('Explora los conceptos y técnicas de visualización de datos para representar información de manera efectiva.',206,'Introducción Visualización de datos',3,'01:00:00',19),('Aprende a desarrollar aplicaciones para iOS utilizando el lenguaje de programación Swift.',207,'Introducción Swift',3,'01:00:00',20),('Sumérgete en el mundo del Big Data y aprende a analizar y procesar grandes volúmenes de datos.',208,'Principios Big Data ',3,'01:00:00',12),('Desarrolla aplicaciones utilizando el lenguaje de programación C++ y aprovecha su potencia y versatilidad.',209,'Desarrollo de aplicaciones con C--',3,'01:00:00',13),('Explora los conceptos y técnicas de la programación funcional y aprende a aplicarlos en tus proyectos.',210,'Introducción a la Programación funcional',3,'01:00:00',14),('Aprende a desarrollar aplicaciones utilizando el lenguaje de programación Ruby y su framework Ruby on Rails.',211,'Introducción Ruby',3,'01:00:00',15),('Automatiza tareas repetitivas utilizando scripting y desarrolla soluciones eficientes.',212,'Automatización de tareas',3,'01:00:00',16),('Desarrolla aplicaciones utilizando el lenguaje de programación Java y su amplia variedad de librerías y herramientas.',213,'Introducción Java',3,'01:00:00',11),('Aprende los fundamentos de la programación y adquiere habilidades para resolver problemas con algoritmos.',214,'Introducción a la programación',1,'01:00:00',1),('Desarrolla habilidades en HTML y CSS para construir sitios web modernos y atractivos.',215,'Desarrollo web con HTML y CSS',2,'01:00:00',2),('Sumérgete en el mundo de la programación en Python y descubre su versatilidad y simplicidad.',216,'Introducción Python',3,'01:00:00',3),('Aprende a crear aplicaciones móviles para dispositivos iOS y Android utilizando frameworks populares.',217,'Desarrollo de aplicaciones móviles',4,'01:00:00',4),('Explora los fundamentos y aplicaciones de la inteligencia artificial y el aprendizaje automático.',218,'Inteligencia Artificial y Machine Learning',5,'01:00:00',5),('Aprende los conceptos y técnicas fundamentales de las bases de datos y el lenguaje SQL.',219,'Bases de datos y SQL',1,'01:00:00',6),('Sumérgete en el mundo del desarrollo de videojuegos y aprende a crear tus propios juegos.',220,'Desarrollo de videojuegos',2,'01:00:00',7),('Dominar los conceptos y principios de la programación orientada a objetos para desarrollar aplicaciones robustas.',221,'Programación orientada a objetos',3,'01:00:00',8),('Desarrolla aplicaciones interactivas y dinámicas en el navegador utilizando JavaScript y sus frameworks.',222,'Introducción JavaScript',4,'01:00:00',9),('Aprende sobre ciberseguridad, ética hacker y técnicas para proteger sistemas y redes.',223,'Ciberseguridad y hacking ético',5,'01:00:00',10),('Desarrolla aplicaciones utilizando el lenguaje de programación Java y su amplia variedad de librerías y herramientas.',224,'Desarrollo de aplicaciones con Java',6,'01:00:00',11),('Explora el mundo del Big Data y aprende a analizar y procesar grandes volúmenes de información.',225,'Dnálisis de datos',7,'01:00:00',12),('Desarrolla aplicaciones utilizando el lenguaje de programación C++ y aprovecha su potencia y rendimiento.',226,'Desarrollo de aplicaciones con C++',8,'01:00:00',13),('Aprende los conceptos y técnicas de la programación funcional y aplícalos en tus proyectos.',227,'Programación funcional',9,'01:00:00',14),('Desarrolla aplicaciones utilizando el lenguaje de programación Ruby y su framework Ruby on Rails.',228,'Desarrollo de aplicaciones con Ruby',10,'01:00:00',15),('Automatiza tareas repetitivas y optimiza procesos utilizando scripting y lenguajes de automatización.',229,'Aprende scripting',11,'01:00:00',16),('Desarrolla aplicaciones web dinámicas utilizando el lenguaje de programación PHP y sus frameworks.',230,'Desarrollo de aplicaciones con PHP',12,'01:00:00',18),('Explora los conceptos y técnicas de visualización de datos para representar información de manera efectiva.',231,'Visualización de datos',13,'01:00:00',19),('Aprende a desarrollar aplicaciones para iOS utilizando el lenguaje de programación Swift.',232,'Desarrollo de aplicaciones con Swift',14,'01:00:00',20),('Explora los conceptos y técnicas de la programación en C# y su uso en el desarrollo de aplicaciones.',233,'Programación en C#',15,'01:00:00',21),('Desarrolla habilidades en el uso de frameworks y herramientas para el desarrollo web en el entorno de Node.js.',234,'Desarrollo web con Node.js',16,'01:00:00',22),('Aprende a utilizar el framework Django para el desarrollo rápido y eficiente de aplicaciones web.',235,'Desarrollo web con Django',17,'01:00:00',23),('Explora los conceptos y técnicas de la programación en Kotlin y su uso en el desarrollo de aplicaciones Android.',236,'Programación en Kotlin',18,'01:00:00',24),('Desarrolla aplicaciones web modernas utilizando el framework Angular y aprovecha su potencia y flexibilidad.',237,'Desarrollo web con Angular',19,'01:00:00',25),('Aprende a construir aplicaciones nativas para Android utilizando el lenguaje de programación Java.',238,'Desarrollo de aplicaciones Android con Java',20,'01:00:00',26),('Explora los conceptos y técnicas de la programación en TypeScript y su uso en el desarrollo de aplicaciones web.',239,'Programación en TypeScript',21,'01:00:00',27),('Desarrolla habilidades en el uso de frameworks y herramientas para el desarrollo web en el entorno de Ruby.',240,'Desarrollo web con Ruby',22,'01:00:00',28),('Aprende a utilizar el framework Flask para el desarrollo rápido y eficiente de aplicaciones web en Python.',241,'Desarrollo web con Flask',23,'01:00:00',29),('Explora los conceptos y técnicas de la programación en Go y su uso en el desarrollo de aplicaciones.',242,'Programación en Go',24,'01:00:00',30),('Desarrolla aplicaciones móviles multiplataforma utilizando el framework React Native.',243,'Desarrollo de aplicaciones móviles con React Native',25,'01:00:00',31),('Aprende a construir aplicaciones web escalables y de alto rendimiento utilizando el framework Laravel.',244,'Desarrollo web con Laravel',26,'01:00:00',32),('Explora los conceptos y técnicas de la programación en Rust y su uso en el desarrollo de aplicaciones.',245,'Programación en Rust',27,'01:00:00',33),('Desarrolla habilidades en el uso de frameworks y herramientas para el desarrollo web en el entorno de Vue.js.',246,'Desarrollo web con Vue.js',28,'01:00:00',34),('Aprende a utilizar el framework Express para el desarrollo de aplicaciones web en Node.js.',247,'Desarrollo web con Express',29,'01:00:00',35),('Explora los conceptos y técnicas de la programación en Swift y su uso en el desarrollo de aplicaciones iOS.',248,'Programación en Swift',30,'01:00:00',36),('Descubre los conceptos y técnicas de la programación en PHP y su uso en el desarrollo web.',249,'Programación en PHP',31,'01:00:00',37),('Aprende a utilizar el framework Spring para el desarrollo de aplicaciones empresariales en Java.',250,'Introducción Spring',32,'01:00:00',38),('Explora los conceptos y técnicas de la programación en JavaScript y su uso en el desarrollo web.',251,'Programación en JavaScript',33,'01:00:00',39),('Desarrolla aplicaciones web escalables utilizando el framework Ruby on Rails.',252,'Desarrollo web con Ruby on Rails',34,'01:00:00',40),('Aprende a utilizar el framework ASP.NET para el desarrollo de aplicaciones web en C#.',253,'Desarrollo web con ASP.NET',35,'01:00:00',41),('Explora los conceptos y técnicas de la programación en C y su uso en el desarrollo de aplicaciones.',254,'Programación en C',36,'01:00:00',42),('Desarrolla habilidades en el uso de frameworks y herramientas para el desarrollo web en el entorno de React.js.',255,'Desarrollo web con React.js',37,'01:00:00',43),('Aprende a utilizar el framework Laravel para el desarrollo de aplicaciones web en PHP.',256,'Desarrollo web con Laravel',38,'01:00:00',44),('Explora los conceptos y técnicas de la programación en Python y su uso en el desarrollo de aplicaciones.',257,'Programación en Python',39,'01:00:00',45),('Desarrolla aplicaciones móviles nativas para iOS utilizando el lenguaje de programación Swift.',258,'Desarrollo de aplicaciones iOS con Swift',40,'01:00:00',46);
/*!40000 ALTER TABLE `detalle_contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dificultad`
--

DROP TABLE IF EXISTS `dificultad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dificultad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_dificultad` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dificultad`
--

LOCK TABLES `dificultad` WRITE;
/*!40000 ALTER TABLE `dificultad` DISABLE KEYS */;
INSERT INTO `dificultad` VALUES (1,'facil'),(2,'medio'),(3,'dificil');
/*!40000 ALTER TABLE `dificultad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tematica`
--

DROP TABLE IF EXISTS `tematica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tematica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_tematica` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tematica`
--

LOCK TABLES `tematica` WRITE;
/*!40000 ALTER TABLE `tematica` DISABLE KEYS */;
INSERT INTO `tematica` VALUES (1,'Introducción a la programación'),(2,'Desarrollo web con HTML y CSS'),(3,'Programación en Python'),(4,'Desarrollo de aplicaciones móviles'),(5,'Inteligencia Artificial y Machine Learning'),(6,'Bases de datos y SQL'),(7,'Desarrollo de videojuegos'),(8,'Programación orientada a objetos'),(9,'Desarrollo de aplicaciones con JavaScript'),(10,'Ciberseguridad y hacking ético'),(11,'Desarrollo de aplicaciones con Java'),(12,'Big Data y análisis de datos'),(13,'Desarrollo de aplicaciones con C++'),(14,'Programación funcional'),(15,'Desarrollo de aplicaciones con Ruby'),(16,'Automatización de tareas con scripting'),(17,'Desarrollo de aplicaciones con PHP'),(18,'Visualización de datos'),(19,'Desarrollo de aplicaciones con Swift'),(20,'Programación de sistemas embebidos');
/*!40000 ALTER TABLE `tematica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_registrados`
--

DROP TABLE IF EXISTS `usuarios_registrados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_registrados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `saldo` decimal(10,2) NOT NULL DEFAULT '1000.00',
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `bio` varchar(225) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_registrados`
--

LOCK TABLES `usuarios_registrados` WRITE;
/*!40000 ALTER TABLE `usuarios_registrados` DISABLE KEYS */;
INSERT INTO `usuarios_registrados` VALUES (1,'Juan','Pérez',1000.00,'pass1','juan@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(2,'María','López',1000.00,'pass2','maria@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(3,'Pedro','Gómez',1000.00,'pass3','pedro@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(4,'Laura','Sánchez',1000.00,'pass4','laura@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(5,'Carlos','González',1000.00,'pass5','carlos@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(6,'Ana','Martínez',1000.00,'pass6','ana@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(7,'Luis','Rodríguez',1000.00,'pass7','luis@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(8,'Sofía','Hernández',1000.00,'pass8','sofia@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(9,'Diego','García',1000.00,'pass9','diego@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(10,'Valeria','Flores',1000.00,'pass10','valeria@example.com',NULL,'2023-06-05 12:40:27','2023-06-05 12:40:27'),(11,'Jorge','Hernández',1000.00,'pass11','jorge@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(12,'Isabel','Vargas',1000.00,'pass12','isabel@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(13,'Gabriel','Luna',1000.00,'pass13','gabriel@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(14,'Mariana','Ortega',1000.00,'pass14','mariana@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(15,'Adrián','Ramos',1000.00,'pass15','adrian@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(16,'Carmen','Silva',1000.00,'pass16','carmen@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(17,'Roberto','Pineda',1000.00,'pass17','roberto@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(18,'Alejandra','Mendoza',1000.00,'pass18','alejandra@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(19,'Fernando','Santos',1000.00,'pass19','fernando@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(20,'Daniela','Cortés',1000.00,'pass20','daniela@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(21,'Rodrigo','Jiménez',1000.00,'pass21','rodrigo@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(22,'Valentina','Peña',1000.00,'pass22','valentina@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(23,'Emilio','Montes',1000.00,'pass23','emilio@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(24,'Renata','Guzmán',1000.00,'pass24','renata@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(25,'Hugo','Soto',1000.00,'pass25','hugo@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(26,'Lucía','Fuentes',1000.00,'pass26','lucia@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(27,'Francisco','Ríos',1000.00,'pass27','francisco@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(28,'Victoria','Navarro',1000.00,'pass28','victoria@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(29,'Eduardo','Chávez',1000.00,'pass29','eduardo@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(30,'Paulina','Barrera',1000.00,'pass30','paulina@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(31,'Santiago','Molina',1000.00,'pass31','santiago@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(32,'Camila','Gallardo',1000.00,'pass32','camila@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(33,'Maximiliano','Ibarra',1000.00,'pass33','maximiliano@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(34,'Ximena','Delgado',1000.00,'pass34','ximena@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(35,'Andrés','Salazar',1000.00,'pass35','andres@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(36,'Natalia','Vera',1000.00,'pass36','natalia@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(37,'Felipe','Cruz',1000.00,'pass37','felipe@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(38,'Constanza','Paredes',1000.00,'pass38','constanza@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(39,'Juan Pablo','Rojas',1000.00,'pass39','juanpablo@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(40,'Margarita','Valenzuela',1000.00,'pass40','margarita@example.com',NULL,'2023-06-05 12:39:51','2023-06-05 12:39:51'),(41,'Sara','Gomez',1000.00,'mypassword41','sara.gomez@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(42,'Daniel','Hernandez',1000.00,'mypassword42','daniel.hernandez@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(43,'Laura','Silva',1000.00,'mypassword43','laura.silva@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(44,'Carlos','Garcia',1000.00,'mypassword44','carlos.garcia@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(45,'Ana','Fernandez',1000.00,'mypassword45','ana.fernandez@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(46,'Pedro','Vargas',1000.00,'mypassword46','pedro.vargas@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(47,'Maria','Lopez',1000.00,'mypassword47','maria.lopez@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(48,'Manuel','Ortega',1000.00,'mypassword48','manuel.ortega@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(49,'Elena','Rojas',1000.00,'mypassword49','elena.rojas@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04'),(50,'Javier','Mendoza',1000.00,'mypassword50','javier.mendoza@example.com',NULL,'2023-06-05 12:42:04','2023-06-05 12:42:04');
/*!40000 ALTER TABLE `usuarios_registrados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoraciones`
--

DROP TABLE IF EXISTS `valoraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoraciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `contenido_id` int NOT NULL,
  `valoracion` int DEFAULT NULL,
  `comentario` text,
  `fecha_valoracion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_valoraciones_usuarios_idx` (`usuario_id`),
  KEY `fk_valoraciones_contenidos_idx` (`contenido_id`),
  CONSTRAINT `fk_valoraciones_contenidos` FOREIGN KEY (`contenido_id`) REFERENCES `contenidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_valoraciones_usuarios` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_registrados` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoraciones`
--

LOCK TABLES `valoraciones` WRITE;
/*!40000 ALTER TABLE `valoraciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `valoraciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'u-know'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `contenidos_programacion` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `contenidos_programacion` ON SCHEDULE EVERY 5 MINUTE STARTS '2023-06-02 14:24:53' ON COMPLETION NOT PRESERVE ENABLE DO CALL resta_contenidos */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'u-know'
--
/*!50003 DROP PROCEDURE IF EXISTS `resta_contenidos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `resta_contenidos`()
BEGIN
 UPDATE `u-know`.contenidos set precio = round(precio -(precio *(20/100)),2) where fecha_actualizacion >=
 now() - interval 1 day; #Decrease 20% y baja el precio de los contenidos sin visualizaciones durante 1 dia.
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-15 12:41:02
