import { test, expect } from '@playwright/test';

// This checks for the presence of essential meta tags.

test.describe('metadata tags', () => {
  test('has description', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /nathan david mcwilliams/i,
    );
  });
});
