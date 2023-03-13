import Head from 'next/head';
import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta name="description" content="TODO" /> */}
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
