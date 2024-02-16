import { Metadata } from 'next';
import { baseWebsiteTitle } from '@/lib/constants';
import { Onest, LineRoundedIcons } from '@/lib/fonts';

import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';

import 'normalize.css/normalize.css';
import '@/styles/globals.css';
import '@/styles/common.css';

import styles from './layout.module.css';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4331f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: baseWebsiteTitle,
    template: `%s - ${baseWebsiteTitle}`,
  },
  description:
    'Nathan David McWilliams is a music composer, pianist and flutist for video games and interactive media based in Atlanta, GA.',
  manifest: '/site.webmanifest',

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Onest.variable} ${LineRoundedIcons.variable}`}>
        <div className={styles.page}>
          {/* <a href="#main-content">Skip to main content</a> */}
          <header role="banner">
            <Nav></Nav>
          </header>
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
