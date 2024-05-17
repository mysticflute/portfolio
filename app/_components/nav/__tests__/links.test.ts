import { describe, it, expect } from '@jest/globals';
import { mainNavigation, allSocialLinks } from '../links';

const SITE_LINK = /^\/.*/;
const SECURE_LINK = /^https:\/\/.+/;

describe('links', () => {
  describe('main navigation links', () => {
    it('have unique keys', () => {
      const actualKeys = mainNavigation.map(i => i.key);
      const uniqueKeys = Array.from(new Set(actualKeys));

      expect(uniqueKeys).toEqual(actualKeys);
    });

    it.each(mainNavigation)(
      '$label should be a valid link beginning with "/"',
      link => {
        expect(link.path).toMatch(SITE_LINK);
      },
    );
  });

  describe('social media links', () => {
    it('have unique keys', () => {
      const actualKeys = allSocialLinks.map(i => i.key);
      const uniqueKeys = Array.from(new Set(actualKeys));

      expect(uniqueKeys).toEqual(actualKeys);
    });

    it.each(allSocialLinks)(
      '$label should be a valid link beginning with https',
      link => {
        expect(link.url).toMatch(SECURE_LINK);
      },
    );
  });
});
