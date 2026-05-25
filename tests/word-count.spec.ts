import { test, expect } from '@playwright/test';

test.describe('字数统计', () => {
  test('输入文本后自动统计字数', async ({ page }) => {
    await page.goto('https://zqzb-online.top/word-count/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('Hello World 你好世界');
    await expect(page.locator('body')).toContainText('10');
  });

  test('输入多行文本验证统计结果', async ({ page }) => {
    await page.goto('https://zqzb-online.top/word-count/', { waitUntil: 'domcontentloaded' });
    await page.locator('#textInput').fill('Hello 世界 123');
    await expect(page.locator('body')).toContainText('2');
  });
});
