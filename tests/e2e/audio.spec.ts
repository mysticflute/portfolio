import { test, expect } from '@playwright/test';

// XXX: soundcloud response times seem to be flaky. should be able to remove
// this once switching to a CDN.
const timeout = 15000;

test.describe('audio tracks', () => {
  test('load successfully', async ({ page }) => {
    await page.goto('/');

    const track = await page.getByTestId('audio-track').first();
    await track.scrollIntoViewIfNeeded();

    const audio = await track.locator('audio');

    await expect(audio).toHaveJSProperty('paused', true, { timeout });

    await await track.getByRole('button', { name: 'Play' }).click();
    await expect(audio).toHaveJSProperty('paused', false, { timeout });

    await await track.getByRole('button', { name: 'Pause' }).click();
    await expect(audio).toHaveJSProperty('paused', true, { timeout });
  });

  test('only play one at a time', async ({ page }) => {
    await page.goto('/');

    const track1 = await page.getByTestId('audio-track').nth(0);
    const track2 = await page.getByTestId('audio-track').nth(1);
    const track3 = await page.getByTestId('audio-track').last();

    const audio1 = await track1.locator('audio');
    const audio2 = await track2.locator('audio');
    const audio3 = await track3.locator('audio');

    await track1.scrollIntoViewIfNeeded();
    await track1.getByRole('button', { name: 'Play' }).click();
    await expect(audio1).toHaveJSProperty('paused', false, { timeout });

    await track2.scrollIntoViewIfNeeded();
    await track2.getByRole('button', { name: 'Play' }).click();
    await expect(audio1).toHaveJSProperty('paused', true, { timeout });
    await expect(audio2).toHaveJSProperty('paused', false, { timeout });

    await track3.scrollIntoViewIfNeeded();
    await track3.getByRole('button', { name: 'Play' }).click();
    await expect(audio2).toHaveJSProperty('paused', true, { timeout });
    await expect(audio3).toHaveJSProperty('paused', false, { timeout });
  });

  test('auto play the next track in the list', async ({ page }) => {
    await page.goto('/');

    const track1 = await page.getByTestId('audio-track').nth(0);
    const track2 = await page.getByTestId('audio-track').nth(1);

    const audio1 = await track1.locator('audio');
    const audio2 = await track2.locator('audio');

    await track1.scrollIntoViewIfNeeded();
    await track1.getByRole('button', { name: 'Play' }).click();
    await audio1.evaluate(
      (el: HTMLAudioElement) => (el.currentTime = el.duration),
    );

    track2.scrollIntoViewIfNeeded();
    await expect(audio2).toHaveJSProperty('paused', false, { timeout });
  });
});
