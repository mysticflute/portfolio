import { type CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './featured.module.css';

interface CustomProperties extends CSSProperties {
  '--animation-scroll-duration': string;
}

type Props = {
  /**
   * The list of items being featured.
   */
  items: string[];

  /**
   * The total number of times to render the list of items, including
   * repetitions. Must be at least 1.
   *
   * Repeating the list of items is usually necessary when `animated` is true,
   * depending on the number and length of the items. This ensures a continous
   * scroll of items, even if the list is not long enough to completely fill the
   * screen at the widest expected viewport width.
   */
  count?: number;

  /**
   * Whether to scroll the list of items, repeated infinitely.
   * */
  animated?: boolean;

  /**
   * The number of seconds it should take to scroll through a single list of the
   * given items.
   */
  duration?: number;
};

/**
 * A full-page strip of featured text items.
 */
export default function Featured({
  items,
  count = 1,
  animated = true,
  duration = 60,
}: Props) {
  if (count < 1) {
    throw new Error(`count must be >= 1, but received ${count}`);
  }

  let inlineStyle: CustomProperties | undefined;
  if (animated) {
    inlineStyle = { '--animation-scroll-duration': `${duration}s` };
  }

  return (
    <section className={styles.container} style={inlineStyle}>
      <div className={styles.strip}>
        {[...Array(count)].map((_, i) => (
          <ul
            key={i}
            className={clsx(styles.list, animated && styles.animated)}
            aria-hidden={i > 0 ? true : undefined}
          >
            {items.map(item => (
              <li key={item} className="textHeadingXSmall">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
