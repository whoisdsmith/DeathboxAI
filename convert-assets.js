// This is a simple script to convert SVG to PNG and ICO
// You'll need to install the required packages:
// npm install sharp

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to create a simple PNG image programmatically
async function createSimplePNG(outputPath, size, text) {
  // Create a new image with black background
  const svgBuffer = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#000000" />
      <rect x="${size/16}" y="${size/16}" width="${size - size/8}" height="${size - size/8}" stroke="#33ff33" stroke-width="${size/16}" fill="none" />
      <text x="${size/2}" y="${size/2}" font-family="monospace" font-size="${size/2}" font-weight="bold" fill="#33ff33" text-anchor="middle" dominant-baseline="middle">${text}</text>
      <circle cx="${size/4}" cy="${size/4}" r="${size/16}" fill="#33ff33" />
      <circle cx="${size*3/4}" cy="${size*3/4}" r="${size/16}" fill="#33ff33" />
    </svg>
  `);

  await sharp(svgBuffer)
    .png()
    .toFile(outputPath);

  console.log(`Created ${outputPath}`);
}

// Create the logo.png (32x32)
createSimplePNG(path.join(__dirname, 'public', 'logo.png'), 32, 'DB')
  .then(() => {
    // Create the favicon.ico (16x16)
    return createSimplePNG(path.join(__dirname, 'public', 'favicon.png'), 16, 'DB');
  })
  .then(() => {
    console.log('Assets created successfully!');
    console.log('Note: favicon.png needs to be renamed to favicon.ico');
  })
  .catch(err => {
    console.error('Error creating assets:', err);
  });