import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('图片裁剪', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传图片 裁剪 下载', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/image-crop/', { waitUntil: 'domcontentloaded' });
    await page.locator('#imageInput').setInputFiles(path.join(FIXTURES, 'test.jpg'));
    await expect(page.locator('#cropBtn')).toBeVisible({ timeout: 15000 });
    await page.locator('#cropBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 15000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await page.locator('#downloadBtn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.(jpg|jpeg|png|webp)$/i);
  });
});
