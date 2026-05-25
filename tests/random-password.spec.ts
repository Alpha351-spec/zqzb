import { test, expect } from '@playwright/test';

test.describe('随机密码生成', () => {
  test('点击生成按钮生成随机密码', async ({ page }) => {
    await page.goto('https://zqzb-online.top/random-password/', { waitUntil: 'domcontentloaded' });
    await page.locator('#generateBtn').click();
    const password = await page.locator('#passwordText').textContent();
    expect(password!.length).toBeGreaterThanOrEqual(8);
  });

  test('多次生成密码结果不同', async ({ page }) => {
    await page.goto('https://zqzb-online.top/random-password/', { waitUntil: 'domcontentloaded' });
    await page.locator('#generateBtn').click();
    const pwd1 = await page.locator('#passwordText').textContent();
    await page.locator('#generateBtn').click();
    const pwd2 = await page.locator('#passwordText').textContent();
    expect(pwd1).not.toBe(pwd2);
  });
});
