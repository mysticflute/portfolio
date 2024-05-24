import { test, expect } from '@playwright/test';

// XXX: Soundcloud response times seem to be flaky for Firefox. Should be able
// to remove this once switching to a CDN.
const timeout = 15000;

test.describe('audio tracks', () => {
  test('load successfully', async ({ page }) => {
    await page.goto('/');

    const project = page.getByTestId('tracks').first();
    const track = project.getByRole('listitem').first();
    const audio = track.locator('audio');

    await track.scrollIntoViewIfNeeded();
    await expect(audio).toHaveJSProperty('paused', true, { timeout });

    await track.getByRole('button', { name: 'Play' }).click();
    await expect(audio).toHaveJSProperty('paused', false, { timeout });

    await track.getByRole('button', { name: 'Pause' }).click();
    await expect(audio).toHaveJSProperty('paused', true, { timeout });
  });

  test('only play one at a time', async ({ page }) => {
    await page.goto('/');

    const project1 = page.getByTestId('tracks').nth(0);
    const project2 = page.getByTestId('tracks').nth(1);

    const track1 = project1.getByRole('listitem').nth(0);
    const track2 = project1.getByRole('listitem').nth(1);
    const track3 = project2.getByRole('listitem').nth(0);

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

    const project = page.getByTestId('tracks').first();

    const track1 = project.getByRole('listitem').nth(0);
    const track2 = project.getByRole('listitem').nth(1);

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
