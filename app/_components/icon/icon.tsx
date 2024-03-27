import { clsx } from 'clsx';
import styles from './icon.module.css';

export type Props = {
  /**
   * Name of the icon to use.
   */
  name: 'mail' | 'briefcase' | 'arrowDiagonal' | 'arrowRight';

  /**
   * Set to true when there's text to the right of the icon.
   */
  hasTextAfter?: boolean;

  /**
   * Set to true when there's text to the left of the icon.
   */
  hasTextBefore?: boolean;

  /** CSS class name for the top element. */
  className?: string;
};

/**
 * Displays an icon from an icon font.
 */
export default function Icon({
  name,
  hasTextAfter = false,
  hasTextBefore = false,
  className = '',
}: Props) {
  return (
    <span
      className={clsx(
        styles.lineRounded,
        styles[name],
        hasTextAfter && styles.hasTextAfter,
        hasTextBefore && styles.hasTextBefore,
        className,
      )}
      data-testid="icon"
    ></span>
  );
}
