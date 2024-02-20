import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';
import styles from './layout.module.css';

/**
 * This component should be folded into the root layout.tsx file, however as of
 * Next.js 14.1.0 there's an issue where the use of client components causes
 * global and component styles to be ordered in an apparent random manor. This
 * could lead to subtle CSS cascade issues, particularly in production.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
