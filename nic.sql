CREATE DATABASE  IF NOT EXISTS `nic_validation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nic_validation`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nic_validation
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `nic`
--

DROP TABLE IF EXISTS `nic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nic` (
  `nic_number` varchar(12) NOT NULL,
  `birthday` date NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(6) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  PRIMARY KEY (`nic_number`,`file_name`),
  UNIQUE KEY `nic_number_UNIQUE` (`nic_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nic`
--

LOCK TABLES `nic` WRITE;
/*!40000 ALTER TABLE `nic` DISABLE KEYS */;
INSERT INTO `nic` VALUES ('061966512V','1906-07-14',119,'Male','Sri Lankan NIC Number List Book 2.csv'),('113560859V','1911-12-21',114,'Male','Sri Lankan NIC Number List Book 2.csv'),('142416891V','1914-08-28',111,'Male','Sri Lankan NIC Number List Book 3.csv'),('152420135V','1915-08-29',110,'Male','Sri Lankan NIC Number List Book 4.csv'),('182795601V','1918-10-05',107,'Male','Sri Lankan NIC Number List Book 4.csv'),('194639801999','1947-02-01',78,'Male','Book7.csv'),('199609801900','1996-04-07',28,'Male','Book3.csv'),('200007210643','2000-03-12',25,'Male','Sri Lankan NIC Number List Book 2.csv'),('200007246083','2000-03-12',25,'Male','Sri Lankan NIC Number List Book 4.csv'),('200009801900','2000-04-07',24,'Male','Book1.csv'),('200010026489','2000-04-09',25,'Male','Sri Lankan NIC Number List Book 1.csv'),('200031168156','2000-11-06',25,'Male','Book 9.csv'),('200031168157','2000-11-06',24,'Male','Book5.csv'),('200085603808','2000-12-21',24,'Female','Book1.csv'),('200101045822','2001-01-10',24,'Male','Sri Lankan NIC Number List Book 3.csv'),('200101255571','2001-01-12',24,'Male','Sri Lankan NIC Number List Book 3.csv'),('200103089494','2001-01-30',24,'Male','Sri Lankan NIC Number List Book 4.csv'),('200163301657','2001-05-12',23,'Female','Book4.csv'),('200200201883','2002-01-02',22,'Male','Book4.csv'),('200305065458','2003-02-19',22,'Male','Sri Lankan NIC Number List Book 1.csv'),('200307041713','2003-03-10',22,'Male','Sri Lankan NIC Number List Book 2.csv'),('200410076326','2004-04-09',21,'Male','Sri Lankan NIC Number List Book 4.csv'),('200410106625','2004-04-10',21,'Male','Sri Lankan NIC Number List Book 4.csv'),('200422247821','2004-08-09',21,'Male','Book 9.csv'),('200505109288','2005-02-20',20,'Male','Sri Lankan NIC Number List Book 4.csv'),('200505209140','2005-02-21',20,'Male','Sri Lankan NIC Number List Book 4.csv'),('200510045115','2005-04-09',20,'Male','Sri Lankan NIC Number List Book 4.csv'),('200601068160','2006-01-10',19,'Male','Sri Lankan NIC Number List Book 1.csv'),('200609284788','2006-04-01',19,'Male','Sri Lankan NIC Number List Book 3.csv'),('200685603808','2006-12-21',18,'Female','Book2.csv'),('200712289388','2007-05-01',18,'Male','Sri Lankan NIC Number List Book 3.csv'),('200769801899','2007-07-16',17,'Female','Book3.csv'),('200806013245','2008-02-29',17,'Male','Sri Lankan NIC Number List Book 2.csv'),('200809801900','2008-04-07',16,'Male','Book2.csv'),('200810277881','2008-04-11',17,'Male','Sri Lankan NIC Number List Book 3.csv'),('200811059571','2008-04-19',17,'Male','Sri Lankan NIC Number List Book 4.csv'),('200901085835','2009-01-10',16,'Male','Sri Lankan NIC Number List Book 4.csv'),('200904219971','2009-02-11',16,'Male','Sri Lankan NIC Number List Book 4.csv'),('200922247821','2009-08-09',15,'Male','Book5.csv'),('200989891899','2010-02-01',15,'Female','Book7.csv'),('201005051395','2010-02-19',15,'Male','Sri Lankan NIC Number List Book 3.csv'),('201016894678','2010-06-16',14,'Male','Book5.csv'),('201516854678','2015-06-16',10,'Male','Book 10.csv'),('240073109V','1924-01-07',101,'Male','Sri Lankan NIC Number List Book 3.csv'),('312472410V','1931-09-03',94,'Male','Sri Lankan NIC Number List Book 1.csv'),('332992241V','1933-10-25',92,'Male','Sri Lankan NIC Number List Book 3.csv'),('392174744x','1939-08-04',86,'Male','Book 10.csv'),('401293935V','1940-05-08',85,'Male','Sri Lankan NIC Number List Book 4.csv'),('451881986V','1945-07-06',80,'Male','Sri Lankan NIC Number List Book 2.csv'),('691676218V','1969-06-15',56,'Male','Sri Lankan NIC Number List Book 3.csv'),('843497307V','1984-12-14',41,'Male','Sri Lankan NIC Number List Book 1.csv'),('860980190v','1986-04-07',38,'Male','Book1.csv'),('894532784V','1990-03-28',35,'Male','Book6.csv'),('910096251V','1991-01-09',34,'Male','Sri Lankan NIC Number List Book 2.csv'),('920113658x','1992-01-11',33,'Male','Book 11.csv'),('920113678V','1992-01-11',32,'Male','Book6.csv');
/*!40000 ALTER TABLE `nic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-19 19:13:31
