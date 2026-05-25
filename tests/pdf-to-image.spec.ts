import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('PDF转图片', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传PDF 选择格式 转换 验证结果', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://zqzb-online.top/pdf/pdf-to-image/', { waitUntil: 'domcontentloaded' });
    await page.locator('#pdfInput').setInputFiles(path.join(FIXTURES, 'a.pdf'));
    await page.locator('#convertBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 60000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.locator('#downloadAllBtn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();
  });
});
