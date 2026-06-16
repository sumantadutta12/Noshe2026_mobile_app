-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: noshe_event2026
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_uid` varchar(85) DEFAULT NULL,
  `admin_username` varchar(105) DEFAULT NULL,
  `admin_password` varchar(225) DEFAULT NULL,
  `admin_token` varchar(225) DEFAULT NULL,
  `admin_status` int DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'d6c359aa-c54d-498c-96d8-b7c7705959b5','admin26event','$2b$10$yd6BicKpQWUDGLZHOJgNY.aTj/Et8Qbb2NjQeH4ZX1/7BSq.ffdY6',NULL,0,'2026-06-10 20:24:32'),(2,'5e860ade-1d09-43ea-9dff-3e830a1a7293','admin25event','$2b$12$e6YwR7SjG8vM0vX2mT9xZe6B2q9LpZ4mO3nK7rW5vX8yT2mK9xZe6',NULL,NULL,'2026-06-13 15:47:36');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_session`
--

DROP TABLE IF EXISTS `event_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_session` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `session_categories` varchar(105) DEFAULT NULL,
  `session_timeline` varchar(85) DEFAULT NULL,
  `session_tenure` int DEFAULT NULL,
  `session_halls` varchar(105) DEFAULT NULL,
  `session_day` varchar(45) DEFAULT NULL,
  `session_track` int DEFAULT NULL,
  `session_details` varchar(225) DEFAULT NULL,
  `session_date` varchar(65) DEFAULT NULL,
  `session_image` varchar(225) DEFAULT NULL,
  `favorite` int DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_session`
--

LOCK TABLES `event_session` WRITE;
/*!40000 ALTER TABLE `event_session` DISABLE KEYS */;
INSERT INTO `event_session` VALUES (1,'Inaugural session','10:00 - 11.30',NULL,'Saraswati Auditorium','Day 1',1,NULL,'Fri, July 3,2026',NULL,1),(2,'Refreshment Break','11:30 - 12:00',NULL,'Saraswati Auditorium','Day 1',NULL,NULL,'Fri, July 3,2026',NULL,1),(3,'Planery 1:opening Planery','12:00 - 12:30',NULL,NULL,'Day 1',NULL,'Strategies for integrating ESG frameworkwith SHE for sustainable workplace','Fri, July 3,2026',NULL,NULL),(4,'NETWORKING LUNCH','13:100 - 14:00',NULL,NULL,'Day 1',NULL,NULL,'Fri, July 3,2026',NULL,NULL),(5,'Technical Session 1: Environment','14:00 - 15:15',NULL,NULL,'Day 1',NULL,'Environment Protection and Management --Source to Sink approach','Fri, July 3,2026',NULL,NULL),(6,'REFRESHMENT BREAK','15:15 - 15:45',NULL,NULL,'Day 1',NULL,NULL,'Fri, July 3,2026',NULL,NULL),(7,'Planery 2: Industry Planery (safety)','15:45 - 17:00',NULL,NULL,'Day 1',NULL,'Zero Harm: Shaping Workplace Safety through Culture and values','Fri, July 3,2026',NULL,NULL),(8,'Planery 3: Health','17:00 - 18:15',NULL,NULL,'Day 1',NULL,'Occupational Health &Safety: A strategic approach to workplace wellness','Fri, July 3,2026',NULL,NULL),(9,'EVENING SESSION','18:15 - 19:00',NULL,NULL,'Day 1',NULL,NULL,'Fri, July 3,2026',NULL,NULL),(10,'MEDITATION &SELF REALISATION SESSION','09:00 - 09:30',NULL,'Saraswati Auditorium','Day 2',NULL,NULL,'Fri, July 4,2026',NULL,NULL),(11,'Technical Session 2: Technical Safety','09:30 - 10:30',NULL,NULL,'Day 2',NULL,'Sustanability ClimateAction, circular economy & Green Innovations','Fri, July 4,2026',NULL,NULL),(12,'Technical Session 3: AI (Health & Safety)','10:30 - 11:30',NULL,NULL,'Day 2',NULL,'Transforming workplace Occupational health & safety through AI & DIgital Innovation','Fri, July 4,2026',NULL,NULL),(13,'REFRESHMENT BREAK','11:30 - 11:50',NULL,NULL,'Day 2',NULL,NULL,'Fri, July 4,2026',NULL,NULL),(14,'Plenary 4: Safety','11:50 - 13:00',NULL,NULL,'Day 2',NULL,'Emergency Preparedness:Amalgamation of Experience, Framework & Technology','Fri, July 4,2026',NULL,NULL),(15,'NETWORKING LUNCH','13:00 - 14:00',NULL,NULL,'Day 2',NULL,NULL,'Fri, July 4,2026',NULL,NULL),(16,'Technical Sesion 4: Environment','14:00 - 15:00',NULL,NULL,'Day 2',NULL,'Credible ESG System:Data ,Assurance, and DigitalCompliance Platforms','Fri, July 4,2026',NULL,NULL),(17,'REFRESHMENT BREAK','15:00 -15:20',NULL,NULL,'Day 2',NULL,NULL,'Fri, July 4,2026',NULL,NULL),(18,'Closing Plenary & Valedictory','15:20 - 16:45',NULL,NULL,'Day 2',NULL,'Reflection: Pathway to organisational sustanability in SHE context','Fri, July 4,2026',NULL,NULL);
/*!40000 ALTER TABLE `event_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_session_speakers`
--

DROP TABLE IF EXISTS `event_session_speakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_session_speakers` (
  `event_session_id` int NOT NULL AUTO_INCREMENT,
  `session_id` int DEFAULT NULL,
  `speaker_name` varchar(105) DEFAULT NULL,
  `speaker_designation` varchar(45) DEFAULT NULL,
  `speaker_company` varchar(105) DEFAULT NULL,
  `speaker_image` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`event_session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_session_speakers`
--

LOCK TABLES `event_session_speakers` WRITE;
/*!40000 ALTER TABLE `event_session_speakers` DISABLE KEYS */;
INSERT INTO `event_session_speakers` VALUES (1,3,'Sri. Gurdeep Singh','Chairman Managing Director','NTPC LTD','http://localhost:3001/images/thumbnail.png'),(2,3,'Sri. Ravindra Kumar','Director(Operations)','NTPC Ltd','http://localhost:3001/images/thumbnail2.png'),(4,2,'Sri. Ravindra Kumar','Director(Operations)','NTPC Ltd','http://localhost:3001/images/thumbnail2.png');
/*!40000 ALTER TABLE `event_session_speakers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(225) DEFAULT NULL,
  `event_venue` varchar(225) DEFAULT NULL,
  `event_time` datetime DEFAULT NULL,
  `event_status` int DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `member_name` varchar(65) DEFAULT NULL,
  `email_id` varchar(105) DEFAULT NULL,
  `mobile_no` varchar(105) DEFAULT NULL,
  `member_pic` varchar(225) DEFAULT NULL,
  `member_designation` varchar(65) DEFAULT NULL,
  `member_company` varchar(105) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `email_id_UNIQUE` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Shri. Gurdeep Singh','neelammahato3@gmail.com','9786564534',NULL,'Chairman & Managing Director','NTPC Limited','2026-06-10 03:34:25'),(2,'Shri. Ravindra Kumar','sumantadutta172@gmail.com','9675453423',NULL,'Director(Operations)','NTPC Limited','2026-06-10 03:35:43');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registered_members`
--

DROP TABLE IF EXISTS `registered_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registered_members` (
  `register_id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) DEFAULT NULL,
  `name` varchar(65) DEFAULT NULL,
  `email_id` varchar(105) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `message` varchar(225) DEFAULT NULL,
  `register_status` smallint DEFAULT NULL,
  `registered_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `organisation` varchar(105) DEFAULT NULL,
  `designation` varchar(85) DEFAULT NULL,
  `delegate_type` varchar(85) DEFAULT NULL,
  `city` varchar(105) DEFAULT NULL,
  `loginotp` varchar(20) DEFAULT NULL,
  `qr_code` longtext,
  `attendance` int DEFAULT NULL,
  `dietary` varchar(45) DEFAULT NULL,
  `token` varchar(225) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`register_id`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registered_members`
--

LOCK TABLES `registered_members` WRITE;
/*!40000 ALTER TABLE `registered_members` DISABLE KEYS */;
INSERT INTO `registered_members` VALUES (34,'fd2feb18-5591-4fbf-9e08-3c9c997d2bf6','Neelam','neelammahato3@gmail.com','9786564534','',1,'2026-06-16 09:15:47','abc','director','Individual Delegate','dgp','511443','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATcSURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ2clIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1KzCciNmgnIpGYCMqmZgExqboD8JjVvnFQtOqladFK16JNlajYBeQLIpGYCMqmZgExAnlAzAZnUvKFmE5BNJ1WLTqoWnVQt+uTLgDyh5gkgN0AmNROQGzU3QCY1vwnIE2q+6aRq0UnVopOqRZ/8Y9S8oWYC8gSQJ4BMav5mJ1WLTqoWnVQt+uQfB+QNNU8AuQEyqfmXnFQtOqladFK16JMvU/MvATKpmdQ8AWRS84SaP8lJ1aKTqkUnVYs+WQbkT6ZmAnIDZFIzAZnUTEAmNW8A+ZOdVC06qVp0UrXok5fU/MnUTEB+k5o31PxNTqoWnVQtOqlahD/yApBJzQRkk5ongExq3gAyqZmA3Kh5AsgmNd90UrXopGrRSdWiT15SMwGZ1NwAmdQ8AWRSM6l5AsiNmgnIpOYGyI2aGzUTkBs1E5AbNW+cVC06qVp0UrXok18G5AbIE2p+E5BJzQTkRs0EZAIyqZmA3KiZgExqvumkatFJ1aKTqkX4I78IyBNqJiC/Sc3fBMikZgJyo+aNk6pFJ1WLTqoWffJlQJ5QMwGZ1ExAJjUTkBs1N0Bu1ExAJjUTkCfUTEAmNZOaCciNmk0nVYtOqhadVC365CUgb6i5UfN/UnMDZFIzAblRMwGZgExqJiA3am6ATGreOKladFK16KRq0SdfpuYGyBtq3gAyqbkBMqmZgNyomYBMaiYgE5A3gExqNp1ULTqpWnRSteiTl9RMQCYgN2q+Sc0NkBsgk5obNZvUTED+ZCdVi06qFp1ULcIfeQHIpGYC8oSaCciNmgnIpGYTkE1qJiCTmgnIpOYGyKTmm06qFp1ULTqpWvTJl6mZgExqJiCTmhsgk5obIJOaCciNmhsgk5oJyI2aCcikZgIyqZnUTEBu1LxxUrXopGrRSdUi/JEXgExqNgF5Q80TQJ5QcwNkUvMGkBs1E5BJzTedVC06qVp0UrXok18GZFIzAZnUPAFkAjKpmYDcqJmATEAmNZOaCcgTat5QMwG5UfPGSdWik6pFJ1WL8EdeADKpmYBMaiYgk5oJyKRmAvKGmhsgN2omIJOaGyC/Sc03nVQtOqladFK1CH/kLwbkRs03AZnUTEAmNROQSc0TQCY1N0Bu1LxxUrXopGrRSdUi/JEXgPwmNZuATGpugHyTmgnIpGYCcqPmN51ULTqpWnRSteiTZWo2AbkBcqNmAjKpuQEyqZmATGpugDyh5gk1N0AmNZtOqhadVC06qVr0yZcBeULNG2o2qZmA3AC5UTMBmYC8AeRGzTedVC06qVp0UrXok7oCMqm5ATKpeULNDZBJzQ2QCciNmjdOqhadVC06qVr0yT8GyBtAJjUTkBs1E5BJzaRmAnKjZgIyqZnUTEAmNZtOqhadVC06qVr0yZep+SY1N0BugExqnlBzo+YGyKTmBsif7KRq0UnVopOqRZ8sA/KbgPwmNROQN9RMQJ5QcwNkUvNNJ1WLTqoWnVQtwh+pWnJSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQt+g/r6UouET+hYAAAAABJRU5ErkJggg==',0,'No preference',NULL,'2026-06-15 10:48:12');
/*!40000 ALTER TABLE `registered_members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-16 14:58:37
