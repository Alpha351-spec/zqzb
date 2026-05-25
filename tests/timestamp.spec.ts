import { test, expect } from '@playwright/test';

test.describe('时间戳转换', () => {
  test('输入时间戳并转换为日期', async ({ page }) => {
    await page.goto('https://zqzb-online.top/timestamp/', { waitUntil: 'domcontentloaded' });
    await page.locator('#timestampInput').fill('1700000000000');
    await page.locator('#toDateBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 10000 });
    const text = await page.locator('#resultText').innerText();
    expect(text).toContain('2023');
  });

  test('输入无效时间戳显示错误', async ({ page }) => {
    await page.goto('https://zqzb-online.top/timestamp/', { waitUntil: 'domcontentloaded' });
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.dismiss();
    });
    await page.locator('#timestampInput').fill('abc');
    await page.locator('#toDateBtn').click();
    await page.waitForTimeout(2000);
    expect(dialogMessage).toContain('有效');
  });
});
