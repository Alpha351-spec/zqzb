import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('图片转PDF', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传图片 选择尺寸 转换 验证下载', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/pdf/image-to-pdf/', { waitUntil: 'domcontentloaded' });
    await page.locator('#imageInput').setInputFiles(path.join(FIXTURES, 'test.jpg'));
    await page.locator('#convertBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 30000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.locator('#downloadBtn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
