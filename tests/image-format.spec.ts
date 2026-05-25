import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('图片格式转换', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传图片 选择PNG 转换 下载', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/image-format/', { waitUntil: 'domcontentloaded' });
    await page.locator('#imageInput').setInputFiles(path.join(FIXTURES, 'test.jpg'));
    await page.locator('#formatSelect').selectOption('png');
    await page.locator('#convertBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 15000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await page.locator('#downloadBtn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.png$/i);
  });
});
