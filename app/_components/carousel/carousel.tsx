import { clsx } from 'clsx';
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
   * CSS class name for the top element.
   */
  className?: string;
};

/**
 * Displays a slideshow that cycles through content with toggle controls.
 */
export default function Carousel({ items, className }: Props) {
  return (
    <div className={clsx(styles.carousel, className)}>
      <div className={styles.inner}>
        {items.map(item => (
          <div key={item.id} className={styles.item}>
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
}
