import { test, expect } from '@playwright/test';

// This contains simple, fast smoke tests to check that the site
// is loading and showing content.

test.describe('home page', { tag: '@smoke' }, () => {
  test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/nathan david mcwilliams/i);
  });

  test('has main site heading', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Nathan' }),
    ).toBeVisible();
  });

  test('has main profile image', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('img', {
        name: 'Character portrait of Nathan David McWilliams',
      }),
    ).toBeVisible();
  });

  test('has Selected Compositions project heading', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Selected Compositions' }),
    ).toBeVisible();
  });

  test('shows copyright in the footer', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByText(`Copyright © ${new Date().getFullYear()}`),
    ).toBeVisible();
  });

  test('shows email address in the footer', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

    await expect(
      page.getByRole('link', { name: /n[a-zA-Z]+n@n[a-zA-Z]+.studio/i }),
    ).toBeVisible();
  });
});
