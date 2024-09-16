import { clsx } from 'clsx';
import Icon from '@/components/icon/icon';
import styles from './carousel.module.css';

export type Props = {
  /**
   * The carousel slides.
   */
  items: {
    id: string;
    component: React.ReactNode;
  }[];

  /**
   * The aria-label for the carousel.
   */
  label: string;

  /**
   * CSS class name for the top element.
   */
  className?: string;
};

/**
 * Displays a slideshow that cycles through content with toggle controls.
 */
export default function Carousel({ items, label, className }: Props) {
  return (
    <div
      className={clsx(styles.carousel, className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={styles.inner}>
        <div className={styles.items}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={styles.item}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
            >
              {item.component}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        className={clsx(styles.control, styles.previous, 'flexCenter')}
      >
        <Icon name="arrowLeft" decorative />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        className={clsx(styles.control, styles.next, 'flexCenter')}
      >
        <Icon name="arrowRight" decorative />
      </button>
    </div>
  );
}
