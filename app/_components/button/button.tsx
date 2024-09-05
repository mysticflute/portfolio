import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './button.module.css';

export type Props = {
  /**
   * The button style.
   */
  type: 'primary' | 'secondary';

  /**
   * Navigate to this URL or path.
   */
  href: string;

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
export default function Button({
  type,
  href,
  inverse,
  className,
  children,
}: Props) {
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
