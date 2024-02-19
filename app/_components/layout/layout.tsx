import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';
import styles from './layout.module.css';

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
