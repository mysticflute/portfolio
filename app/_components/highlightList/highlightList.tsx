import { clsx } from 'clsx';
import styles from './highlightList.module.css';

type Props = {
  /**
   * CSS class name for the top element.
   */
  className?: string;

  /**
   * Child `<li>` components.
   */
  children: React.ReactNode;
};

/**
 * Displays an unordered list of items with accent color bullet points.
 */
export default function HighlightList({ className, children }: Props) {
  return <ul className={clsx(styles.list, className)}>{children}</ul>;
}
