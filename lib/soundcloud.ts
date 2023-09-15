const baseSoundCloudURL = 'https://w.soundcloud.com/player/';

/**
 * Params for building a SoundCloud URL.
 */
export type SoundCloudParams = {
  /**
   * Use a black background with white text (default false).
   */
  inverse?: boolean;

  /**
   * Autoplay the track after loading (default false).
   */
  auto_play?: boolean;

  /**
   * Show the username in the track title (default false).
   */
  show_user?: boolean;

  /**
   * Use this color (in css hex format) for the play button.
   */
  color?: string;
};

/**
 * Gets the URL to load a SoundCloud track.
 *
 * @param id The 10-digit SoundCloud track ID.
 * @param params Additional SoundCloud parameters.
 * @returns The URL.
 */
export function getUrlForTrack(id: number, params: SoundCloudParams) {
  const allParams: SoundCloudParams = {
    inverse: false,
    auto_play: false,
    show_user: false,
    color: '#ff5500',
    ...params,
  };

  let url = `${baseSoundCloudURL}/?url=https%3A//api.soundcloud.com/tracks/${id}`;

  url += Object.keys(allParams).reduce((accumulator, key) => {
    const value = allParams[key as keyof SoundCloudParams];
    if (value === undefined || value == null) {
      return accumulator;
    }
    return accumulator + `&${key}=${encodeURIComponent(value)}`;
  }, '');

  return url;
}
