import { test, expect } from '@playwright/test';
import path from 'path';
import { ensureFixtures } from './fixtures';

const FIXTURES = path.join(__dirname, '..', 'fixtures');

test.describe('智能抠图', () => {
  test.beforeAll(async () => { await ensureFixtures(); });

  test.skip(true, '需要真实人物照片，当前fixture为测试图片无法进行AI抠图');

  test('上传图片 AI处理 下载', async ({ page }) => {
    test.setTimeout(180000);
    await page.goto('https://zqzb-online.top/bg-remover/', { waitUntil: 'domcontentloaded' });
    const fileInput = page.locator('background-remover input[type="file"]').first();
    await fileInput.setInputFiles(path.join(FIXTURES, 'person.jpg'));
    const downloadBtn = page.locator('a[download], button').filter({ hasText: /下载|Download/ }).first();
    await downloadBtn.waitFor({ state: 'visible', timeout: 120000 });
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await downloadBtn.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.(png|jpg|jpeg|webp)$/i);
  });
});
