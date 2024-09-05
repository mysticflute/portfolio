import { test, expect } from '@playwright/test';

test.describe('about page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/about');

    await expect(page).toHaveTitle(/about/i);
  });

  test('has main heading', async ({ page }) => {
    await page.goto('/about');

    await expect(
      page.getByRole('heading', { level: 1, name: 'hey there' }),
    ).toBeVisible();
  });

  test('my story link brings heading into viewport', async ({ page }) => {
    await page.goto('/about');

    const link = page.getByRole('link', { name: 'my story' });

    await link.click();

    await expect(
      page.getByRole('heading', { name: 'my story as a composer' }),
    ).toBeInViewport();
  });
});
