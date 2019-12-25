-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 10, 2017 at 12:27 PM
-- Server version: 5.5.54-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `new_tagloy`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CUSTOMER_FEED_COUNT_FOR_VENUE`(IN v_id INT, IN c_id INT)
BEGIN  
    DECLARE rows INT;

    SELECT COUNT(*) INTO rows FROM venue_customer_mapping
    WHERE venue_id = v_id and customer_id = c_id;

    CASE rows
        WHEN 0 THEN
            INSERT INTO venue_customer_mapping ( venue_id, customer_id,feed_count  )  VALUES ( v_id , c_id, 1);
        ELSE
            UPDATE venue_customer_mapping SET feed_count = feed_count + 1
            WHERE venue_id = v_id and customer_id = c_id;
    END CASE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CUSTOMER_PUBLISED_FEED_COUNT_FOR_VENUE`(IN v_id INT, IN c_id INT)
BEGIN  
    DECLARE rows INT;

    SELECT COUNT(*) INTO rows FROM venue_customer_mapping
    WHERE venue_id = v_id and customer_id = c_id;

    CASE rows
        WHEN 0 THEN
            INSERT INTO venue_customer_mapping ( venue_id, customer_id,feed_count  )  VALUES ( v_id , c_id, 1);
        ELSE
            UPDATE venue_customer_mapping SET published_feed_count = published_feed_count + 1
            WHERE venue_id = v_id and customer_id = c_id;
    END CASE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PERK_LOGIC`(IN `v_id` INT, IN `c_id` INT, IN `is_celebration` INT)
BEGIN  

-- Thank you and tag booster actual and required feed counts
	DECLARE actual_thank_you_feed_count INT;
  	DECLARE actual_tag_booster_feed_count INT;
  	DECLARE required_thank_you_feed_count INT;
  	DECLARE required_tag_booster_feed_count INT;

-- infulencer variables with default values
  	DECLARE low_influencer_followers INT DEFAULT 10;
  	DECLARE high_influencer_followers INT DEFAULT 20;
  	DECLARE celebrity_influencer_followers INT DEFAULT 50;

-- Temparary veriable for checkin the perk is assigned to user or not
	DECLARE temp INT DEFAULT 0;
 

-- Customer feed counts and followers
	DECLARE customer_feed_count INT;
	DECLARE customer_followers INT;

-- Venue Perk ids
	DECLARE thank_you_id INT DEFAULT -1;
	DECLARE tag_booster_id INT DEFAULT -1;
	DECLARE welcome_id INT DEFAULT -1;
	DECLARE celebration_id INT DEFAULT -1;
	DECLARE low_influencer_id INT DEFAULT -1;
	DECLARE high_influencer_id INT DEFAULT -1;
	DECLARE celebrity_influencer_id INT DEFAULT -1;

SELECT low,high,celebrity INTO low_influencer_followers,high_influencer_followers,celebrity_influencer_followers FROM influencer;

-- Get the followers of the customer
SELECT SUM(twt_follower + facebook_follower + ig_follower )  INTO
customer_followers FROM `customer` WHERE customer_id = c_id;

-- Get the published feed count
SELECT published_feed_count INTO  customer_feed_count FROM venue_customer_mapping WHERE venue_id = v_id AND customer_id = c_id;

-- GEt the ids and necessary information about perks
SELECT id INTO welcome_id  FROM `venue_perks` WHERE name LIKE '%welcome%' and is_enabled = 1 and venue_id = v_id;

SELECT id INTO celebration_id FROM `venue_perks` WHERE name LIKE '%celebration%' and is_enabled = 1 and venue_id = v_id;

SELECT id INTO low_influencer_id FROM `venue_perks` WHERE name = 'Low Influncer' and is_enabled = 1 and venue_id = v_id;

SELECT id INTO high_influencer_id FROM `venue_perks` WHERE name = 'High Influncer' and is_enabled = 1 and venue_id = v_id;

SELECT id INTO celebrity_influencer_id FROM `venue_perks` WHERE name = 'Celebraity Influncer' and is_enabled = 1 and venue_id = v_id;

SELECT id,tag_count INTO thank_you_id,required_thank_you_feed_count FROM `venue_perks` WHERE name = 'Thank You' and is_enabled = 1 and venue_id = v_id;

SELECT id,tag_count INTO tag_booster_id,required_tag_booster_feed_count  FROM `venue_perks` WHERE name = 'Tag Booster' and is_enabled = 1 and venue_id = v_id;


-- Mod the feed count for thank you and tag booster perks
SELECT  mod( customer_feed_count  , required_tag_booster_feed_count ) INTO actual_tag_booster_feed_count;

SELECT mod( customer_feed_count  , required_thank_you_feed_count ) INTO actual_thank_you_feed_count;

-- Check for welcome perk
CASE 1
	WHEN customer_feed_count = 1 AND welcome_id <> -1 THEN
            INSERT INTO venue_perk_customer_mapping ( venue_perk_id, customer_id )  VALUES ( welcome_id , c_id );
	ELSE BEGIN END;
END CASE;


-- Check for inflencers 

CASE 1
	WHEN  customer_followers  >=  celebrity_influencer_followers AND celebrity_influencer_id <> -1 THEN
		SELECT count(*) INTO temp  FROM venue_perk_customer_mapping WHERE venue_perk_id = celebrity_influencer_id and customer_id = c_id;

                CASE temp
                        When 0 THEN
                                INSERT INTO venue_perk_customer_mapping ( venue_perk_id, customer_id )  VALUES ( celebrity_influencer_id , c_id );
                        ELSE BEGIN END;
                END CASE;

	WHEN  customer_followers  >=  high_influencer_followers AND customer_followers  <  celebrity_influencer_followers AND  high_influencer_id <> -1 THEN
		SELECT count(*) INTO temp  FROM venue_perk_customer_mapping WHERE venue_perk_id = high_influencer_id and customer_id = c_id;

                CASE temp
                        When 0 THEN
                                INSERT INTO venue_perk_customer_mapping ( venue_perk_id, customer_id )  VALUES ( high_influencer_id , c_id );
                        ELSE BEGIN END;
                END CASE;

	WHEN customer_followers  >=  low_influencer_followers and customer_followers  <  high_influencer_followers AND low_influencer_id <> -1 THEN
		SELECT count(*) INTO temp  FROM venue_perk_customer_mapping WHERE venue_perk_id = low_influencer_id and customer_id = c_id;

                CASE temp
                        When 0 THEN
                                INSERT INTO venue_perk_customer_mapping ( venue_perk_id, customer_id )  VALUES ( low_influencer_id , c_id );
                        ELSE BEGIN END;
                END CASE;

	ELSE BEGIN END;
END CASE;


--  Celebration Perk

CASE 1
        WHEN  is_celebration = 1 AND celebration_id <> -1 THEN
            INSERT INTO venue_perk_customer_mapping ( venue_perk_id, customer_id )  VALUES ( celebration_id , c_id );
	ELSE BEGIN END;
END CASE;

-- Check for Thank you and Tag boosters

-- Thank you perk
CASE 1
    WHEN  actual_thank_you_feed_count = 0 
  	THEN
            INSERT INTO venue_perk_customer_mapping ( venue_perk_id, customer_id )  VALUES ( thank_you_id , c_id );
	ELSE BEGIN END;
END CASE; 

-- Tag booster
CASE  1
	WHEN  actual_tag_booster_feed_count  = 0
	THEN
            INSERT INTO venue_perk_customer_mapping ( venue_perk_id, customer_id )  VALUES ( tag_booster_id , c_id );
	ELSE BEGIN END;
END CASE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_active` int(11) DEFAULT '1',
  `feed_count` int(11) DEFAULT '0',
  `published_feed_count` int(11) DEFAULT '0',
  `twt_follower` int(11) DEFAULT '0',
  `facebook_follower` int(11) DEFAULT '0',
  `ig_follower` int(11) DEFAULT '0',
  `notification_flag` int(11) DEFAULT '1',
  `is_present_on_app` int(11) DEFAULT '0',
  `tags` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

-- --------------------------------------------------------

--
-- Table structure for table `customer_social_media_mapping`
--

CREATE TABLE IF NOT EXISTS `customer_social_media_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  `auth_token` varchar(255) DEFAULT NULL,
  `app_id` varchar(255) DEFAULT NULL,
  `secret_key` varchar(255) DEFAULT NULL,
  `handle` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `reply` text NOT NULL,
  `is_perk_send` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `feed_images`
--

CREATE TABLE IF NOT EXISTS `feed_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_id` (`feed_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

-- --------------------------------------------------------

--
-- Table structure for table `historical_feeds`
--

CREATE TABLE IF NOT EXISTS `historical_feeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) NOT NULL,
  `feed_msg` mediumtext CHARACTER SET utf8 COLLATE utf8_bin,
  `customer_id` int(11) DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  `feed_recieved_at` bigint(11) DEFAULT NULL,
  `is_celebration` int(11) DEFAULT '0',
  `is_favourite` int(11) NOT NULL DEFAULT '0',
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL,
  `rejected_reason` text NOT NULL,
  `bookmark_feed` int(11) NOT NULL DEFAULT '0',
  `feed_from_fame_user` int(11) NOT NULL DEFAULT '0',
  `feed_from_favourite_user` int(11) DEFAULT '0',
  `action_taken_by_venue_user` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `venue_id` (`venue_id`),
  KEY `social_media_id` (`social_media_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

-- --------------------------------------------------------

--
-- Table structure for table `historical_spotlight`
--

CREATE TABLE IF NOT EXISTS `historical_spotlight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` int(11) DEFAULT NULL,
  `spotlight_id` int(11) NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL,
  `description` text,
  `venue_id` int(11) DEFAULT NULL,
  `type` enum('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE') DEFAULT NULL COMMENT '''CREATIVE'',''EVENT''',
  `published_start_date_time` bigint(20) DEFAULT NULL,
  `published_end_date_time` bigint(20) DEFAULT NULL,
  `event_start_date` bigint(20) DEFAULT NULL,
  `event_end_date` bigint(20) DEFAULT NULL,
  `event_start_time` time DEFAULT NULL,
  `event_end_time` time DEFAULT NULL,
  `active_day_string` varchar(255) DEFAULT NULL,
  `is_recurring` int(11) DEFAULT '0',
  `venue_user_creator_id` int(11) DEFAULT NULL,
  `venue_user_moderator_id` int(11) DEFAULT NULL,
  `fb` int(11) NOT NULL DEFAULT '0',
  `twt` int(11) NOT NULL DEFAULT '0',
  `ig` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `rejected_reason` text NOT NULL,
  `parent_spotlight_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `influencer`
--

CREATE TABLE IF NOT EXISTS `influencer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `low` int(11) NOT NULL,
  `high` int(11) NOT NULL,
  `celebrity` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `pending_emails`
--

CREATE TABLE IF NOT EXISTS `pending_emails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Table structure for table `pending_feeds`
--

CREATE TABLE IF NOT EXISTS `pending_feeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_msg` mediumtext CHARACTER SET utf8 COLLATE utf8_bin,
  `customer_id` int(11) DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  `feed_recieved_at` bigint(11) DEFAULT NULL,
  `is_celebration` int(11) DEFAULT '0',
  `is_favourite` int(11) NOT NULL DEFAULT '0',
  `bookmark_feed` int(11) NOT NULL DEFAULT '0',
  `feed_from_fame_user` int(11) NOT NULL DEFAULT '0',
  `feed_from_favourite_user` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `venue_id` (`venue_id`),
  KEY `social_media_id` (`social_media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Triggers `pending_feeds`
--
DROP TRIGGER IF EXISTS `update_feed_count`;
DELIMITER //
CREATE TRIGGER `update_feed_count` AFTER INSERT ON `pending_feeds`
 FOR EACH ROW BEGIN
    UPDATE customer SET feed_count = feed_count + 1 WHERE customer_id = NEW.customer_id;
    CALL CUSTOMER_FEED_COUNT_FOR_VENUE(NEW.venue_id, NEW.customer_id );
  END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pending_spotlight`
--

CREATE TABLE IF NOT EXISTS `pending_spotlight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` int(11) DEFAULT NULL,
  `description` text,
  `type` enum('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE') DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `published_start_date_time` bigint(20) DEFAULT NULL,
  `published_end_date_time` bigint(20) DEFAULT NULL,
  `event_start_date` bigint(20) DEFAULT NULL,
  `event_end_date` bigint(20) DEFAULT NULL,
  `event_start_time` time DEFAULT NULL,
  `event_end_time` time DEFAULT NULL,
  `active_day_string` varchar(255) DEFAULT NULL,
  `is_recurring` int(11) DEFAULT '0',
  `venue_user_creator_id` int(11) DEFAULT NULL,
  `venue_user_moderator_id` int(11) DEFAULT NULL,
  `fb` int(11) NOT NULL DEFAULT '0',
  `twt` int(11) NOT NULL DEFAULT '0',
  `ig` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

-- --------------------------------------------------------

--
-- Table structure for table `perks`
--

CREATE TABLE IF NOT EXISTS `perks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `offer_type` int(11) NOT NULL,
  `description` text NOT NULL,
  `amount` int(11) NOT NULL,
  `expiry` int(11) NOT NULL,
  `tag_count` int(11) NOT NULL DEFAULT '0',
  `check_in_count` int(11) NOT NULL DEFAULT '0',
  `valid_on` text NOT NULL,
  `f_start_time` time NOT NULL,
  `f_end_time` time NOT NULL,
  `s_start_time` time NOT NULL,
  `s_end_time` time NOT NULL,
  `message` text NOT NULL,
  `sponsorer` text NOT NULL,
  `terms` text NOT NULL,
  `is_enabled` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Table structure for table `published_feeds`
--

CREATE TABLE IF NOT EXISTS `published_feeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) NOT NULL,
  `feed_msg` mediumtext CHARACTER SET utf8 COLLATE utf8_bin,
  `customer_id` int(11) DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  `feed_recieved_at` bigint(11) DEFAULT NULL,
  `is_celebration` int(11) DEFAULT '0',
  `is_favourite` int(11) NOT NULL DEFAULT '0',
  `bookmark_feed` int(11) NOT NULL DEFAULT '0',
  `feed_from_fame_user` int(11) NOT NULL DEFAULT '0',
  `feed_from_favourite_user` int(11) DEFAULT '0',
  `action_taken_by_venue_user` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `venue_id` (`venue_id`),
  KEY `social_media_id` (`social_media_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Triggers `published_feeds`
--
DROP TRIGGER IF EXISTS `update_published_feed_count`;
DELIMITER //
CREATE TRIGGER `update_published_feed_count` AFTER INSERT ON `published_feeds`
 FOR EACH ROW BEGIN
    UPDATE customer SET published_feed_count = published_feed_count + 1 WHERE customer_id = NEW.customer_id;
    CALL CUSTOMER_PUBLISED_FEED_COUNT_FOR_VENUE(NEW.venue_id, NEW.customer_id );
CALL PERK_LOGIC(NEW.venue_id, NEW.customer_id,NEW.is_celebration );
  END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `published_spotlight`
--

CREATE TABLE IF NOT EXISTS `published_spotlight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` int(11) DEFAULT NULL,
  `spotlight_id` int(11) NOT NULL,
  `description` text,
  `venue_id` int(11) DEFAULT NULL,
  `type` enum('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE') DEFAULT NULL COMMENT '''CREATIVE'',''EVENT''',
  `published_start_date_time` bigint(20) DEFAULT NULL,
  `published_end_date_time` bigint(20) DEFAULT NULL,
  `event_start_date` bigint(20) DEFAULT NULL,
  `event_end_date` bigint(20) DEFAULT NULL,
  `event_start_time` time DEFAULT NULL,
  `event_end_time` time DEFAULT NULL,
  `active_day_string` varchar(255) DEFAULT NULL,
  `is_recurring` int(11) DEFAULT '0',
  `venue_user_creator_id` int(11) DEFAULT NULL,
  `venue_user_moderator_id` int(11) DEFAULT NULL,
  `fb` int(11) NOT NULL DEFAULT '0',
  `twt` int(11) NOT NULL DEFAULT '0',
  `ig` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `social_media`
--

CREATE TABLE IF NOT EXISTS `social_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `spotlight_images`
--

CREATE TABLE IF NOT EXISTS `spotlight_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `spotlight_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` enum('IMAGE','VIDEO') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creative_id` (`spotlight_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=40 ;

-- --------------------------------------------------------

--
-- Table structure for table `spotlight_request`
--

CREATE TABLE IF NOT EXISTS `spotlight_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) NOT NULL,
  `requester_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `status` enum('OPEN','RESOLVED') DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `spotlight_social_media_mapping`
--

CREATE TABLE IF NOT EXISTS `spotlight_social_media_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `spotlight_id` int(11) DEFAULT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tagmin`
--

CREATE TABLE IF NOT EXISTS `tagmin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) DEFAULT NULL,
  `media_url` varchar(255) NOT NULL,
  `type` enum('IMAGE','VIDEO','GIF','BANNER') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `tagtv`
--

CREATE TABLE IF NOT EXISTS `tagtv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) NOT NULL,
  `media_url` varchar(255) NOT NULL,
  `type` enum('IMAGE','VIDEO','GIF','BANNER') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE IF NOT EXISTS `venue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `hash_tag` varchar(255) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `address` mediumtext,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `is_black_board` int(11) DEFAULT '0',
  `black_board_json` mediumtext,
  `auto_approval` varchar(255) NOT NULL,
  `tags` text NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `beacon_ids` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=103 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_block_customer_mapping`
--

CREATE TABLE IF NOT EXISTS `venue_block_customer_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) DEFAULT NULL,
  `venue_hashtag` varchar(255) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `user_fb_handle` varchar(255) DEFAULT NULL,
  `user_twt_handle` varchar(255) DEFAULT NULL,
  `user_ig_handle` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_customer_check_in_log`
--

CREATE TABLE IF NOT EXISTS `venue_customer_check_in_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `date_time_timestamp` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_customer_mapping`
--

CREATE TABLE IF NOT EXISTS `venue_customer_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `venue_note` varchar(255) DEFAULT NULL,
  `check_in_count` int(11) DEFAULT '0',
  `last_checkin_time` bigint(20) NOT NULL,
  `is_checkedin` int(11) NOT NULL DEFAULT '0',
  `feed_count` int(11) NOT NULL DEFAULT '0',
  `published_feed_count` int(11) NOT NULL DEFAULT '0',
  `last_feed_time` bigint(20) NOT NULL,
  `is_blocked` int(11) NOT NULL DEFAULT '0',
  `is_favourite` int(11) NOT NULL DEFAULT '0',
  `is_fame` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='In circle ' AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_favourite_customer_mapping`
--

CREATE TABLE IF NOT EXISTS `venue_favourite_customer_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_perks`
--

CREATE TABLE IF NOT EXISTS `venue_perks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `offer_type` int(11) NOT NULL,
  `description` text NOT NULL,
  `amount` int(11) NOT NULL,
  `expiry` int(11) NOT NULL,
  `tag_count` int(11) NOT NULL DEFAULT '0',
  `check_in_count` int(11) NOT NULL DEFAULT '0',
  `valid_on` text NOT NULL,
  `f_start_time` time NOT NULL,
  `f_end_time` time NOT NULL,
  `s_start_time` time NOT NULL,
  `s_end_time` time NOT NULL,
  `message` text NOT NULL,
  `sponsorer` text NOT NULL,
  `terms` text NOT NULL,
  `is_enabled` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=39 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_perk_customer_mapping`
--

CREATE TABLE IF NOT EXISTS `venue_perk_customer_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_perk_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `is_claimed` int(11) DEFAULT '0',
  `assigned_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `claimed_timestamp` bigint(20) DEFAULT NULL,
  `expired_timestamp` bigint(20) DEFAULT NULL,
  `unique_id` text,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=84 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_social_media_mapping`
--

CREATE TABLE IF NOT EXISTS `venue_social_media_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) DEFAULT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  `auth_token` varchar(255) DEFAULT NULL,
  `app_id` varchar(255) DEFAULT NULL,
  `consumer_key` varchar(255) NOT NULL,
  `secret_key` varchar(255) DEFAULT NULL,
  `handle` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `venue_stars`
--

CREATE TABLE IF NOT EXISTS `venue_stars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `tag_count` int(11) NOT NULL,
  `is_superstar` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_customer_details_for_venue`
--
CREATE TABLE IF NOT EXISTS `v_customer_details_for_venue` (
`customer_id` int(11)
,`first_name` varchar(255)
,`dob` date
,`total_feed_count` int(11)
,`total_published_feed_count` int(11)
,`twt_follower` int(11)
,`ig_follower` int(11)
,`facebook_follower` int(11)
,`is_present_on_app` int(11)
,`venue_feed_count` int(11)
,`venue_published_feed_count` int(11)
,`venue_id` int(11)
,`is_blocked` int(11)
,`is_favourite` int(11)
,`is_fame` int(11)
,`venue_note` varchar(255)
,`check_in_count` int(11)
,`last_checkin_time` bigint(20)
,`last_feed_time` bigint(20)
,`is_checkedin` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_customer_pending_feeds_count`
--
CREATE TABLE IF NOT EXISTS `v_customer_pending_feeds_count` (
`feed_id` int(11)
,`customer_id` int(11)
,`feed_count` bigint(21)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_handle`
--
CREATE TABLE IF NOT EXISTS `v_handle` (
`id` int(11)
,`customer_id` int(11)
,`social_media_id` int(11)
,`auth_token` varchar(255)
,`app_id` varchar(255)
,`secret_key` varchar(255)
,`handle` varchar(255)
,`created_at` datetime
,`updated_at` datetime
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_historical_feeds`
--
CREATE TABLE IF NOT EXISTS `v_historical_feeds` (
`feed_id` int(11)
,`feed_msg` mediumtext
,`source` int(11)
,`feed_image` varchar(255)
,`cust_name` varchar(255)
,`feed_count` int(11)
,`published_feed_count` int(11)
,`twt_follower` int(11)
,`facebook_follower` int(11)
,`ig_follower` int(11)
,`is_celebration` int(11)
,`bookmark_feed` int(11)
,`feed_from_fame_user` int(11)
,`feed_from_favourite_user` int(11)
,`action_taken_by_venue_user` int(11)
,`feed_recieved_at` bigint(11)
,`feed_status` enum('PENDING','APPROVED','REJECTED')
,`rejected_reason` text
,`venue_id` int(11)
,`handle` varchar(255)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_historical_spotlight`
--
CREATE TABLE IF NOT EXISTS `v_historical_spotlight` (
`spotlight_id` int(11)
,`title` int(11)
,`description` text
,`type` enum('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE')
,`venue_id` int(11)
,`published_start_date_time` bigint(20)
,`published_end_date_time` bigint(20)
,`event_start_date` bigint(20)
,`event_end_date` bigint(20)
,`event_start_time` time
,`event_end_time` time
,`active_day_string` varchar(255)
,`is_recurring` int(11)
,`venue_user_creator_id` int(11)
,`venue_user_moderator_id` int(11)
,`fb` int(11)
,`twt` int(11)
,`ig` int(11)
,`image` varchar(255)
,`status` enum('PENDING','APPROVED','REJECTED')
,`rejected_reason` text
,`parent_spotlight_id` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_pending_feeds`
--
CREATE TABLE IF NOT EXISTS `v_pending_feeds` (
`feed_id` int(11)
,`feed_msg` mediumtext
,`source` int(11)
,`feed_image` varchar(255)
,`cust_name` varchar(255)
,`feed_count` int(11)
,`published_feed_count` int(11)
,`twt_follower` int(11)
,`facebook_follower` int(11)
,`ig_follower` int(11)
,`is_celebration` int(11)
,`bookmark_feed` int(11)
,`feed_from_fame_user` int(11)
,`feed_from_favourite_user` int(11)
,`cust_feeds_count` bigint(21)
,`feed_recieved_at` bigint(11)
,`venue_id` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_pending_feeds_trail`
--
CREATE TABLE IF NOT EXISTS `v_pending_feeds_trail` (
`feed_id` int(11)
,`feed_msg` mediumtext
,`source` int(11)
,`feed_image` varchar(255)
,`customer_id` int(11)
,`cust_name` varchar(255)
,`feed_count` int(11)
,`published_feed_count` int(11)
,`twt_follower` int(11)
,`facebook_follower` int(11)
,`ig_follower` int(11)
,`is_celebration` int(11)
,`bookmark_feed` int(11)
,`feed_from_fame_user` int(11)
,`feed_from_favourite_user` int(11)
,`feed_recieved_at` bigint(11)
,`venue_id` int(11)
,`handle` varchar(255)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_pending_spotlight`
--
CREATE TABLE IF NOT EXISTS `v_pending_spotlight` (
`spotlight_id` int(11)
,`title` int(11)
,`description` text
,`type` enum('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE')
,`venue_id` int(11)
,`published_start_date_time` bigint(20)
,`published_end_date_time` bigint(20)
,`event_start_date` bigint(20)
,`event_end_date` bigint(20)
,`event_start_time` time
,`event_end_time` time
,`active_day_string` varchar(255)
,`is_recurring` int(11)
,`venue_user_creator_id` int(11)
,`venue_user_moderator_id` int(11)
,`fb` int(11)
,`twt` int(11)
,`ig` int(11)
,`image` varchar(255)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_published_feeds`
--
CREATE TABLE IF NOT EXISTS `v_published_feeds` (
`feed_id` int(11)
,`feed_msg` mediumtext
,`source` int(11)
,`feed_image` varchar(255)
,`cust_name` varchar(255)
,`feed_count` int(11)
,`published_feed_count` int(11)
,`twt_follower` int(11)
,`facebook_follower` int(11)
,`ig_follower` int(11)
,`is_celebration` int(11)
,`bookmark_feed` int(11)
,`feed_from_fame_user` int(11)
,`feed_from_favourite_user` int(11)
,`action_taken_by_venue_user` int(11)
,`feed_recieved_at` bigint(11)
,`venue_id` int(11)
,`handle` varchar(255)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_published_spotlight`
--
CREATE TABLE IF NOT EXISTS `v_published_spotlight` (
`spotlight_id` int(11)
,`title` int(11)
,`description` text
,`type` enum('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE')
,`venue_id` int(11)
,`published_start_date_time` bigint(20)
,`published_end_date_time` bigint(20)
,`event_start_date` bigint(20)
,`event_end_date` bigint(20)
,`event_start_time` time
,`event_end_time` time
,`active_day_string` varchar(255)
,`is_recurring` int(11)
,`venue_user_creator_id` int(11)
,`venue_user_moderator_id` int(11)
,`fb` int(11)
,`twt` int(11)
,`ig` int(11)
,`image` varchar(255)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `v_venue_stars`
--
CREATE TABLE IF NOT EXISTS `v_venue_stars` (
`customer_id` int(11)
,`first_name` varchar(255)
,`image` varchar(255)
,`is_superstar` int(11)
,`venue_published_feed_count` int(11)
,`venue_id` int(11)
,`handle` varchar(255)
);
-- --------------------------------------------------------

--
-- Structure for view `v_customer_details_for_venue`
--
DROP TABLE IF EXISTS `v_customer_details_for_venue`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_customer_details_for_venue` AS select `c`.`customer_id` AS `customer_id`,`c`.`first_name` AS `first_name`,`c`.`dob` AS `dob`,`c`.`feed_count` AS `total_feed_count`,`c`.`published_feed_count` AS `total_published_feed_count`,`c`.`twt_follower` AS `twt_follower`,`c`.`ig_follower` AS `ig_follower`,`c`.`facebook_follower` AS `facebook_follower`,`c`.`is_present_on_app` AS `is_present_on_app`,`v_c`.`feed_count` AS `venue_feed_count`,`v_c`.`published_feed_count` AS `venue_published_feed_count`,`v_c`.`venue_id` AS `venue_id`,`v_c`.`is_blocked` AS `is_blocked`,`v_c`.`is_favourite` AS `is_favourite`,`v_c`.`is_fame` AS `is_fame`,`v_c`.`venue_note` AS `venue_note`,`v_c`.`check_in_count` AS `check_in_count`,`v_c`.`last_checkin_time` AS `last_checkin_time`,`v_c`.`last_feed_time` AS `last_feed_time`,`v_c`.`is_checkedin` AS `is_checkedin` from (`customer` `c` join `venue_customer_mapping` `v_c` on((`c`.`customer_id` = `v_c`.`customer_id`))) where 1;

-- --------------------------------------------------------

--
-- Structure for view `v_customer_pending_feeds_count`
--
DROP TABLE IF EXISTS `v_customer_pending_feeds_count`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_customer_pending_feeds_count` AS select min(`f`.`id`) AS `feed_id`,`f`.`customer_id` AS `customer_id`,count(`f`.`customer_id`) AS `feed_count` from `pending_feeds` `f` group by `f`.`customer_id`;

-- --------------------------------------------------------

--
-- Structure for view `v_handle`
--
DROP TABLE IF EXISTS `v_handle`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_handle` AS select `customer_social_media_mapping`.`id` AS `id`,`customer_social_media_mapping`.`customer_id` AS `customer_id`,`customer_social_media_mapping`.`social_media_id` AS `social_media_id`,`customer_social_media_mapping`.`auth_token` AS `auth_token`,`customer_social_media_mapping`.`app_id` AS `app_id`,`customer_social_media_mapping`.`secret_key` AS `secret_key`,`customer_social_media_mapping`.`handle` AS `handle`,`customer_social_media_mapping`.`created_at` AS `created_at`,`customer_social_media_mapping`.`updated_at` AS `updated_at` from `customer_social_media_mapping` group by `customer_social_media_mapping`.`customer_id` order by `customer_social_media_mapping`.`social_media_id`;

-- --------------------------------------------------------

--
-- Structure for view `v_historical_feeds`
--
DROP TABLE IF EXISTS `v_historical_feeds`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_historical_feeds` AS select `f`.`feed_id` AS `feed_id`,`f`.`feed_msg` AS `feed_msg`,`f`.`social_media_id` AS `source`,`i`.`image` AS `feed_image`,`c`.`first_name` AS `cust_name`,`c`.`feed_count` AS `feed_count`,`c`.`published_feed_count` AS `published_feed_count`,`c`.`twt_follower` AS `twt_follower`,`c`.`facebook_follower` AS `facebook_follower`,`c`.`ig_follower` AS `ig_follower`,`f`.`is_celebration` AS `is_celebration`,`f`.`bookmark_feed` AS `bookmark_feed`,`f`.`feed_from_fame_user` AS `feed_from_fame_user`,`f`.`feed_from_favourite_user` AS `feed_from_favourite_user`,`f`.`action_taken_by_venue_user` AS `action_taken_by_venue_user`,`f`.`feed_recieved_at` AS `feed_recieved_at`,`f`.`status` AS `feed_status`,`f`.`rejected_reason` AS `rejected_reason`,`f`.`venue_id` AS `venue_id`,`c_s`.`handle` AS `handle` from (((`historical_feeds` `f` join `customer` `c` on((`f`.`customer_id` = `c`.`customer_id`))) join `feed_images` `i` on((`i`.`feed_id` = `f`.`feed_id`))) join `customer_social_media_mapping` `c_s` on((`c_s`.`social_media_id` = `f`.`social_media_id`))) where ((`c_s`.`social_media_id` = `f`.`social_media_id`) and (`c_s`.`customer_id` = `f`.`customer_id`));

-- --------------------------------------------------------

--
-- Structure for view `v_historical_spotlight`
--
DROP TABLE IF EXISTS `v_historical_spotlight`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_historical_spotlight` AS select `s`.`spotlight_id` AS `spotlight_id`,`s`.`title` AS `title`,`s`.`description` AS `description`,`s`.`type` AS `type`,`s`.`venue_id` AS `venue_id`,`s`.`published_start_date_time` AS `published_start_date_time`,`s`.`published_end_date_time` AS `published_end_date_time`,`s`.`event_start_date` AS `event_start_date`,`s`.`event_end_date` AS `event_end_date`,`s`.`event_start_time` AS `event_start_time`,`s`.`event_end_time` AS `event_end_time`,`s`.`active_day_string` AS `active_day_string`,`s`.`is_recurring` AS `is_recurring`,`s`.`venue_user_creator_id` AS `venue_user_creator_id`,`s`.`venue_user_moderator_id` AS `venue_user_moderator_id`,`s`.`fb` AS `fb`,`s`.`twt` AS `twt`,`s`.`ig` AS `ig`,`i`.`image` AS `image`,`s`.`status` AS `status`,`s`.`rejected_reason` AS `rejected_reason`,`s`.`parent_spotlight_id` AS `parent_spotlight_id` from (`historical_spotlight` `s` join `spotlight_images` `i` on((`i`.`spotlight_id` = `s`.`id`))) group by `i`.`spotlight_id`;

-- --------------------------------------------------------

--
-- Structure for view `v_pending_feeds`
--
DROP TABLE IF EXISTS `v_pending_feeds`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_pending_feeds` AS select `f`.`id` AS `feed_id`,`f`.`feed_msg` AS `feed_msg`,`f`.`social_media_id` AS `source`,`i`.`image` AS `feed_image`,`c`.`first_name` AS `cust_name`,`c`.`feed_count` AS `feed_count`,`c`.`published_feed_count` AS `published_feed_count`,`c`.`twt_follower` AS `twt_follower`,`c`.`facebook_follower` AS `facebook_follower`,`c`.`ig_follower` AS `ig_follower`,`f`.`is_celebration` AS `is_celebration`,`f`.`bookmark_feed` AS `bookmark_feed`,`f`.`feed_from_fame_user` AS `feed_from_fame_user`,`f`.`feed_from_favourite_user` AS `feed_from_favourite_user`,`f_c`.`feed_count` AS `cust_feeds_count`,`f`.`feed_recieved_at` AS `feed_recieved_at`,`f`.`venue_id` AS `venue_id` from (((`pending_feeds` `f` join `customer` `c` on((`f`.`customer_id` = `c`.`customer_id`))) join `feed_images` `i` on((`i`.`feed_id` = `f`.`id`))) join `v_customer_pending_feeds_count` `f_c` on((`f_c`.`feed_id` = `f`.`id`)));

-- --------------------------------------------------------

--
-- Structure for view `v_pending_feeds_trail`
--
DROP TABLE IF EXISTS `v_pending_feeds_trail`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_pending_feeds_trail` AS select `f`.`id` AS `feed_id`,`f`.`feed_msg` AS `feed_msg`,`f`.`social_media_id` AS `source`,`i`.`image` AS `feed_image`,`c`.`customer_id` AS `customer_id`,`c`.`first_name` AS `cust_name`,`c`.`feed_count` AS `feed_count`,`c`.`published_feed_count` AS `published_feed_count`,`c`.`twt_follower` AS `twt_follower`,`c`.`facebook_follower` AS `facebook_follower`,`c`.`ig_follower` AS `ig_follower`,`f`.`is_celebration` AS `is_celebration`,`f`.`bookmark_feed` AS `bookmark_feed`,`f`.`feed_from_fame_user` AS `feed_from_fame_user`,`f`.`feed_from_favourite_user` AS `feed_from_favourite_user`,`f`.`feed_recieved_at` AS `feed_recieved_at`,`f`.`venue_id` AS `venue_id`,`c_s`.`handle` AS `handle` from (((`pending_feeds` `f` join `customer` `c` on((`f`.`customer_id` = `c`.`customer_id`))) join `feed_images` `i` on((`i`.`feed_id` = `f`.`id`))) join `customer_social_media_mapping` `c_s` on((`c_s`.`social_media_id` = `f`.`social_media_id`))) where ((`c_s`.`social_media_id` = `f`.`social_media_id`) and (`c_s`.`customer_id` = `f`.`customer_id`));

-- --------------------------------------------------------

--
-- Structure for view `v_pending_spotlight`
--
DROP TABLE IF EXISTS `v_pending_spotlight`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_pending_spotlight` AS select `s`.`id` AS `spotlight_id`,`s`.`title` AS `title`,`s`.`description` AS `description`,`s`.`type` AS `type`,`s`.`venue_id` AS `venue_id`,`s`.`published_start_date_time` AS `published_start_date_time`,`s`.`published_end_date_time` AS `published_end_date_time`,`s`.`event_start_date` AS `event_start_date`,`s`.`event_end_date` AS `event_end_date`,`s`.`event_start_time` AS `event_start_time`,`s`.`event_end_time` AS `event_end_time`,`s`.`active_day_string` AS `active_day_string`,`s`.`is_recurring` AS `is_recurring`,`s`.`venue_user_creator_id` AS `venue_user_creator_id`,`s`.`venue_user_moderator_id` AS `venue_user_moderator_id`,`s`.`fb` AS `fb`,`s`.`twt` AS `twt`,`s`.`ig` AS `ig`,`i`.`image` AS `image` from (`pending_spotlight` `s` join `spotlight_images` `i` on((`i`.`spotlight_id` = `s`.`id`))) group by `i`.`spotlight_id`;

-- --------------------------------------------------------

--
-- Structure for view `v_published_feeds`
--
DROP TABLE IF EXISTS `v_published_feeds`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_published_feeds` AS select `f`.`feed_id` AS `feed_id`,`f`.`feed_msg` AS `feed_msg`,`f`.`social_media_id` AS `source`,`i`.`image` AS `feed_image`,`c`.`first_name` AS `cust_name`,`c`.`feed_count` AS `feed_count`,`c`.`published_feed_count` AS `published_feed_count`,`c`.`twt_follower` AS `twt_follower`,`c`.`facebook_follower` AS `facebook_follower`,`c`.`ig_follower` AS `ig_follower`,`f`.`is_celebration` AS `is_celebration`,`f`.`bookmark_feed` AS `bookmark_feed`,`f`.`feed_from_fame_user` AS `feed_from_fame_user`,`f`.`feed_from_favourite_user` AS `feed_from_favourite_user`,`f`.`action_taken_by_venue_user` AS `action_taken_by_venue_user`,`f`.`feed_recieved_at` AS `feed_recieved_at`,`f`.`venue_id` AS `venue_id`,`c_s`.`handle` AS `handle` from (((`published_feeds` `f` join `customer` `c` on((`f`.`customer_id` = `c`.`customer_id`))) join `feed_images` `i` on((`i`.`feed_id` = `f`.`feed_id`))) join `customer_social_media_mapping` `c_s` on((`c_s`.`social_media_id` = `f`.`social_media_id`))) where ((`c_s`.`social_media_id` = `f`.`social_media_id`) and (`c_s`.`customer_id` = `f`.`customer_id`));

-- --------------------------------------------------------

--
-- Structure for view `v_published_spotlight`
--
DROP TABLE IF EXISTS `v_published_spotlight`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_published_spotlight` AS select `s`.`spotlight_id` AS `spotlight_id`,`s`.`title` AS `title`,`s`.`description` AS `description`,`s`.`type` AS `type`,`s`.`venue_id` AS `venue_id`,`s`.`published_start_date_time` AS `published_start_date_time`,`s`.`published_end_date_time` AS `published_end_date_time`,`s`.`event_start_date` AS `event_start_date`,`s`.`event_end_date` AS `event_end_date`,`s`.`event_start_time` AS `event_start_time`,`s`.`event_end_time` AS `event_end_time`,`s`.`active_day_string` AS `active_day_string`,`s`.`is_recurring` AS `is_recurring`,`s`.`venue_user_creator_id` AS `venue_user_creator_id`,`s`.`venue_user_moderator_id` AS `venue_user_moderator_id`,`s`.`fb` AS `fb`,`s`.`twt` AS `twt`,`s`.`ig` AS `ig`,`i`.`image` AS `image` from (`published_spotlight` `s` join `spotlight_images` `i` on((`i`.`spotlight_id` = `s`.`id`))) group by `i`.`spotlight_id`;

-- --------------------------------------------------------

--
-- Structure for view `v_venue_stars`
--
DROP TABLE IF EXISTS `v_venue_stars`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_venue_stars` AS select `c`.`customer_id` AS `customer_id`,`c`.`first_name` AS `first_name`,`c`.`image_url` AS `image`,`vs`.`is_superstar` AS `is_superstar`,`vs`.`tag_count` AS `venue_published_feed_count`,`vs`.`venue_id` AS `venue_id`,`vh`.`handle` AS `handle` from (((`venue_stars` `vs` join `venue` `v` on((`v`.`venue_id` = `vs`.`venue_id`))) join `customer` `c` on((`c`.`customer_id` = `vs`.`customer_id`))) join `v_handle` `vh` on((`vh`.`customer_id` = `c`.`customer_id`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
