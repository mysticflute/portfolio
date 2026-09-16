import { clsx } from 'clsx';
import type { Route } from 'next';
import Link from 'next/link';
import styles from './button.module.css';

export type Props<T extends string> = {
  /**
   * The button style.
   */
  type: 'primary' | 'secondary';

  /**
   * Navigate to this URL or path.
   */
  href: Route<T> | URL;

  /**
   * Whether the button is displayed on a dark background.
   */
  inverse?: boolean;

  /**
   * CSS class name for the top element.
   */
  className?: string;

  /**
   * Child components.
   */
  children: React.ReactNode;
};

/**
 * Links to a page or section of the website.
 */
export default function Button<T extends string>({
  type,
  href,
  inverse,
  className,
  children,
}: Props<T>) {
  return (
    <Link
      href={href}
      className={clsx(
        styles.base,
        styles[type],
        inverse && styles.inverse,
        className,
      )}
    >
      {children}
    </Link>
  );
}
