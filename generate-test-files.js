const fs = require('fs');
const path = require('path');

const fixturesDir = path.join(__dirname, 'fixtures');
if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir);

// 1. 生成 1x1 像素白色PNG（用于图片压缩、裁剪等）
const tinyPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);
fs.writeFileSync(path.join(fixturesDir, 'tiny.png'), tinyPNG);

// 2. 生成一个稍大的 JPG（100x100，白色）
const { createCanvas } = require('canvas');
const canvas = createCanvas(100, 100);
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 100, 100);
const buffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync(path.join(fixturesDir, 'test.jpg'), buffer);

// 3. 复制一份作为 person.jpg（抠图可用）
fs.copyFileSync(path.join(fixturesDir, 'test.jpg'), path.join(fixturesDir, 'person.jpg'));

// 4. 生成一个简单的单页 PDF（使用 pdf-lib 库）
const { PDFDocument, StandardFonts } = require('pdf-lib');
(async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.drawText('Test PDF', { x: 50, y: 750, size: 20, font });
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(path.join(fixturesDir, 'a.pdf'), pdfBytes);
  // 复制一份作为 b.pdf
  fs.writeFileSync(path.join(fixturesDir, 'b.pdf'), pdfBytes);
})();