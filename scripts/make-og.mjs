// One-off: renders public/og.png (1200x630) from inline SVG. Run: node scripts/make-og.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const logo = readFileSync('public/logo.svg', 'utf8').replace('<svg ', '<svg x="80" y="80" width="327" height="48" ');
const bars = [380, 380, 330, 280, 200, 120]
  .map((w, i) => `<rect x="${1120 - 40 - w / 2 - 80}" y="${150 + i * 62}" width="${w}" height="44" rx="8" fill="#0e1526" stroke="#1e2a44"/><rect x="${1120 - 40 - w / 2 - 80}" y="${150 + i * 62}" width="3" height="44" rx="1.5" fill="#22e58c"/>`)
  .join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
</defs>
<rect width="1200" height="630" fill="#070b14"/>${logo}
<text x="80" y="300" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#e6edf7">Put six layers between</text>
<text x="80" y="380" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#22e58c">the internet and your code.</text>
<text x="80" y="460" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#8b97ad">Open-source Python API gateway</text>
<g transform="translate(0 0)">${bars}</g>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('og.png written');
