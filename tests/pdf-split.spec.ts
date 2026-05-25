import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('PDF拆分', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传PDF 填写范围 拆分 验证下载', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/pdf/split/', { waitUntil: 'domcontentloaded' });
    await page.locator('#fileInput').setInputFiles(path.join(FIXTURES, 'a.pdf'));
    await page.locator('#rangeInput').fill('1');
    await page.locator('#splitBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 30000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.locator('#downloadLinks a').first().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
