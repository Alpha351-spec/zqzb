import { test, expect } from '@playwright/test';
import { TOOL_PAGES, ensureFixtures } from './fixtures';

ensureFixtures();

const allPages = [
  ...TOOL_PAGES.pages,
  ...TOOL_PAGES.image,
  ...TOOL_PAGES.text,
  ...TOOL_PAGES.encode,
  ...TOOL_PAGES.generate,
  ...TOOL_PAGES.pdf,
];

test.describe('页面加载与导航测试', () => {
  test('所有工具页面可正常加载', async ({ page }) => {
    for (const toolPage of allPages) {
      const response = await page.goto(toolPage.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      expect(title).not.toBe('');
    }
  });

  test('首页包含所有分类标签', async ({ page }) => {
    await page.goto('/');
    const categoryTabs = page.locator('button.category-tab');
    await expect(categoryTabs).toHaveCount(5);
    await expect(categoryTabs.filter({ hasText: '图片处理' })).toBeVisible();
    await expect(categoryTabs.filter({ hasText: '文本处理' })).toBeVisible();
    await expect(categoryTabs.filter({ hasText: '编码转换' })).toBeVisible();
    await expect(categoryTabs.filter({ hasText: '生成工具' })).toBeVisible();
    await expect(categoryTabs.filter({ hasText: '文档处理' })).toBeVisible();
  });

  test('首页工具卡片可点击跳转', async ({ page }) => {
    await page.goto('/');
    const firstToolCard = page.locator('a.tool-card-link').first();
    await expect(firstToolCard).toBeVisible();
    const href = await firstToolCard.getAttribute('href');
    expect(href).toBeTruthy();
    await firstToolCard.click();
    await page.waitForURL(`**/${href}`);
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain(href!);
  });

  test('所有页面包含noscript标签', async ({ page }) => {
    const samplePages = [
      allPages[0],
      allPages[4],
      allPages[10],
      allPages[20],
      allPages[allPages.length - 1],
    ];
    for (const toolPage of samplePages) {
      await page.goto(toolPage.path, { waitUntil: 'domcontentloaded' });
      const noscript = page.locator('noscript');
      await expect(noscript).toHaveCount(1);
    }
  });

  test('所有页面包含footer链接', async ({ page }) => {
    const samplePages = [
      allPages[0],
      allPages[4],
      allPages[10],
      allPages[20],
      allPages[allPages.length - 1],
    ];
    for (const toolPage of samplePages) {
      await page.goto(toolPage.path, { waitUntil: 'domcontentloaded' });
      const footer = page.locator('footer').first();
      await expect(footer).toBeVisible();
    }
  });

  test('所有页面包含AdSense脚本', async ({ page }) => {
    const samplePages = [
      allPages[0],
      allPages[4],
      allPages[10],
      allPages[20],
      allPages[allPages.length - 1],
    ];
    for (const toolPage of samplePages) {
      await page.goto(toolPage.path, { waitUntil: 'domcontentloaded' });
      const adsenseScript = page.locator('script[src*="adsbygoogle"]');
      await expect(adsenseScript).toHaveCount(1);
    }
  });

  test('返回工具箱链接正常工作', async ({ page }) => {
    await page.goto('/image-compress/', { waitUntil: 'domcontentloaded' });
    const backLink = page.locator('.nav-bar a').first();
    await expect(backLink).toBeVisible();
    const text = await backLink.textContent();
    expect(text).toContain('返回');
    await backLink.click();
    await page.waitForURL('**/');
    expect(page.url()).toMatch(/\/$/);
  });

  test('guide.html包含所有工具说明', async ({ page }) => {
    await page.goto('/guide.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=图片处理')).toBeVisible();
    await expect(page.locator('text=文本处理')).toBeVisible();
    await expect(page.locator('text=编码转换')).toBeVisible();
    await expect(page.locator('text=生成工具')).toBeVisible();
    await expect(page.locator('text=文档处理')).toBeVisible();
  });

  test('about.html包含联系方式', async ({ page }) => {
    await page.goto('/about.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=zqzb.tools@outlook.com')).toBeVisible();
  });

  test('privacy.html包含隐私声明', async ({ page }) => {
    await page.goto('/privacy.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=数据处理方式')).toBeVisible();
    await expect(page.locator('text=信息收集')).toBeVisible();
    await expect(page.locator('text=隐私政策更新')).toBeVisible();
  });
});
