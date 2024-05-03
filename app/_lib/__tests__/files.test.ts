import mockfs from 'mock-fs';
import { describe, it, expect, afterEach } from '@jest/globals';
import { exists } from '../files';

describe('file utils', () => {
  afterEach(() => {
    mockfs.restore();
  });

  describe('exists', () => {
    it('returns false when null', async () => {
      expect(await exists(null)).toBe(false);
    });

    it('returns false when undefined', async () => {
      expect(await exists(undefined)).toBe(false);
    });

    it('returns false when it does not exist', async () => {
      mockfs({ 'foo/file.txt': '' });

      expect(await exists('bar/file.txt')).toBe(false);
    });

    it('returns true when it does exist', async () => {
      mockfs({ 'foo/file.txt': '' });

      expect(await exists('foo/file.txt')).toBe(true);
    });
  });
});
