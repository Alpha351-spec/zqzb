import { test, expect } from '@playwright/test';

test.describe('文本对比', () => {
  test('输入两段文本并对比差异', async ({ page }) => {
    await page.goto('https://zqzb-online.top/text-diff/', { waitUntil: 'domcontentloaded' });
    await page.locator('#text1').fill('Hello World');
    await page.locator('#text2').fill('Hello World!');
    await page.locator('#compareBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible();
  });
});
