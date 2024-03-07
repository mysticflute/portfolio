import { test, expect } from '@playwright/test';

test.describe('contact page', () => {
  test('has main heading', async ({ page }) => {
    await page.goto('/contact');

    await expect(
      page.getByRole('heading', { level: 1, name: 'contact me' }),
    ).toBeVisible();
  });

  test('shows email address', async ({ page }) => {
    await page.goto('/contact');

    await expect(
      page
        .getByRole('main')
        .getByRole('link', { name: /n[a-zA-Z]+n@n[a-zA-Z]+.studio/i }),
    ).toBeVisible();
  });
});
