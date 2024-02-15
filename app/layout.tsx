import { Metadata } from 'next';
import { baseWebsiteTitle } from '@/lib/constants';
import { Onest, LineRoundedIcons } from '@/lib/fonts';

import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';

import 'normalize.css/normalize.css';
import '@/styles/globals.css';
import '@/styles/common.css';

import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    template: `%s - ${baseWebsiteTitle}`,
    default: baseWebsiteTitle,
  },
  description:
    'Nathan David McWilliams is a music composer, pianist and flutist for video games and interactive media based in Atlanta, GA.',
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
