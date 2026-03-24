import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR  = 'C:/Users/hp/Downloads/هشتاج/menu-images';
const OUTPUT_DIR = './public/menu-images';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(INPUT_DIR)
  .filter(f => /\.(svg|png|jpg|jpeg)$/i.test(f))
  .sort((a, b) => parseInt(a) - parseInt(b));

console.log(`Found ${files.length} files. Converting to WebP...`);

let done = 0;
for (const file of files) {
  const name = path.parse(file).name;
  const input  = path.join(INPUT_DIR, file);
  const output = path.join(OUTPUT_DIR, `${name}.webp`);

  try {
    await sharp(input, { density: 150 })
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output);

    const sizeBefore = (fs.statSync(input).size  / 1024 / 1024).toFixed(1);
    const sizeAfter  = (fs.statSync(output).size / 1024 / 1024).toFixed(1);
    console.log(`✅ ${file}: ${sizeBefore}MB → ${sizeAfter}MB`);
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
  }
  done++;
}

console.log(`\nDone! ${done}/${files.length} files converted.`);
