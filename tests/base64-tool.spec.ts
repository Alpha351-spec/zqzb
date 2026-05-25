import { test, expect } from '@playwright/test';

test.describe('Base64编解码', () => {
  test('输入文本并编码为Base64', async ({ page }) => {
    await page.goto('https://zqzb-online.top/base64-tool/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('Hello World');
    await page.locator('#encodeBtn').click();
    const val = await page.locator('#base64Output').inputValue();
    expect(val).toContain('SGVsbG8gV29ybGQ');
  });

  test('输入Base64并解码为文本', async ({ page }) => {
    await page.goto('https://zqzb-online.top/base64-tool/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const el = document.getElementById('base64Output') as HTMLTextAreaElement;
      if (el) el.value = 'SGVsbG8gV29ybGQ=';
    });
    await page.locator('#decodeBtn').click();
    const val = await page.locator('#textInput').inputValue();
    expect(val).toContain('Hello World');
  });
});
