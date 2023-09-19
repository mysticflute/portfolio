/** Data for a social media or external profile page. */
export interface SocialLink {
  /** A unique identifier for this profile. */
  key: string;

  /** The label for this profile. */
  label: string;

  /** The URL for this profile. */
  url: string;
}

/** The Twitter social media account. */
export const twitter: Readonly<SocialLink> = {
  key: 'twitter',
  label: 'Twitter',
  url: 'https://twitter.com/mysticflute',
};

/** The Instagram social media account. */
export const instagram: Readonly<SocialLink> = {
  key: 'instagram',
  label: 'Instagram',
  url: 'https://www.instagram.com/mysticflute/',
};

/** The Threads social media account. */
export const threads: Readonly<SocialLink> = {
  key: 'threads',
  label: 'Threads',
  url: 'https://www.threads.net/@mysticflute',
};

/** The Bluesky social media account. */
export const bluesky: Readonly<SocialLink> = {
  key: 'bluesky',
  label: 'Bluesky',
  url: 'https://bsky.app/profile/mysticflute.bsky.social',
};

/** The YouTube channel. */
export const youtube: Readonly<SocialLink> = {
  key: 'youtube',
  label: 'YouTube',
  url: 'https://www.youtube.com/@nathandavidmcwilliams',
};

/** The SoundCloud profile page. */
export const soundcloud: Readonly<SocialLink> = {
  key: 'soundcloud',
  label: 'SoundCloud',
  url: 'https://soundcloud.com/nathan_david_mcwilliams',
};

/** The LinkTree profile page. */
export const linktree: Readonly<SocialLink> = {
  key: 'linktree',
  label: 'Linktree',
  url: 'https://linktr.ee/nathanmcwilliams',
};

/** The Itch.io profile page. */
export const itch: Readonly<SocialLink> = {
  key: 'itch',
  label: 'Itch.io',
  url: 'https://mysticflute.itch.io/',
};

/** The Mastodon social media account. */
export const mastodon: Readonly<SocialLink> = {
  key: 'mastodon',
  label: 'Mastodon',
  url: 'https://mastodon.gamedev.place/@mysticflute',
};

/** Ordered list of all social media accounts. */
export const allSocialLinks: ReadonlyArray<SocialLink> = [
  twitter,
  instagram,
  threads,
  bluesky,
  linktree,
  youtube,
  soundcloud,
  itch,
  mastodon,
];
