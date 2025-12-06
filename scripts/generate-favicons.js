import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

// Generates PNG icons at common sizes from public/favicon.svg and creates favicon.ico
(async () => {
  try {
    const svgPath = path.resolve('public', 'favicon.svg');
    if (!fs.existsSync(svgPath)) {
      throw new Error('public/favicon.svg not found. Please ensure it exists.');
    }

    const outDir = path.resolve('public', 'icons');
    await fs.promises.mkdir(outDir, { recursive: true });

    const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 256, 512];
    console.log('Generating PNG icons:', sizes.join(', '));

    for (const s of sizes) {
      const outPath = path.join(outDir, `icon-${s}.png`);
      await sharp(svgPath)
        .resize(s, s, { fit: 'contain' })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(outPath);
    }

    // Create favicon.ico from 16/32/48
    const icoBuffer = await pngToIco([
      path.join(outDir, 'icon-16.png'),
      path.join(outDir, 'icon-32.png'),
      path.join(outDir, 'icon-48.png')
    ]);
    fs.writeFileSync(path.resolve('public', 'favicon.ico'), icoBuffer);

    console.log('Favicons generated in public/icons and public/favicon.ico');
  } catch (err) {
    console.error('Error generating favicons:', err);
    process.exit(1);
  }
})();
