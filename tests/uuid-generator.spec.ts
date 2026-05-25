import { test, expect } from '@playwright/test';

test.describe('UUID生成', () => {
  test('点击生成按钮生成UUID', async ({ page }) => {
    await page.goto('https://zqzb-online.top/uuid-generator/', { waitUntil: 'domcontentloaded' });
    await page.locator('#generateBtn').click();
    await expect(page.locator('#uuidText')).toContainText('-');
  });

  test('多次生成UUID结果不同', async ({ page }) => {
    await page.goto('https://zqzb-online.top/uuid-generator/', { waitUntil: 'domcontentloaded' });
    await page.locator('#generateBtn').click();
    const uuid1 = await page.locator('#uuidText').textContent();
    await page.locator('#generateBtn').click();
    const uuid2 = await page.locator('#uuidText').textContent();
    expect(uuid1).not.toBe(uuid2);
  });
});
