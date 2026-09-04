import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const TARGET_DIRS = ['public/menu-images', 'public/brand'];

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function optimizeAll() {
  console.log('🚀 Starting image optimization pipeline with sharp...');
  const startTime = Date.now();

  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalThumbs = 0;
  let processedCount = 0;

  for (const dir of TARGET_DIRS) {
    const allFiles = getFiles(dir);
    const imageFiles = allFiles.filter(f => {
      const ext = path.extname(f).toLowerCase();
      const base = path.basename(f);
      return (
        (ext === '.jpg' || ext === '.jpeg' || ext === '.png') &&
        !base.includes('_thumb.') &&
        !base.includes('hero-bg')
      );
    });

    console.log(`\n📁 Scanning ${dir}: found ${imageFiles.length} images to optimize.`);

    for (const filePath of imageFiles) {
      const ext = path.extname(filePath).toLowerCase();
      const dirName = path.dirname(filePath);
      const baseName = path.basename(filePath, ext);
      const isLogo = baseName.includes('logo');

      const originalBuffer = fs.readFileSync(filePath);
      const origSize = originalBuffer.length;
      totalOriginal += origSize;

      // 1. Generate Full / Showcase WebP (max 960px width/height)
      const webpPath = path.join(dirName, `${baseName}.webp`);
      const fullWebpBuffer = await sharp(originalBuffer)
        .rotate() // auto-orient from EXIF
        .resize({ width: 960, height: 960, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: isLogo ? 88 : 82, effort: 5 })
        .toBuffer();

      fs.writeFileSync(webpPath, fullWebpBuffer);
      totalOptimized += fullWebpBuffer.length;

      // 2. Generate Thumbnail WebP (max 360px width/height)
      const thumbPath = path.join(dirName, `${baseName}_thumb.webp`);
      const thumbWebpBuffer = await sharp(originalBuffer)
        .rotate()
        .resize({ width: 360, height: 360, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: isLogo ? 85 : 80, effort: 4 })
        .toBuffer();

      fs.writeFileSync(thumbPath, thumbWebpBuffer);
      totalThumbs += thumbWebpBuffer.length;

      // 3. Re-encode original file to compact fallback (max 960px, mozjpeg/png)
      if (ext === '.jpg' || ext === '.jpeg') {
        const compressedJpg = await sharp(originalBuffer)
          .rotate()
          .resize({ width: 960, height: 960, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();

        // Only overwrite if it actually saved space
        if (compressedJpg.length < origSize) {
          fs.writeFileSync(filePath, compressedJpg);
        }
      } else if (ext === '.png') {
        const compressedPng = await sharp(originalBuffer)
          .rotate()
          .resize({ width: 960, height: 960, fit: 'inside', withoutEnlargement: true })
          .png({ quality: 85, compressionLevel: 9, palette: true })
          .toBuffer();

        if (compressedPng.length < origSize) {
          fs.writeFileSync(filePath, compressedPng);
        }
      }

      processedCount++;
      if (processedCount % 25 === 0 || processedCount === imageFiles.length) {
        console.log(`  ✓ Processed ${processedCount} images...`);
      }
    }
  }

  // Generate hero poster frame from interior-fountain.jpg if it exists
  const fountainSrc = 'public/brand/interior-fountain.jpg';
  if (fs.existsSync(fountainSrc)) {
    const posterBuffer = await sharp(fountainSrc)
      .resize({ width: 960, height: 540, fit: 'cover' })
      .webp({ quality: 75 })
      .toBuffer();
    fs.writeFileSync('public/brand/hero-poster.webp', posterBuffer);
    console.log('  ✓ Generated public/brand/hero-poster.webp for video background poster');
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n========================================');
  console.log('🎉 IMAGE OPTIMIZATION COMPLETED');
  console.log(`⏱️ Duration: ${durationSec}s`);
  console.log(`📸 Images processed: ${processedCount}`);
  console.log(`📦 Original Total Size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`✨ Optimized Showcase WebP: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}% savings)`);
  console.log(`⚡ Thumbnail WebP (cards): ${(totalThumbs / (1024 * 1024)).toFixed(2)} MB (${((1 - totalThumbs / totalOriginal) * 100).toFixed(1)}% savings)`);
  console.log('========================================\n');
}

optimizeAll().catch(err => {
  console.error('❌ Error optimizing images:', err);
  process.exit(1);
});
