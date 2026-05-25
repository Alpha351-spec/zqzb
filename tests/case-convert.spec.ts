import { test, expect } from '@playwright/test';

test.describe('大小写转换', () => {
  test('输入小写文本并转换为大写', async ({ page }) => {
    await page.goto('https://zqzb-online.top/case-convert/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('hello world');
    await page.locator('#upperBtn').click();
    await expect(page.locator('#textOutput')).toContainText('HELLO WORLD');
  });
});
