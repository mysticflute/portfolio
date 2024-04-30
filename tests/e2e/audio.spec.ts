import { test, expect } from '@playwright/test';

test.describe('audio tracks', () => {
  test('load successfully', async ({ page }) => {
    await page.goto('/');

    const track = await page.getByTestId('audio-track').first();
    await track.scrollIntoViewIfNeeded();

    const audio = await track.locator('audio');

    await expect(audio).toHaveJSProperty('paused', true);

    await await track.getByRole('button', { name: 'Play' }).click();
    await expect(audio).toHaveJSProperty('paused', false);

    await await track.getByRole('button', { name: 'Pause' }).click();
    await expect(audio).toHaveJSProperty('paused', true);
  });
});
