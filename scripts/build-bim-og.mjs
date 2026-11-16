#!/usr/bin/env node
import sharp from "sharp";

const W = 1200;
const H = 630;
const bgPath = "public/blog/bim/scan-to-bim-gepeszet.jpg";
const logoPath = "public/bim-logo.png";
const outPath = "public/bim/og-default.jpg";

const bg = await sharp(bgPath)
  .resize(W, H, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.55 })
  .toBuffer();

const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a1d21" stop-opacity="0.82"/>
      <stop offset="55%" stop-color="#1a1d21" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#1a1d21" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="64" y="250" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#ffffff">VRGO BIM</text>
  <text x="64" y="330" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="600" fill="#e8eef3">3D téradatok tervezéshez és BIM-hez</text>
  <text x="64" y="390" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#b8c4ce">Pontfelhő · egyeztetett felmérési alap · referenciák</text>
</svg>`);

const logo = await sharp(logoPath).resize({ height: 56, fit: "inside" }).toBuffer();

await sharp(bg)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 48, left: 64 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
console.log(`wrote ${outPath} ${meta.width}x${meta.height} (${meta.size} bytes)`);
