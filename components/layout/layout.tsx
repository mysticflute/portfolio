import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';

import Nav from '../nav/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <Head>
        {/* <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="TODO"
        /> */}
      </Head>
      {/* <a href="#main-content">Skip to main content</a> */}
      <header role="banner">
        <Nav></Nav>
      </header>
      <main id="main-content" role="main">
        {children}
      </main>
      <footer role="contentinfo"></footer>
    </div>
  );
}
