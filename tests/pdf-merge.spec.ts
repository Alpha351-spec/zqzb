import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('PDF合并', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传两个PDF 合并 验证下载', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/pdf/merge/', { waitUntil: 'domcontentloaded' });
    await page.locator('#fileInput').setInputFiles([path.join(FIXTURES, 'a.pdf'), path.join(FIXTURES, 'b.pdf')]);
    await page.locator('#mergeBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 30000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.locator('#downloadBtn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
