import { Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';

export const BASE_URL = 'https://zqzb-online.top';

export const TOOL_PAGES = {
  pages: [
    { name: '首页', path: '/' },
    { name: '关于', path: '/about.html' },
    { name: '隐私政策', path: '/privacy.html' },
    { name: '使用指南', path: '/guide.html' },
  ],
  image: [
    { name: '图片压缩', path: '/image-compress/' },
    { name: '图片裁剪', path: '/image-crop/' },
    { name: '格式转换', path: '/image-format/' },
    { name: '图片水印', path: '/image-watermark/' },
    { name: '尺寸调整', path: '/image-resize/' },
    { name: '智能抠图', path: '/bg-remover/' },
  ],
  text: [
    { name: '文字去空格', path: '/text-trim/' },
    { name: '字数统计', path: '/word-count/' },
    { name: '大小写转换', path: '/case-convert/' },
    { name: 'JSON格式化', path: '/json-formatter/' },
    { name: '文字对比', path: '/text-diff/' },
    { name: '正则测试', path: '/regex-test/' },
  ],
  encode: [
    { name: 'Base64', path: '/base64-tool/' },
    { name: 'URL编解码', path: '/url-encode/' },
    { name: 'Unicode', path: '/unicode-convert/' },
    { name: '颜色选择器', path: '/color-picker/' },
  ],
  generate: [
    { name: '二维码', path: '/qr-generator/' },
    { name: '随机密码', path: '/random-password/' },
    { name: '时间戳', path: '/timestamp/' },
    { name: '随机数', path: '/random-number/' },
    { name: 'UUID', path: '/uuid-generator/' },
  ],
  pdf: [
    { name: 'PDF合并', path: '/pdf/merge/' },
    { name: 'PDF拆分', path: '/pdf/split/' },
    { name: '提取页面', path: '/pdf/extract/' },
    { name: '删除页面', path: '/pdf/delete/' },
    { name: 'PDF旋转', path: '/pdf/rotate/' },
    { name: 'PDF转图片', path: '/pdf/pdf-to-image/' },
    { name: '图片转PDF', path: '/pdf/image-to-pdf/' },
    { name: 'PDF压缩', path: '/pdf/compress/' },
    { name: 'PDF加密', path: '/pdf/encrypt/' },
    { name: 'PDF解密', path: '/pdf/decrypt/' },
    { name: 'PDF水印', path: '/pdf/watermark/' },
    { name: 'PDF预览', path: '/pdf/preview/' },
  ],
};

const VALID_PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAtUlEQVR4nO3QQQkAIADAQDOZybDGsoIfGcLBAowbe01dNvKDj4IFC1YeLFiw8mDBgpUHCxasPFiwYOXBggUrDxYsWHmwYMHKgwULVh4sWLDyYMGClQcLFqw8WLBg5cGCBSsPFixYebBgwcqDBQtWHixYsPJgwYKVBwsWrDxYsGDlwYIFKw8WLFh5sGDByoMFC1YeLFiw8mDBgpUHCxasPFiwYOXBggUrDxYsWHmwYMHKgwXrTQcS+Gr8R6dvggAAAABJRU5ErkJggg==';

async function createTestPdf(pageCount: number): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= pageCount; i++) {
    const page = pdfDoc.addPage([612, 792]);
    page.drawText('Page ' + i, { x: 100, y: 700, size: 24, font });
  }
  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}

export async function ensureFixtures() {
  const fixturesDir = path.join(__dirname, '..', 'fixtures');
  if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir, { recursive: true });

  const testPng = path.join(fixturesDir, 'test.jpg');
  if (!fs.existsSync(testPng) || fs.statSync(testPng).size < 200) {
    fs.writeFileSync(testPng, Buffer.from(VALID_PNG_BASE64, 'base64'));
  }

  const personJpg = path.join(fixturesDir, 'person.jpg');
  if (!fs.existsSync(personJpg) || fs.statSync(personJpg).size < 200) {
    fs.copyFileSync(testPng, personJpg);
  }

  const aPdf = path.join(fixturesDir, 'a.pdf');
  if (!fs.existsSync(aPdf) || fs.statSync(aPdf).size < 100) {
    const pdfBytes = await createTestPdf(2);
    fs.writeFileSync(aPdf, pdfBytes);
  }

  const bPdf = path.join(fixturesDir, 'b.pdf');
  if (!fs.existsSync(bPdf) || fs.statSync(bPdf).size < 100) {
    const pdfBytes = await createTestPdf(2);
    fs.writeFileSync(bPdf, pdfBytes);
  }

  const testTxt = path.join(fixturesDir, 'test.txt');
  if (!fs.existsSync(testTxt)) {
    fs.writeFileSync(testTxt, 'Hello World Test Content', 'utf-8');
  }

  const testJson = path.join(fixturesDir, 'test.json');
  if (!fs.existsSync(testJson)) {
    fs.writeFileSync(testJson, '{"name":"test","value":123}', 'utf-8');
  }
}

export async function waitForReady(page: Page, selector: string, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

export async function clickPrimaryButton(page: Page, text: string | RegExp) {
  const btn = page.locator('button.primary, button.btn-primary, button.btn').filter({ hasText: text }).first();
  await btn.waitFor({ state: 'visible', timeout: 5000 });
  await btn.click();
  return btn;
}

export async function checkPageTitle(page: Page, url: string) {
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
  expect(response?.status()).toBe(200);
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
  return title;
}

export async function checkFooter(page: Page) {
  const footer = page.locator('footer').first();
  await expect(footer).toBeVisible();
}

export async function checkNavBackLink(page: Page) {
  const backLink = page.locator('.nav-bar a').first();
  await expect(backLink).toBeVisible();
}
