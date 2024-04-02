import { test, expect } from '@playwright/test';

test.describe('404 page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/notfound');

    await expect(page).toHaveTitle(/page not found/i);
  });

  test('has main heading', async ({ page }) => {
    await page.goto('/notfound');

    await expect(
      page.getByRole('heading', { level: 1, name: 'page not found' }),
    ).toBeVisible();
  });

  test('shows a link to the homepage', async ({ page }) => {
    await page.goto('/notfound');

    await expect(
      page.getByRole('main').getByRole('link', { name: 'Go to homepage' }),
    ).toBeVisible();
  });
});
