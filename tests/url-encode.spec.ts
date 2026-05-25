import { test, expect } from '@playwright/test';

test.describe('URL编解码', () => {
  test('输入文本并进行URL编码', async ({ page }) => {
    await page.goto('https://zqzb-online.top/url-encode/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('Hello World 你好');
    await page.locator('#encodeBtn').click();
    await expect(page.locator('#outputText')).toHaveValue(/%/);
  });

  test('输入编码文本并解码', async ({ page }) => {
    await page.goto('https://zqzb-online.top/url-encode/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('%E4%BD%A0%E5%A5%BD');
    await page.locator('#decodeBtn').click();
    await expect(page.locator('#outputText')).toHaveValue(/你好/);
  });
});
