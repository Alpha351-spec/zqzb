import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('PDF预览', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test('上传PDF 验证页面渲染', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://zqzb-online.top/pdf/preview/', { waitUntil: 'domcontentloaded' });
    await page.locator('#pdfInput').setInputFiles(path.join(FIXTURES, 'a.pdf'));
    await expect(page.locator('canvas').first()).toBeVisible({ timeout: 15000 });
  });
});
