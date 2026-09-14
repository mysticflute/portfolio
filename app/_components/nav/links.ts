import type { Route } from 'next';

/** A link to a page. */
export type Link = {
  /** A unique identifier. */
  readonly key: string;

  /** The display label. */
  readonly label: string;
};

/** An internal link. */
export type InternalLink<T extends string = string> = Link & {
  /** The URL path (excluding the domain). */
  readonly path: T;
};

/** A link to a social media or external profile page. */
export type ExternalLink = Link & {
  /** The full external URL. */
  readonly url: string;
};

const kitBase = 'https://nathan-david-mcwilliams.ck.page';

/** Main internal pages. */
export const mainNavigation: readonly InternalLink<Route>[] = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'portfolio', label: 'Portfolio', path: '/#portfolio' },
  { key: 'contact', label: 'Contact', path: '/contact' },
  // TODO: host from my own domain
  { key: 'free', label: 'Free Pack', path: `${kitBase}/free-music-pack` },
];

/** The Twitter social media account. */
export const twitter: ExternalLink = {
  key: 'twitter',
  label: 'Twitter',
  url: 'https://twitter.com/mysticflute',
};

/** The Instagram social media account. */
export const instagram: ExternalLink = {
  key: 'instagram',
  label: 'Instagram',
  url: 'https://www.instagram.com/mysticflute/',
};

/** The Threads social media account. */
export const threads: ExternalLink = {
  key: 'threads',
  label: 'Threads',
  url: 'https://www.threads.net/@mysticflute',
};

/** The Bluesky social media account. */
export const bluesky: ExternalLink = {
  key: 'bluesky',
  label: 'Bluesky',
  url: 'https://bsky.app/profile/mysticflute.bsky.social',
};

/** The YouTube channel. */
export const youtube: ExternalLink = {
  key: 'youtube',
  label: 'YouTube',
  url: 'https://www.youtube.com/@nathandavidmcwilliams',
};

/** The SoundCloud profile page. */
export const soundcloud: ExternalLink = {
  key: 'soundcloud',
  label: 'SoundCloud',
  url: 'https://soundcloud.com/nathan_david_mcwilliams',
};

/** The LinkTree profile page. */
export const linktree: ExternalLink = {
  key: 'linktree',
  label: 'Linktree',
  url: 'https://linktr.ee/nathanmcwilliams',
};

/** The Itch.io profile page. */
export const itch: ExternalLink = {
  key: 'itch',
  label: 'Itch.io',
  url: 'https://mysticflute.itch.io/',
};

/** The Mastodon social media account. */
export const mastodon: ExternalLink = {
  key: 'mastodon',
  label: 'Mastodon',
  url: 'https://mastodon.gamedev.place/@mysticflute',
};

/** Ordered list of all social media accounts. */
export const allSocialLinks: readonly ExternalLink[] = [
  soundcloud,
  youtube,
  itch,
  twitter,
  instagram,
  threads,
  bluesky,
  linktree,
];
