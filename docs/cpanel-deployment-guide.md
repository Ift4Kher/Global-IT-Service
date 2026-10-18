# cPanel Node.js & MySQL Deployment Guide

This guide provides end-to-end instructions for deploying the **Global IT Services** application to compatible cPanel hosting equipped with **CloudLinux cPanel Node.js Selector** (Phusion Passenger) and MySQL.

---

## 1. Prerequisites
- cPanel hosting account with **Setup Node.js App** support (Node.js 18.x, 20.x, or 22.x LTS).
- cPanel **MySQL Database Wizard** and **phpMyAdmin** access.
- Valid domain or subdomain pointing to your cPanel hosting account via DNS A-Records.
- SSL/TLS certificate (Free Let's Encrypt or cPanel AutoSSL).

---

## 2. Step-by-Step Deployment Procedure

### Step 1: Create MySQL Database and User
1. Log in to your cPanel dashboard.
2. Navigate to **Databases** → **MySQL Database Wizard**.
3. **Create Database**: Enter database name, e.g. `cpaneluser_global_it_db`. Click *Next Step*.
4. **Create Database User**: Enter username (e.g. `cpaneluser_ituser`) and generate a secure password. Click *Create User*.
5. **Assign Privileges**: Check **ALL PRIVILEGES** (SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, etc.). Click *Next Step*.
6. Note down:
   - Database Name: `cpaneluser_global_it_db`
   - Database User: `cpaneluser_ituser`
   - Password: `[YOUR_GENERATED_PASSWORD]`
   - Host: `localhost` or `127.0.0.1`

### Step 2: Import Database Schema and Seed Data
1. Return to cPanel and open **phpMyAdmin**.
2. Select your newly created database `cpaneluser_global_it_db` from the left sidebar.
3. Click the **Import** tab on the top menu.
4. Click **Choose File** and select `database/schema.sql` from your local project.
5. Click **Import** (or **Go**) at the bottom.
6. Once the schema is created, repeat the step and import `database/seed.sql` to populate the 6 verified IT services.

---

### Step 3: Prepare and Upload Application Code
1. On your local machine, run the production CSS build:
   ```bash
   npm run build:css
   ```
2. Compress the project files into a ZIP archive, **excluding**:
   - `node_modules/`
   - `.git/`
   - `.env` (will be created in cPanel)
3. In cPanel, navigate to **Files** → **File Manager**.
4. Create an application directory outside or adjacent to `public_html` (e.g. `/home/cpaneluser/global-it`).
   > **Security Note:** Keeping application source code in `/home/cpaneluser/global-it` and pointing the public root ensures that private configuration files (`.env`), database backups, and server-side logic are inaccessible from the web.
5. Upload your ZIP archive into `/home/cpaneluser/global-it` and extract it.

---

### Step 4: Configure the Node.js Application in cPanel
1. In cPanel, go to the **Software** section and click **Setup Node.js App**.
2. Click **Create Application**.
3. Fill in the application settings:
   - **Node.js version**: Choose `20.x` or `22.x` (LTS recommended).
   - **Application mode**: `Production`
   - **Application root**: `global-it` (the directory where files were extracted)
   - **Application URL**: `yourdomain.com` or `services.yourdomain.com`
   - **Application startup file**: `src/server.js`
4. Click **Create**.
5. Once created, cPanel will display a command to enter the virtual environment, for example:
   ```bash
   source /home/cpaneluser/nodevenv/global-it/20/bin/activate && cd /home/cpaneluser/global-it
   ```

---

### Step 5: Install Production Dependencies
1. In the **Setup Node.js App** interface, scroll to the **Detected configuration files** section.
2. Click **Run NPM Install** (or access cPanel Terminal and run `npm install --omit=dev`).
3. Verify all production dependencies (`express`, `mysql2`, `dotenv`, `helmet`, `cors`, `express-rate-limit`, `zod`) install cleanly.

---

### Step 6: Configure Environment Variables
1. In cPanel File Manager, create or edit the `.env` file inside `/home/cpaneluser/global-it/`:
   ```env
   NODE_ENV=production
   PORT=3000

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=cpaneluser_ituser
   DB_PASSWORD=YourSecurePasswordHere
   DB_NAME=cpaneluser_global_it_db
   DB_CONNECTION_LIMIT=10

   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   CONTACT_RATE_LIMIT_MAX=10

   APP_URL=https://yourdomain.com
   ```
2. Save the file. Ensure file permissions are set to `600` or `640`.

---

### Step 7: Restart Application and Verify
1. In **Setup Node.js App**, click **Restart**.
2. Open your browser and navigate to `https://yourdomain.com/api/health`.
   - Expected Response:
     ```json
     {
       "status": "healthy",
       "timestamp": "2026-10-18T...",
       "uptime": 12.4,
       "environment": "production",
       "database": {
         "connected": true,
         "type": "MySQL"
       }
     }
     ```
3. Visit `https://yourdomain.com/` to verify the homepage, images, interactive services modal, and submit a test inquiry through the contact form.

---

## 3. SSL / HTTPS Enforcement
1. In cPanel, navigate to **Security** → **SSL/TLS Status**.
2. Locate your domain and click **Run AutoSSL**.
3. Once the SSL certificate is issued, navigate to **Domains** and toggle **Force HTTPS Redirect** to ON.

---

## 4. Maintenance and Log Monitoring
- **Application Error Logs**: Available under `/home/cpaneluser/global-it/stderr.log` or inside the cPanel Node.js App interface.
- **Access Logs**: Found in `/home/cpaneluser/logs/`.
- **Database Backups**: Schedule automated MySQL backups using cPanel **Backup Wizard** or cron jobs via `mysqldump`.
