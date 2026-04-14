import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'C:/Users/Manan/.gemini/antigravity/brain/f7d3e45a-ed82-4eee-939e-005075e7dff1/cloud_favicon_transparent_1776175514940.png';
const PUBLIC = './public';

// Ensure public dir exists
if (!fs.existsSync(PUBLIC)) fs.mkdirSync(PUBLIC, { recursive: true });

// 1. Apple Touch Icon: 180x180 PNG
await sharp(SRC)
  .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
console.log('✅ apple-touch-icon.png (180x180) created');

// 2. favicon.png (32x32) for ICO fallback
await sharp(SRC)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(PUBLIC, 'favicon-32.png'));
console.log('✅ favicon-32.png (32x32) created');

// 3. Read the original PNG as base64 to embed in SVG
const pngBuffer = fs.readFileSync(SRC);
const b64 = pngBuffer.toString('base64');
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
  <image width="512" height="512" xlink:href="data:image/png;base64,${b64}"/>
</svg>`;
fs.writeFileSync(path.join(PUBLIC, 'favicon.svg'), svgFavicon);
console.log('✅ favicon.svg created');

// 4. mask-icon.svg — single colour cloud silhouette for Safari pinned tabs
// Cloud shape path (flower-like lobes, matching the character's silhouette)
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path fill="black" d="
    M50,15
    C55,5 70,5 72,18
    C82,12 95,22 90,34
    C100,38 100,55 88,57
    C92,70 82,80 70,76
    C66,88 50,92 44,80
    C32,88 18,80 20,68
    C8,66 4,50 14,42
    C8,30 20,18 30,22
    C32,10 45,5 50,15Z
  "/>
</svg>`;
fs.writeFileSync(path.join(PUBLIC, 'mask-icon.svg'), maskSvg);
console.log('✅ mask-icon.svg created');

console.log('\n🎉 All favicon assets generated in /public');
