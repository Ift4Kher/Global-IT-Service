const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'global_it_db',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  charset: 'utf8mb4'
});

// Test connection on module initialization
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`[Database] Connected successfully to MySQL database "${process.env.DB_NAME || 'global_it_db'}"`);
    connection.release();
    return true;
  } catch (error) {
    console.error(`[Database Warning] Unable to connect to MySQL database: ${error.message}`);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};
