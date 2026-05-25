import { test, expect } from '@playwright/test';

test.describe('颜色选择器', () => {
  test('页面加载后显示默认颜色值', async ({ page }) => {
    await page.goto('https://zqzb-online.top/color-picker/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#hexValue')).toHaveValue('#111111');
  });

  test('颜色输入改变后RGB值更新', async ({ page }) => {
    await page.goto('https://zqzb-online.top/color-picker/', { waitUntil: 'domcontentloaded' });
    await page.locator('#hexInput').fill('#ff0000');
    await page.locator('#applyHexBtn').click();
    await expect(page.locator('#rgbValue')).toHaveValue('rgb(255, 0, 0)');
  });
});
