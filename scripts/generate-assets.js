const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createAssets() {
  const imgDir = path.join(__dirname, '../public/assets/images');
  const iconDir = path.join(__dirname, '../public/assets/icons');
  const pubDir = path.join(__dirname, '../public');

  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
  if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

  // 1. Logo SVG (matching Global IT screenshot logo: circular tech icon with stylized G & network nodes, followed by "Global IT" and "Technology for a Better Tomorrow")
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="280" height="60" fill="none">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0066FF"/>
        <stop offset="50%" stop-color="#00A3FF"/>
        <stop offset="100%" stop-color="#00D2FF"/>
      </linearGradient>
      <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0066FF" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#00A3FF" stop-opacity="0.9"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <!-- Emblem -->
    <g transform="translate(6, 6)">
      <circle cx="24" cy="24" r="22" stroke="url(#orbitGrad)" stroke-width="2.5" stroke-dasharray="32 10" fill="#0A192F" />
      <circle cx="24" cy="24" r="16" fill="#0F2448" />
      <!-- Stylized 'G' icon with tech connectivity -->
      <path d="M24 13 A11 11 0 1 0 33 28 L24 28 L24 24 L35 24 A13 13 0 1 1 24 11 Z" fill="url(#logoGrad)" filter="url(#glow)"/>
      <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
      <!-- Orbital satellite nodes -->
      <circle cx="38" cy="14" r="2.5" fill="#00D2FF" />
      <circle cx="10" cy="34" r="2" fill="#0066FF" />
    </g>
    <!-- Brand Name Text -->
    <text x="64" y="29" font-family="Inter, system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" fill="#0F172A" letter-spacing="-0.5">Global IT</text>
    <text x="64" y="44" font-family="Inter, system-ui, -apple-system, sans-serif" font-weight="500" font-size="9" fill="#64748B" letter-spacing="0.4">Technology for a Better Tomorrow</text>
  </svg>`;

  fs.writeFileSync(path.join(imgDir, 'logo.svg'), logoSvg);
  console.log('Created logo.svg');

  // Dark variant of logo for dark footer
  const logoWhiteSvg = logoSvg.replace('fill="#0F172A"', 'fill="#FFFFFF"').replace('fill="#64748B"', 'fill="#94A3B8"');
  fs.writeFileSync(path.join(imgDir, 'logo-white.svg'), logoWhiteSvg);
  console.log('Created logo-white.svg');

  // 2. Security Solutions Card Image (800x480)
  // High tech cybersecurity shield with glowing cyber padlock & circuit data streams
  const secSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050C1A"/>
        <stop offset="50%" stop-color="#0A1E3F"/>
        <stop offset="100%" stop-color="#071329"/>
      </linearGradient>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#00D2FF"/>
        <stop offset="50%" stop-color="#0066FF"/>
        <stop offset="100%" stop-color="#0038A8"/>
      </linearGradient>
      <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00D2FF" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#0066FF" stop-opacity="0.1"/>
      </linearGradient>
      <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="800" height="480" fill="url(#bgGrad)"/>
    <!-- Cyber circuit matrix background -->
    <g opacity="0.25" stroke="#00A3FF" stroke-width="1.5" fill="none">
      <path d="M 0 120 L 250 120 L 320 190 L 480 190 L 550 120 L 800 120" />
      <path d="M 0 360 L 250 360 L 320 290 L 480 290 L 550 360 L 800 360" />
      <path d="M 150 0 L 150 180 L 220 250 L 220 480" />
      <path d="M 650 0 L 650 180 L 580 250 L 580 480" />
      <circle cx="250" cy="120" r="4" fill="#00D2FF"/>
      <circle cx="320" cy="190" r="4" fill="#00D2FF"/>
      <circle cx="480" cy="190" r="4" fill="#00D2FF"/>
      <circle cx="550" cy="120" r="4" fill="#00D2FF"/>
      <circle cx="250" cy="360" r="4" fill="#00D2FF"/>
      <circle cx="550" cy="360" r="4" fill="#00D2FF"/>
    </g>
    <!-- Central Glowing Security Shield -->
    <g transform="translate(400, 240)" filter="url(#neon)">
      <!-- Outer Hex/Shield boundary -->
      <path d="M 0 -130 L 105 -70 L 105 50 C 105 115 0 160 0 160 C 0 160 -105 115 -105 50 L -105 -70 Z" 
            fill="#0A224E" stroke="url(#shieldGrad)" stroke-width="5" fill-opacity="0.6"/>
      <!-- Inner Shield Glow -->
      <path d="M 0 -110 L 85 -60 L 85 45 C 85 100 0 138 0 138 C 0 138 -85 100 -85 45 L -85 -60 Z" 
            fill="none" stroke="#00D2FF" stroke-width="2" stroke-dasharray="12 6" opacity="0.8"/>
      <!-- Padlock Symbol -->
      <!-- Shackle -->
      <path d="M -26 -10 C -26 -38 26 -38 26 -10 L 26 5 L -26 5 Z" 
            fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
      <!-- Padlock Body -->
      <rect x="-38" y="5" width="76" height="60" rx="10" fill="url(#shieldGrad)" stroke="#00D2FF" stroke-width="2"/>
      <circle cx="0" cy="30" r="7" fill="#FFFFFF"/>
      <path d="M 0 37 L 0 50" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
    </g>
    <!-- Encrypted code telemetry labels -->
    <text x="35" y="45" font-family="Courier New, monospace" font-size="14" fill="#00A3FF" opacity="0.6">SEC_PROTOCOL: AES_256_GCM</text>
    <text x="35" y="68" font-family="Courier New, monospace" font-size="14" fill="#00D2FF" opacity="0.7">STATUS: ACTIVE FIREWALL [ONLINE]</text>
    <text x="610" y="445" font-family="Courier New, monospace" font-size="13" fill="#00A3FF" opacity="0.6">ZERO-TRUST SEC_LAYER</text>
  </svg>`;

  await sharp(Buffer.from(secSvg))
    .webp({ quality: 90 })
    .toFile(path.join(imgDir, 'security-solutions.webp'));
  console.log('Created security-solutions.webp');

  // 3. Contact Banner Network Background (1400x500)
  const bannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 500" width="1400" height="500">
    <defs>
      <linearGradient id="ctaBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#051026"/>
        <stop offset="50%" stop-color="#081A3E"/>
        <stop offset="100%" stop-color="#040D1F"/>
      </linearGradient>
      <radialGradient id="ctaGlow" cx="80%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0066FF" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#0066FF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1400" height="500" fill="url(#ctaBg)"/>
    <rect width="1400" height="500" fill="url(#ctaGlow)"/>
    <!-- Interconnected nodes web on right half -->
    <g stroke="#00A3FF" stroke-opacity="0.25" stroke-width="1.2" fill="none">
      <path d="M 850 120 L 980 80 L 1150 140 L 1280 90 L 1380 200"/>
      <path d="M 850 120 L 920 250 L 1080 220 L 1150 140"/>
      <path d="M 920 250 L 990 380 L 1140 340 L 1280 410"/>
      <path d="M 1080 220 L 1220 260 L 1340 180"/>
      <path d="M 1220 260 L 1280 410"/>
      <path d="M 980 80 L 1080 220"/>
      <path d="M 1140 340 L 1220 260"/>
    </g>
    <!-- Node points -->
    <g fill="#00D2FF">
      <circle cx="850" cy="120" r="4"/>
      <circle cx="980" cy="80" r="5" fill="#FFFFFF"/>
      <circle cx="1150" cy="140" r="4"/>
      <circle cx="1280" cy="90" r="6" fill="#0066FF" stroke="#00D2FF" stroke-width="2"/>
      <circle cx="920" cy="250" r="4"/>
      <circle cx="1080" cy="220" r="6" fill="#00A3FF"/>
      <circle cx="1220" cy="260" r="5" fill="#FFFFFF"/>
      <circle cx="990" cy="380" r="4"/>
      <circle cx="1140" cy="340" r="5"/>
      <circle cx="1280" cy="410" r="4"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(bannerSvg))
    .webp({ quality: 85 })
    .toFile(path.join(imgDir, 'contact-banner.webp'));
  console.log('Created contact-banner.webp');

  // 4. Social Preview (1200x630) for OpenGraph
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <rect width="1200" height="630" fill="#0A192F"/>
    <circle cx="1000" cy="200" r="300" fill="#0066FF" opacity="0.25"/>
    <g transform="translate(100, 150)">
      <text x="0" y="40" font-family="Inter, sans-serif" font-weight="700" font-size="20" fill="#00A3FF" letter-spacing="2">IT SERVICES &amp; SOLUTIONS</text>
      <text x="0" y="120" font-family="Inter, sans-serif" font-weight="800" font-size="54" fill="#FFFFFF">Technology That Moves</text>
      <text x="0" y="190" font-family="Inter, sans-serif" font-weight="800" font-size="54" fill="#0066FF">Your Business Forward</text>
      <text x="0" y="270" font-family="Inter, sans-serif" font-weight="400" font-size="24" fill="#94A3B8">Managed IT, Cloud Solutions, Maintenance, Procurement &amp; Security</text>
    </g>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .webp({ quality: 85 })
    .toFile(path.join(imgDir, 'social-preview.webp'));
  console.log('Created social-preview.webp');

  // 5. Avatars for the Trust Card (avatar-1 to avatar-4)
  const avatarColors = [
    { bg: '#0066FF', fg: '#FFFFFF', text: 'SJ' },
    { bg: '#00A3FF', fg: '#FFFFFF', text: 'MR' },
    { bg: '#0F172A', fg: '#00D2FF', text: 'AL' },
    { bg: '#2563EB', fg: '#FFFFFF', text: 'DK' }
  ];

  for (let i = 0; i < avatarColors.length; i++) {
    const a = avatarColors[i];
    const aSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="50" fill="${a.bg}"/>
      <circle cx="50" cy="40" r="18" fill="${a.fg}" opacity="0.9"/>
      <path d="M 20 85 C 20 65, 80 65, 80 85 Z" fill="${a.fg}" opacity="0.9"/>
    </svg>`;
    await sharp(Buffer.from(aSvg))
      .webp({ quality: 90 })
      .toFile(path.join(imgDir, `avatar-${i + 1}.webp`));
  }
  console.log('Created avatars 1-4');

  // 6. Favicons
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
    <rect width="64" height="64" rx="14" fill="#0A192F"/>
    <circle cx="32" cy="32" r="22" stroke="#00A3FF" stroke-width="3" stroke-dasharray="40 12" fill="none"/>
    <path d="M 32 18 A 14 14 0 1 0 44 38 L 32 38 L 32 32 L 46 32 A 16 16 0 1 1 32 16 Z" fill="#0066FF"/>
    <circle cx="32" cy="32" r="4" fill="#00D2FF"/>
  </svg>`;

  await sharp(Buffer.from(faviconSvg)).resize(16, 16).png().toFile(path.join(iconDir, 'favicon-16.png'));
  await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(path.join(iconDir, 'favicon-32.png'));
  await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile(path.join(iconDir, 'apple-touch-icon.png'));
  await sharp(Buffer.from(faviconSvg)).resize(32, 32).toFile(path.join(pubDir, 'favicon.ico'));
  console.log('Created favicons');
}

createAssets().catch(console.error);
