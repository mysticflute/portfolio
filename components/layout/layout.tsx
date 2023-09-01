import Head from 'next/head';
import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <Head>
        <meta charSet="utf-8" />
        <meta
          key="desc"
          name="description"
          content="Nathan David McWilliams is a music composer, pianist and flutist for video games and interactive media based in Atlanta, GA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content="#0b0b0b" />

        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {/* <a href="#main-content">Skip to main content</a> */}
      <header role="banner">
        <Nav></Nav>
      </header>
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
}
