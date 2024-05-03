import { type Metadata, type Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@/components/googleAnalytics/googleAnalytics';
import { Onest, LineRoundedIcons } from '@/lib/fonts';
import {
  baseWebsiteTitle,
  websiteDescription,
  socialCardTitle,
  socialCardDescription,
} from '@/lib/constants';

import 'normalize.css/normalize.css';
import '@/styles/globals.css';
import '@/styles/utilities.css';

export const metadata: Metadata = {
  title: {
    default: baseWebsiteTitle,
    template: `%s - ${baseWebsiteTitle}`,
  },

  description: websiteDescription,

  openGraph: {
    type: 'website',
    url: 'https://www.ndm.studio',
    title: socialCardTitle,
    description: socialCardDescription,
    images: [
      {
        url: 'https://www.ndm.studio/images/profile/profile-og-image.png',
        alt: 'Character portrait of Nathan David McWilliams',
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
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

        <Analytics />
        <SpeedInsights />

        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID} />
        )}
      </body>
    </html>
  );
}
