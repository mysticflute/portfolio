import { getImageProps, ImageProps, StaticImageData } from 'next/image';

// Reference:
// https://nextjs.org/docs/app/api-reference/components/image#getimageprops

/**
 * Properties for the ColorSchemeImage component.
 *
 * According to the NextJS docs, the `placeholder` property cannot be used
 * along with `getImageProps`, because it would not be removed when the image
 * loads. So it's removed here as a param option.
 */
type Props = Omit<ImageProps, 'src' | 'placeholder'> & {
  /**
   * The image source for dark mode.
   */
  srcDark: StaticImageData;

  /**
   * The image source for light mode.
   */
  srcLight: StaticImageData;
};

/**
 * An image that has two different sources for light and dark modes.
 */
export default function ColorSchemeImage(props: Props) {
  const { srcDark, srcLight, ...rest } = props;

  const { props: darkSrc } = getImageProps({ ...rest, src: srcDark });
  const { props: lightSrc } = getImageProps({ ...rest, src: srcLight });

  return (
    <picture>
      <source
        media="(prefers-color-scheme: dark)"
        srcSet={darkSrc.srcSet}
        sizes={darkSrc.sizes}
      />
      {/* for some reason the alt property is not on the typedef */}
      <img {...lightSrc} alt={props.alt} />
    </picture>
  );
}
