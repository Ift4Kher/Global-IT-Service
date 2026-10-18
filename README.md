# Global IT Services - Production-Ready Full-Stack Website

A production-ready full-stack IT services website built from the reference website [Global IT](https://globalit.technology/services/) and matching the user's corporate visual design specification.

![Global IT Social Preview](public/assets/images/social-preview.webp)

---

## 1. Project Architecture

The application strictly adheres to the requested technology stack:
- **Frontend**: HTML5, CSS3, Tailwind CSS (with native CLI production build), vanilla ES6+ JavaScript.
  - *No frontend frameworks* (No React, Vue, Angular, Next.js, or jQuery).
  - Native browser APIs (`Fetch API`, `IntersectionObserver`, CSS Transitions).
  - High-resolution local WebP and SVG graphics stored directly within the repository.
- **Backend**: Node.js LTS, Express.js REST APIs.
- **Database**: MySQL with `mysql2/promise` connection pooling, parameterized queries, and indexes.
- **Security**: Helmet HTTP security headers, Content Security Policy, rate limiting (`express-rate-limit`), Zod input validation, anti-spam honeypot, CORS, and request payload limits.
- **SEO & Accessibility**: Semantic HTML5, WCAG 2.2 AA compliant contrast, OpenGraph, Twitter Cards, Schema.org JSON-LD, `sitemap.xml`, and `robots.txt`.
- **Hosting Ready**: Compatible with cPanel CloudLinux Node.js Selector and Passenger hosting. No Docker required.

```
global-it/
├── public/                     # Public webroot
│   ├── index.html              # Main semantic HTML5 document
│   ├── favicon.ico             # Tab icon
│   ├── robots.txt              # Search crawler instructions
│   ├── sitemap.xml             # Search engine sitemap
│   └── assets/
│       ├── images/             # All local WebP and SVG image files
│       │   ├── logo.svg
│       │   ├── logo-white.svg
│       │   ├── hero-it-services.webp
│       │   ├── managed-services.webp
│       │   ├── cloud-services.webp
│       │   ├── maintenance-solutions.webp
│       │   ├── it-procurement.webp
│       │   ├── it-consultancy.webp
│       │   ├── security-solutions.webp
│       │   ├── why-choose-us.webp
│       │   ├── contact-banner.webp
│       │   └── social-preview.webp
│       ├── icons/              # Browser tab and mobile icons
│       ├── css/
│       │   └── styles.css      # Compiled minified Tailwind CSS
│       └── js/                 # Modular vanilla JavaScript
│           ├── main.js
│           ├── navigation.js
│           ├── animations.js
│           ├── services.js
│           ├── contact.js
│           └── newsletter.js
├── src/                        # Node.js Express backend
│   ├── config/
│   │   └── db.js               # MySQL connection pool
│   ├── controllers/            # Request handlers
│   │   ├── servicesController.js
│   │   ├── contactController.js
│   │   └── newsletterController.js
│   ├── middleware/             # Rate limiters & error handlers
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── routes/                 # Express API routes
│   │   ├── healthRoutes.js
│   │   ├── servicesRoutes.js
│   │   ├── contactRoutes.js
│   │   └── newsletterRoutes.js
│   ├── styles/
│   │   └── input.css           # Tailwind source stylesheet
│   ├── validators/             # Zod input schemas
│   │   ├── contactValidator.js
│   │   └── newsletterValidator.js
│   └── server.js               # Express application entry
├── database/
│   ├── schema.sql              # MySQL DDL schema
│   └── seed.sql                # Verified service records
├── docs/
│   ├── reference-analysis.md   # Reference site analysis
│   └── cpanel-deployment-guide.md # cPanel hosting instructions
├── tests/
│   └── api.test.js             # Automated test suite
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 2. Implemented Sections & Features

1. **Header & Navigation**:
   - Stylized brand logo with orbital emblem and tagline.
   - Sticky navigation bar with scroll blur and shadow transitions.
   - Active state indicator underline on scroll.
   - Mobile hamburger drawer with touch, keyboard, and `Escape` key close.
   - Primary "Talk to an Expert →" CTA.

2. **Hero Section**:
   - Eyebrow: `IT SERVICES & SOLUTIONS`.
   - Headline: `Technology That Moves Your Business Forward` (with "Forward" in electric blue).
   - Supporting description and dual CTAs (`Explore Services →`, `Contact Our Team`).
   - Trust indicators strip: `500+ Happy Clients`, `99.9% Uptime Guarantee`, `24/7 Expert Support`.
   - Large right visual: modern laptop displaying glowing 3D digital holographic globe overlooking city skyline.

3. **Services Section**:
   - Header: `Comprehensive IT Services for a Stronger Tomorrow`.
   - 6 Verified Service categories:
     1. **Managed Services**
     2. **Cloud Services**
     3. **Maintenance Solutions**
     4. **IT Procurement**
     5. **IT Consultancy**
     6. **Security Solutions**
   - Each card features real local 16:9 photography, category icon badge, description, and interactive "Learn More →" trigger.
   - Interactive Service Detail Modal with SLA overview and direct inquiry button.

4. **Why Choose Us Section**:
   - Headline: `More Than IT Support We're Your Technology Partner`.
   - 4-item benefits grid: Proactive Support, Reliable Infrastructure, Business-Focused Consulting, Security-Conscious Technology.
   - Collaborative photography of IT team with electric blue accent geometry.
   - Floating Trust Card overlay: "Trusted by businesses around the globe", 4 client avatars, "500+ satisfied clients".

5. **How We Work Section ("Our Process")**:
   - 4-step sequence:
     - `01 Discover Requirements`
     - `02 Plan the Solution`
     - `03 Implement the Solution`
     - `04 Monitor and Support`
   - Connected via subtle directional lines.

6. **Dark Contact CTA Banner**:
   - Deep navy background with glowing network topology.
   - Headline: `Let's Make IT Work Better for You.`
   - Glassmorphism contact card displaying Phone, Email, and Dhaka Office Location.

7. **Contact Section ("Get in Touch")**:
   - Verified contact details on the left.
   - Full interactive form on the right (Name, Email, Company, Service Interest dropdown, Message).
   - Real-time client and server validation with accessible status alerts.
   - Anti-spam honeypot defense.
   - Data persisted directly to MySQL `contact_inquiries` table.

8. **Footer & Back-to-Top**:
   - 4-column layout: brand mission, quick links, service links, social channels, and newsletter subscription.
   - Bottom copyright and legal links.
   - Smooth floating back-to-top button.

---

## 3. Quick Start & Local Setup

### Prerequisites
- Node.js 18+ (tested on Node.js 24)
- MySQL 5.7+ or MariaDB 10.3+ (e.g. XAMPP MySQL)

### 1. Clone & Install Dependencies
```bash
git clone <repository_url>
cd global-it
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and adjust database credentials:
```bash
cp .env.example .env
```
Default local settings for XAMPP:
```env
NODE_ENV=development
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=global_it_db
```

### 3. Initialize MySQL Database
Run the schema and seed scripts via MySQL CLI:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```
*(On Windows PowerShell, use `cmd /c "mysql -u root < database\schema.sql && mysql -u root < database\seed.sql"` or import via phpMyAdmin).*

### 4. Build Production Tailwind CSS
```bash
npm run build:css
```

### 5. Start the Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Application status, uptime, and database connectivity |
| `GET` | `/api/services` | Retrieve all 6 published IT services |
| `GET` | `/api/services/:slug` | Retrieve single service details by slug |
| `POST` | `/api/contact` | Validate and store contact inquiries in MySQL (Rate limited) |
| `POST` | `/api/newsletter` | Subscribe email address to newsletter (Rate limited) |

---

## 5. Automated Testing

Run the automated test suite verifying all REST API endpoints, validation logic, honeypot spam protection, and security headers:
```bash
npm test
```

Expected result:
```
✔ 1. GET /api/health returns 200 with healthy status
✔ 2. GET /api/services returns 6 published services
✔ 3. GET /api/services/:slug returns single service details
✔ 4. GET /api/services/unknown-slug returns 404
✔ 5. POST /api/contact with valid payload returns 201 Created
✔ 6. POST /api/contact with invalid payload returns 400 Bad Request
✔ 7. POST /api/contact with honeypot field triggers spam defense
✔ 8. POST /api/newsletter with valid email returns 200
✔ 9. Security headers are properly applied by Helmet
ℹ tests 9 | pass 9 | fail 0
```

---

## 6. Deployment to cPanel Hosting

For step-by-step instructions on setting up MySQL via cPanel Database Wizard, uploading files, configuring the CloudLinux Node.js Selector, and issuing AutoSSL certificates, see the dedicated [cPanel Deployment Guide](docs/cpanel-deployment-guide.md).

---

## 7. License
ISC License © 2026 Global IT.
