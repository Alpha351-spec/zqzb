import { test, expect } from '@playwright/test';

test.describe('文字去空格', () => {
  test('输入带空格文本并点击去除首尾空格', async ({ page }) => {
    await page.goto('https://zqzb-online.top/text-trim/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('  Hello World  ');
    await page.locator('#trimBtn').click();
    await expect(page.locator('#textOutput')).toHaveText('Hello World');
  });

  test('输入带换行空格文本并验证结果', async ({ page }) => {
    await page.goto('https://zqzb-online.top/text-trim/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('  你好 世界  ');
    await page.locator('#trimBtn').click();
    await expect(page.locator('#textOutput')).toHaveText('你好 世界');
  });
});
