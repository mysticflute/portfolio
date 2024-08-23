/** A link to a page. */
export type Link = {
  /** A unique identifier. */
  readonly key: string;

  /** The display label. */
  readonly label: string;
};

/** An internal link. */
export type InternalLink = Link & {
  /** The URL path (excluding the domain). */
  readonly path: string;
};

/** A link to a social media or external profile page. */
export type SocialLink = Link & {
  /** The full external URL. */
  readonly url: string;
};

/** Main internal pages. */
export const mainNavigation: readonly InternalLink[] = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'portfolio', label: 'Portfolio', path: '/#portfolio' },
  { key: 'contact', label: 'Contact', path: '/contact' },
  { key: 'contact', label: 'Free Pack', path: '/contact' },
];

/** The Twitter social media account. */
export const twitter: SocialLink = {
  key: 'twitter',
  label: 'Twitter',
  url: 'https://twitter.com/mysticflute',
};

/** The Instagram social media account. */
export const instagram: SocialLink = {
  key: 'instagram',
  label: 'Instagram',
  url: 'https://www.instagram.com/mysticflute/',
};

/** The Threads social media account. */
export const threads: SocialLink = {
  key: 'threads',
  label: 'Threads',
  url: 'https://www.threads.net/@mysticflute',
};

/** The Bluesky social media account. */
export const bluesky: SocialLink = {
  key: 'bluesky',
  label: 'Bluesky',
  url: 'https://bsky.app/profile/mysticflute.bsky.social',
};

/** The YouTube channel. */
export const youtube: SocialLink = {
  key: 'youtube',
  label: 'YouTube',
  url: 'https://www.youtube.com/@nathandavidmcwilliams',
};

/** The SoundCloud profile page. */
export const soundcloud: SocialLink = {
  key: 'soundcloud',
  label: 'SoundCloud',
  url: 'https://soundcloud.com/nathan_david_mcwilliams',
};

/** The LinkTree profile page. */
export const linktree: SocialLink = {
  key: 'linktree',
  label: 'Linktree',
  url: 'https://linktr.ee/nathanmcwilliams',
};

/** The Itch.io profile page. */
export const itch: SocialLink = {
  key: 'itch',
  label: 'Itch.io',
  url: 'https://mysticflute.itch.io/',
};

/** The Mastodon social media account. */
export const mastodon: SocialLink = {
  key: 'mastodon',
  label: 'Mastodon',
  url: 'https://mastodon.gamedev.place/@mysticflute',
};

/** Ordered list of all social media accounts. */
export const allSocialLinks: readonly SocialLink[] = [
  soundcloud,
  youtube,
  itch,
  twitter,
  instagram,
  threads,
  bluesky,
  linktree,
];
