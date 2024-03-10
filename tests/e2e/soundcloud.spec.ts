import { test, expect } from '@playwright/test';

// Minimal checks for the soundcloud iframes.

test.describe('soundcloud iframes', () => {
  test('load successfully', async ({ page }) => {
    await page.goto('/');

    const frame = page.frameLocator('iframe[src*="soundcloud"]').first();

    // the play button's current html looks like this:
    // <button class="playButton small" role="application" title="Play"...>
    await expect(frame.getByRole('application', { name: 'Play' })).toBeVisible({
      timeout: 30000,
    });
  });
});
