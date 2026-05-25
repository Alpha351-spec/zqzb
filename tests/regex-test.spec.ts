import { test, expect } from '@playwright/test';

test.describe('正则测试', () => {
  test('输入正则和测试文本自动匹配', async ({ page }) => {
    await page.goto('https://zqzb-online.top/regex-test/', { waitUntil: 'domcontentloaded' });
    await page.locator('#regexInput').fill('\\d+');
    await page.locator('#testText').fill('abc123def456');
    await expect(page.locator('#matchResult')).toContainText('123');
  });
});
