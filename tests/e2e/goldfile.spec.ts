import { test, expect } from '@playwright/test';

test.describe('TMP test', () => {
  test('matches screenshot', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
