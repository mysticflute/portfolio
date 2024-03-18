import Image, { ImageProps, StaticImageData } from 'next/image';
import styles from './colorSchemeImageV1.module.css';

// This is the first version of the component, before `getImageProps` was
// available from `next/image`. This version supports the `placeholder` prop,
// so I'm keeping it around until I'm sure it's not necessary.

// Taken from the nextjs docs:
// https://nextjs.org/docs/pages/api-reference/components/image
//
// It resuts in two images elements on the page, but only the relevant is loaded
// by the browser. It seems Next.js is working on improvements here that would
// allow using the <picture> and <source> elements which is more ideal.

type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  /**
   * The image source for light mode.
   */
  srcLight: StaticImageData;
  /**
   * The image source for dark mode.
   */
  srcDark: StaticImageData;
  /**
   * Passthrough of the img fetchPriority.
   */
  fetchPriority?: 'high' | 'low' | 'auto';
};

/**
 * An image that has two different sources for light and dark modes.
 */
export default function ColorSchemeImage(props: Props) {
  const { srcLight, srcDark, ...rest } = props;

  return (
    // the alt prop is required by the type, even though
    // eslint doesn't detect it:
    /* eslint-disable jsx-a11y/alt-text */
    <>
      <Image src={srcLight} {...rest} className={styles.light} />
      <Image src={srcDark} {...rest} className={styles.dark} />
    </>
  );
}
