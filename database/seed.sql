-- ==============================================================
-- Global IT Services Seed Data
-- ==============================================================

USE `global_it_db`;

-- Clear existing data
DELETE FROM `services`;

-- Insert 6 Verified Services from Reference and Screenshot
INSERT INTO `services` (`title`, `slug`, `description`, `detailed_content`, `image_path`, `icon_name`, `display_order`, `is_published`) VALUES
(
  'Managed Services',
  'managed-services',
  'Proactive monitoring, management and support for your IT infrastructure.',
  'Global IT ensures your systems are properly maintained at a mutually agreed upon SLA. Our managed IT services deliver 24/7/365 proactive monitoring, prompt patch deployment, network security management, automated backups, and dedicated technical helpdesk support to eliminate costly downtime.',
  '/assets/images/managed-services.webp',
  'server',
  1,
  1
),
(
  'Cloud Services',
  'cloud-services',
  'Flexible, scalable and secure cloud solutions for modern businesses.',
  'Global IT provides leading cloud migration and architecture services to empower your workforce. From hybrid cloud deployments and Microsoft 365 migrations to high-availability multi-region cloud infrastructures, we scale computing power efficiently while cutting capital expenditures.',
  '/assets/images/cloud-services.webp',
  'cloud',
  2,
  1
),
(
  'Maintenance Solutions',
  'maintenance-solutions',
  'Keep your systems running smoothly with expert maintenance and support.',
  'Our technicians are certified by industry standards. We provide comprehensive preventative hardware maintenance, structured network cabling, workstation tuning, server health diagnostics, and emergency on-site hardware replacements to ensure peak operating performance.',
  '/assets/images/maintenance-solutions.webp',
  'wrench',
  3,
  1
),
(
  'IT Procurement',
  'it-procurement',
  'Get the right technology, at the right price, from trusted partners.',
  'Our team offers end-to-end IT procurement solutions. We source certified enterprise hardware, laptops, servers, network switches, and software licensing directly through global tier-1 technology vendors, guaranteeing competitive pricing and zero-touch deployment.',
  '/assets/images/it-procurement.webp',
  'shopping-cart',
  4,
  1
),
(
  'IT Consultancy',
  'it-consultancy',
  'Strategic guidance to help you plan, build and grow with confidence.',
  'Whether it is IT roadmap strategy, digital transformation, architecture planning, risk management, or regulatory IT compliance, our seasoned consultants align technology investments with your long-term business goals.',
  '/assets/images/it-consultancy.webp',
  'users',
  5,
  1
),
(
  'Security Solutions',
  'security-solutions',
  'Protect your data, people and systems with advanced security solutions.',
  'We architect multi-layered cybersecurity defense solutions. Our offerings include endpoint threat protection, managed next-gen firewalls, zero-trust network access, vulnerability assessments, email anti-phishing, and rapid incident response protocols.',
  '/assets/images/security-solutions.webp',
  'shield-check',
  6,
  1
);
