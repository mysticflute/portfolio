import { MediaContextProvider } from '@/components/mediaContext/mediaContext';
import { mainNavigation } from '@/components/nav/links';
import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';
import styles from './layout.module.css';

// XXX: This component should be folded into the root layout.tsx file, however
// as of Next.js 14.1.0 there's an issue where the use of client components
// causes global and component styles to be ordered in an apparent random manor.
// This could lead to subtle CSS cascade issues, particularly in production.
//
// see:
// https://github.com/vercel/next.js/issues/51030
// https://github.com/vercel/next.js/issues/44977
// https://github.com/vercel/next.js/issues/48120
// https://github.com/vercel/next.js/issues/51213

/**
 * The main page layout, including the navigation, body and footer.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      {/* <a href="#main-content">Skip to main content</a> */}
      <header>
        <Nav links={mainNavigation}></Nav>
      </header>
      <main id="main-content">
        <MediaContextProvider>{children}</MediaContextProvider>
      </main>
      <Footer></Footer>
    </div>
  );
}
