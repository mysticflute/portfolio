import { describe, it, expect } from '@jest/globals';
import { allSocialLinks } from '../social';

const VALID_LINK = /^https:\/\/.+/;

describe('social media links', () => {
  it.each(allSocialLinks)(
    '$label should have a valid link beginning with https',
    link => {
      expect(link.url).toMatch(VALID_LINK);
    },
  );
});
