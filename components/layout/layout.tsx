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

        <meta name="theme-color" content="#1c92ff" />
        {/* <meta name="theme-color" content="#0b0b0b" /> */}

        <link rel="icon" href="/favicon-tmp.svg" type="image/svg+xml" />
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
