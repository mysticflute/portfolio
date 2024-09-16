import { clsx } from 'clsx';
import styles from './icon.module.css';

type BaseProps = {
  /**
   * Name of the icon to use.
   */
  name:
    | 'mail'
    | 'briefcase'
    | 'person'
    | 'arrowDiagonal'
    | 'arrowLeft'
    | 'arrowRight'
    | 'success'
    | 'error';

  /**
   * Whether there's text to the left of the icon.
   */
  hasTextBefore?: boolean;

  /**
   * Whether there's text to the right of the icon.
   */
  hasTextAfter?: boolean;

  /**
   * CSS class name for the top element.
   */
  className?: string;
};

type PropsForDecorative = BaseProps & {
  /**
   * Whether the icon is used for decorative purposes only.
   */
  decorative: true;

  /**
   * The aria label for describing as an image.
   */
  label?: never;
};

type PropsForLabeled = BaseProps & {
  /**
   * Whether the icon is used for decorative purposes only.
   */
  decorative?: false;

  /**
   * The aria label for describing as an image.
   */
  label: string;
};

export type Props = PropsForDecorative | PropsForLabeled;

/**
 * Displays an icon from an icon font.
 */
export default function Icon({
  name,
  label,
  decorative,
  hasTextAfter,
  hasTextBefore,
  className,
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
      role="img"
      aria-label={label}
      aria-hidden={decorative}
    ></span>
  );
}
