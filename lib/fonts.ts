import localFont from 'next/font/local';

/**
 * The Onest font from https://onest.md/en.
 */
export const Onest = localFont({
  src: [
    // {
    //   path: '../assets/fonts/OnestThin1602-hint.woff',
    //   weight: '100',
    //   style: 'normal',
    // },
    // {
    //   path: '../assets/fonts/OnestLight1602-hint.woff',
    //   weight: '300',
    //   style: 'normal',
    // },
    {
      path: '../assets/fonts/OnestRegular1602-hint.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/OnestMedium1602-hint.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/OnestBold1602-hint.woff',
      weight: '700',
      style: 'normal',
    },
    // {
    //   path: '../assets/fonts/OnestExtraBold1602-hint.woff',
    //   weight: '800',
    //   style: 'normal',
    // },
    // {
    //   path: '../assets/fonts/OnestBlack1602-hint.woff',
    //   weight: '900',
    //   style: 'normal',
    // },
  ],
});

/**
 * An icon font with rounded lines.
 */
export const LineRoundedIcons = localFont({
  src: '../assets/fonts/LineRoundedIcons.woff2',
});
