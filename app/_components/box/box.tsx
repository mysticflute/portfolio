import { clsx } from 'clsx';
import styles from './box.module.css';

export type Props = {
  /**
   * The box style.
   */
  type?: 'text' | 'flat' | 'hover' | 'raised';

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
 * Displays a box with content.
 */
export default function Box({ type = 'hover', className, children }: Props) {
  return (
    <div className={clsx(styles.box, styles[type], className)}>{children}</div>
  );
}
