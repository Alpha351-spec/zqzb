import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('PDF水印', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传PDF 输入水印文字 添加水印 验证下载', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/pdf/watermark/', { waitUntil: 'domcontentloaded' });
    await page.locator('#pdfInput').setInputFiles(path.join(FIXTURES, 'a.pdf'));
    await page.locator('#watermarkText').fill('Confidential');
    await page.locator('#watermarkBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 30000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.locator('#downloadBtn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
