import sharp from 'sharp';
import fs from 'fs';

const svgPath = './public/favicon.svg';
const svgBuffer = fs.readFileSync(svgPath);

// Apple Touch Icon: 180x180
await sharp(svgBuffer, { density: 300 })
  .resize(180, 180)
  .png()
  .toFile('./public/apple-touch-icon.png');
console.log('✅ apple-touch-icon.png  (180x180)');

// 32x32 PNG fallback
await sharp(svgBuffer, { density: 300 })
  .resize(32, 32)
  .png()
  .toFile('./public/favicon-32.png');
console.log('✅ favicon-32.png (32x32)');

console.log('\n🎉 Done — all favicon PNGs rasterised from SVG.');
