import Link from 'next/link';
import styles from './button.module.css';

type Props = {
  /**
   * The button style.
   */
  type: 'primary' | 'secondary';

  /**
   * Navigate to this URL or path.
   */
  href: string;

  /**
   * Child components.
   */
  children: React.ReactNode;
};

/**
 * Links to a page or section of the website.
 */
export default function Button({ type, href, children }: Props) {
  return (
    <Link href={href} className={`${styles.base} ${styles[type]}`}>
      {children}
    </Link>
  );
}
