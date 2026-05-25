import { test, expect } from '@playwright/test';

test.describe('JSON格式化', () => {
  test('输入JSON字符串并格式化', async ({ page }) => {
    await page.goto('https://zqzb-online.top/json-formatter/', { waitUntil: 'domcontentloaded' });
    await page.locator('#jsonInput').fill('{"name":"test","value":123}');
    await page.locator('#formatBtn').click();
    await expect(page.locator('#jsonOutput')).toContainText('"name"');
  });

  test('输入无效JSON显示错误', async ({ page }) => {
    await page.goto('https://zqzb-online.top/json-formatter/', { waitUntil: 'domcontentloaded' });
    await page.locator('#jsonInput').fill('{invalid json}');
    await page.locator('#formatBtn').click();
    await expect(page.locator('#validationResult')).toBeVisible();
  });
});
