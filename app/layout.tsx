import { Metadata, Viewport } from 'next';
import { baseWebsiteTitle } from '@/lib/constants';
import { Onest, LineRoundedIcons } from '@/lib/fonts';

import 'normalize.css/normalize.css';
import '@/styles/globals.css';
import '@/styles/utilities.css';

export const metadata: Metadata = {
  title: {
    default: baseWebsiteTitle,
    template: `%s - ${baseWebsiteTitle}`,
  },

  description:
    'Nathan David McWilliams is a music composer, pianist and flutist for video games and interactive media based in Atlanta, GA.',

  openGraph: {
    type: 'website',
    url: 'https://portfolio-git-metadata2-mysticflute.vercel.app',
    title: 'Nathan David McWilliams, Composer',
    description:
      'Nathan is a composer in Atlanta, GA, crafting memorable melodies and themes for games and interactive media. Listen to selected demo tracks and published works.',
    images: [
      {
        url: 'https://portfolio-git-metadata2-mysticflute.vercel.app/images/profile/profile-og-image.png?2',
        alt: 'Character portrait of Nathan David McWilliams',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@mysticflute',
    title: 'Nathan David McWilliams, Composer',
    description:
      'Nathan is a composer in Atlanta, GA, crafting memorable melodies and themes for games and interactive media. Listen to selected demo tracks and published works.',
  },

  // for info about favicons, see these articles:
  // https://medium.com/web-dev-survey-from-kyoto/favicon-nightmare-how-to-maintain-sanity-7628bfc39918
  // https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4331f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Onest.variable} ${LineRoundedIcons.variable}`}>
        {children}
      </body>
    </html>
  );
}
