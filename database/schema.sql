-- ==============================================================
-- Global IT Services Database Schema
-- Database: global_it_db
-- Character Set: utf8mb4 / InnoDB Engine
-- ==============================================================

CREATE DATABASE IF NOT EXISTS `global_it_db` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `global_it_db`;

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS `newsletter_subscribers`;
DROP TABLE IF EXISTS `contact_inquiries`;
DROP TABLE IF EXISTS `services`;

-- 1. Services Table
CREATE TABLE `services` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `description` TEXT NOT NULL,
  `detailed_content` TEXT NULL,
  `image_path` VARCHAR(255) NOT NULL,
  `icon_name` VARCHAR(50) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_services_published` (`is_published`, `display_order`),
  INDEX `idx_services_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Contact Inquiries Table
CREATE TABLE `contact_inquiries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) NULL,
  `phone` VARCHAR(50) NULL,
  `service_interest` VARCHAR(100) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'in_progress', 'resolved', 'spam') NOT NULL DEFAULT 'new',
  `ip_address` VARCHAR(45) NULL,
  `user_agent` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_inquiries_email` (`email`),
  INDEX `idx_inquiries_status` (`status`),
  INDEX `idx_inquiries_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Newsletter Subscribers Table
CREATE TABLE `newsletter_subscribers` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('active', 'unsubscribed') NOT NULL DEFAULT 'active',
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_newsletter_email` (`email`),
  INDEX `idx_newsletter_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
