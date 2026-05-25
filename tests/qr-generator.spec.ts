import { test, expect } from '@playwright/test';

test.describe('二维码生成', () => {
  test('输入文本并生成二维码', async ({ page }) => {
    await page.goto('https://zqzb-online.top/qr-generator/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(() => typeof (window as any).QRCode !== 'undefined', { timeout: 20000 });
    await page.locator('#qrText').fill('https://example.com');
    await page.locator('#generateBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 10000 });
    const hasCanvas = await page.locator('#qrResult canvas').count();
    const hasImg = await page.locator('#qrResult img').count();
    expect(hasCanvas + hasImg).toBeGreaterThan(0);
  });

  test('输入中文文本生成二维码', async ({ page }) => {
    await page.goto('https://zqzb-online.top/qr-generator/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(() => typeof (window as any).QRCode !== 'undefined', { timeout: 20000 });
    await page.locator('#qrText').fill('你好世界');
    await page.locator('#generateBtn').click();
    await expect(page.locator('#resultArea')).toBeVisible({ timeout: 10000 });
    const hasCanvas = await page.locator('#qrResult canvas').count();
    const hasImg = await page.locator('#qrResult img').count();
    expect(hasCanvas + hasImg).toBeGreaterThan(0);
  });
});
