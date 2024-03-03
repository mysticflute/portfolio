import { describe, it, expect } from '@jest/globals';
import { getUrlForTrack } from '../soundcloud';

describe('soundcloud', () => {
  describe('getUrlForTrack', () => {
    it('should return the correct URL with no options specified', () => {
      expect(getUrlForTrack(1661989830)).toMatchSnapshot();
    });

    it('should return the correct URL with some options specified', () => {
      expect(
        getUrlForTrack(1661989830, {
          color: '#fffeee',
        }),
      ).toMatchSnapshot();
    });

    it('should return the correct URL with all options specified', () => {
      expect(
        getUrlForTrack(1661989830, {
          inverse: true,
          auto_play: true,
          show_user: true,
          color: '#fffeee',
        }),
      ).toMatchSnapshot();
    });
  });
});
