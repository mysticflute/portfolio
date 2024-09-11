import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('get in touch link navigates to contact page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'get in touch' }).first().click();

    await expect(page).toHaveURL('/contact');
  });

  test('view portfolio link navigates to portfolio', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'view portfolio' }).click();

    await expect(page).toHaveURL('/#portfolio');
  });
});
