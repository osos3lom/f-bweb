import fs from 'node:fs';
import path from 'node:path';

const menuContent = fs.readFileSync('src/data/menu.ts', 'utf8');
const photoMatches = [...menuContent.matchAll(/"photo":\s*"([^"]+)"/g)].map(m => m[1]);

console.log('Total menu photo entries in menu.ts:', photoMatches.length);

let missingThumbs = 0;
let missingFull = 0;

for (const photo of photoMatches) {
  if (photo.startsWith('/')) {
    const cleanPath = photo.replace(/\.(jpe?g|png|webp)$/i, '').replace(/_thumb$/, '');
    const thumbFile = path.join('public', cleanPath.replace(/^\//, '') + '_thumb.webp');
    const fullFile = path.join('public', cleanPath.replace(/^\//, '') + '.webp');

    if (!fs.existsSync(thumbFile)) {
      console.error('❌ Missing thumb:', thumbFile);
      missingThumbs++;
    }
    if (!fs.existsSync(fullFile)) {
      console.error('❌ Missing full:', fullFile);
      missingFull++;
    }
  }
}

console.log('✅ Missing thumbnails:', missingThumbs);
console.log('✅ Missing full WebP:', missingFull);

const brandChecks = [
  '/brand/logo_thumb.webp',
  '/brand/logo.webp',
  '/brand/hero-poster.webp',
  '/brand/exterior.webp',
  '/brand/interior-fountain.webp',
  '/brand/mirror-arch.webp',
  '/brand/outdoor-lounge.webp'
];

console.log('\n--- Brand Assets Check ---');
for (const b of brandChecks) {
  const file = path.join('public', b.replace(/^\//, ''));
  if (!fs.existsSync(file)) {
    console.error('❌ Missing brand asset:', file);
  } else {
    const stat = fs.statSync(file);
    console.log(`  ✓ ${b} (${Math.round(stat.size / 1024)} KB)`);
  }
}
