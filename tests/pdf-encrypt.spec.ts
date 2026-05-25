import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('PDF加密', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传PDF 输入密码 加密 验证下载', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/pdf/encrypt/', { waitUntil: 'domcontentloaded' });
    await page.locator('#pdfInput').setInputFiles(path.join(FIXTURES, 'a.pdf'));
    await page.locator('#userPassword').fill('123456');
    await page.locator('#encryptBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 30000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.locator('#downloadBtn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
