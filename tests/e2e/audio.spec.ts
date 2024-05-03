import { test, expect } from '@playwright/test';

// XXX: soundcloud response times seem to be flaky. should be able to remove
// this once switching to a CDN.
const timeout = 15000;

test.describe('audio tracks', () => {
  test('load successfully', async ({ page }) => {
    await page.goto('/');

    const track = page.getByTestId('audio-track').first();
    await track.scrollIntoViewIfNeeded();

    const audio = track.locator('audio');

    await expect(audio).toHaveJSProperty('paused', true, { timeout });

    await track.getByRole('button', { name: 'Play' }).click();
    await expect(audio).toHaveJSProperty('paused', false, { timeout });

    await track.getByRole('button', { name: 'Pause' }).click();
    await expect(audio).toHaveJSProperty('paused', true, { timeout });
  });

  test('only play one at a time', async ({ page }) => {
    await page.goto('/');

    const track1 = page.getByTestId('audio-track').nth(0);
    const track2 = page.getByTestId('audio-track').nth(1);
    const track3 = page.getByTestId('audio-track').last();

    const audio1 = track1.locator('audio');
    const audio2 = track2.locator('audio');
    const audio3 = track3.locator('audio');

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

    const track1 = page.getByTestId('audio-track').nth(0);
    const track2 = page.getByTestId('audio-track').nth(1);

    const audio1 = track1.locator('audio');
    const audio2 = track2.locator('audio');

    await track1.scrollIntoViewIfNeeded();
    await track1.getByRole('button', { name: 'Play' }).click();

    // wait for metadata to load
    await expect(audio1).toHaveJSProperty('readyState', 4, { timeout });

    // move to the end of the track
    await audio1.evaluate(
      (el: HTMLAudioElement) => (el.currentTime = el.duration),
    );

    await track2.scrollIntoViewIfNeeded();
    await expect(audio2).toHaveJSProperty('paused', false, { timeout });
  });
});
