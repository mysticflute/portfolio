import { clsx } from 'clsx';
import styles from './icon.module.css';

type Props = {
  /**
   * Name of the icon to use.
   */
  name: string;

  /**
   * Set to true when there's text to the right of the icon.
   */
  hasTextAfter?: boolean;
};

/**
 * Displays an icon from an icon font.
 */
export default function Icon({ name, hasTextAfter = false }: Props) {
  return (
    <span
      className={clsx(
        styles.lineRounded,
        styles[name],
        hasTextAfter && styles.hasTextAfter
      )}
    ></span>
  );
}
