import { test, expect } from '@playwright/test';

test.describe('随机数生成', () => {
  test('输入范围并生成随机数', async ({ page }) => {
    await page.goto('https://zqzb-online.top/random-number/', { waitUntil: 'domcontentloaded' });
    await page.locator('#minInput').fill('1');
    await page.locator('#maxInput').fill('100');
    await page.locator('#generateBtn').click();
    await expect(page.locator('#resultText')).not.toBeEmpty();
  });

  test('多次生成随机数结果可能不同', async ({ page }) => {
    await page.goto('https://zqzb-online.top/random-number/', { waitUntil: 'domcontentloaded' });
    await page.locator('#generateBtn').click();
    const num1 = await page.locator('#resultText').textContent();
    await page.locator('#generateBtn').click();
    const num2 = await page.locator('#resultText').textContent();
    expect(num1).toBeTruthy();
    expect(num2).toBeTruthy();
  });
});
