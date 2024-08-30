import { clsx } from 'clsx';
import Box from '@/components/box/box';
import styles from './imageBox.module.css';

type Props = {
  /**
   * The text for the heading.
   */
  heading: string;

  /**
   * The image element.
   */
  image: React.ReactNode;

  /**
   * Whether the image displays on top or the the left of the content.
   *
   * @defaultValue horizontal.
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The level of the heading tag.
   *
   * @defaultValue 3.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

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
 * Displays a box with a single image, heading and related content.
 */
export default function HighlightList({
  heading,
  image,
  orientation = 'horizontal',
  headingLevel = 3,
  className,
  children,
}: Props) {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${headingLevel}`;

  return (
    <Box
      type="flat"
      className={clsx(
        styles.box,
        orientation && styles[orientation],
        className,
      )}
    >
      <div className={styles.image}>{image}</div>
      <div className={styles.content}>
        <HeadingTag
          className={
            orientation === 'horizontal'
              ? 'textHeadingXXSmall'
              : 'textHeadingXSmall'
          }
        >
          {heading}
        </HeadingTag>
        {children}
      </div>
    </Box>
  );
}
