const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/server');
const { pool } = require('../src/config/db');

test.after(async () => {
  await pool.end();
});

// Helper to make mock requests to express app without running on real network socket
async function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const http = require('http');
    const server = http.createServer(app);

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const reqOptions = {
        hostname: '127.0.0.1',
        port: port,
        path: options.path,
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      };

      const req = http.request(reqOptions, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          server.close();
          let parsed;
          try {
            parsed = JSON.parse(body);
          } catch (e) {
            parsed = body;
          }
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: parsed
          });
        });
      });

      req.on('error', (err) => {
        server.close();
        reject(err);
      });

      if (options.body) {
        req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
      }
      req.end();
    });
  });
}

test('1. GET /api/health returns 200 with healthy status', async () => {
  const res = await makeRequest({ path: '/api/health', method: 'GET' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.status, 'healthy');
  assert.ok(res.body.uptime >= 0);
  assert.equal(res.body.database.type, 'MySQL');
});

test('2. GET /api/services returns 6 published services', async () => {
  const res = await makeRequest({ path: '/api/services', method: 'GET' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.equal(res.body.data.length, 6);

  const slugs = res.body.data.map(s => s.slug);
  assert.ok(slugs.includes('managed-services'));
  assert.ok(slugs.includes('cloud-services'));
  assert.ok(slugs.includes('maintenance-solutions'));
  assert.ok(slugs.includes('it-procurement'));
  assert.ok(slugs.includes('it-consultancy'));
  assert.ok(slugs.includes('security-solutions'));
});

test('3. GET /api/services/:slug returns single service details', async () => {
  const res = await makeRequest({ path: '/api/services/managed-services', method: 'GET' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.title, 'Managed Services');
  assert.equal(res.body.data.slug, 'managed-services');
});

test('4. GET /api/services/unknown-slug returns 404', async () => {
  const res = await makeRequest({ path: '/api/services/non-existent-service-slug', method: 'GET' });
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.success, false);
});

test('5. POST /api/contact with valid payload returns 201 Created', async () => {
  const res = await makeRequest({
    path: '/api/contact',
    method: 'POST',
    body: {
      name: 'Sarah Connor',
      email: 'sarah.connor@cyberdyne.org',
      company: 'Resistance Inc.',
      phone: '+1 555-0199',
      service_interest: 'Security Solutions',
      message: 'We require an urgent assessment of our security architecture and intrusion prevention systems.'
    }
  });

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.ok(res.body.inquiryId > 0);
});

test('6. POST /api/contact with invalid payload returns 400 Bad Request', async () => {
  const res = await makeRequest({
    path: '/api/contact',
    method: 'POST',
    body: {
      name: 'S', // too short
      email: 'not-an-email',
      message: 'short' // too short
    }
  });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.ok(Array.isArray(res.body.errors));
});

test('7. POST /api/contact with honeypot field triggers spam defense', async () => {
  const res = await makeRequest({
    path: '/api/contact',
    method: 'POST',
    body: {
      name: 'Spam Bot 3000',
      email: 'spambot@automated-marketing.xyz',
      message: 'Buy cheap backlinks right now at high discount prices!',
      website_hp: 'http://spam-site.com' // Honeypot filled!
    }
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.inquiryId, undefined); // Should not insert into database
});

test('8. POST /api/newsletter with valid email returns 200', async () => {
  const res = await makeRequest({
    path: '/api/newsletter',
    method: 'POST',
    body: {
      email: 'subscriber.test@globalit.technology'
    }
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
});

test('9. Security headers are properly applied by Helmet', async () => {
  const res = await makeRequest({ path: '/api/health', method: 'GET' });
  assert.equal(res.headers['x-content-type-options'], 'nosniff');
  assert.equal(res.headers['x-frame-options'], 'SAMEORIGIN');
  assert.ok(res.headers['content-security-policy']);
});
