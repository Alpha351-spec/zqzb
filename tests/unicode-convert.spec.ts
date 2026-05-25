import { test, expect } from '@playwright/test';

test.describe('Unicode转换', () => {
  test('输入文本并转换为Unicode', async ({ page }) => {
    await page.goto('https://zqzb-online.top/unicode-convert/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('你好');
    await page.locator('#toUnicodeBtn').click();
    await expect(page.locator('#outputText')).toHaveValue(/\\u/);
  });

  test('输入Unicode并转换为文本', async ({ page }) => {
    await page.goto('https://zqzb-online.top/unicode-convert/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('\\u4f60\\u597d');
    await page.locator('#fromUnicodeBtn').click();
    await expect(page.locator('#outputText')).toHaveValue(/你好/);
  });
});
