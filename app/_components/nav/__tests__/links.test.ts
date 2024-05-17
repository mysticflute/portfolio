import { describe, it, expect } from '@jest/globals';
import { allSocialLinks } from '../links';

const SECURE_LINK = /^https:\/\/.+/;

describe('links', () => {
  describe('main navigation links', () => {
    // TODO: have unique keys

    // TODO: all begin with /
    it.each(allSocialLinks)(
      '$label should have a valid link beginning with https',
      link => {
        expect(link.url).toMatch(SECURE_LINK);
      },
    );
  });

  describe('social media links', () => {
    // TODO: have unique keys

    it.each(allSocialLinks)(
      '$label should have a valid link beginning with https',
      link => {
        expect(link.url).toMatch(SECURE_LINK);
      },
    );
  });
});
