import localFont from 'next/font/local';

/**
 * The Onest font from https://onest.md/en.
 */
export const Onest = localFont({
  src: [
    // {
    //   path: '../_assets/fonts/OnestThin1602-hint.woff',
    //   weight: '100',
    //   style: 'normal',
    // },
    // {
    //   path: '../_assets/fonts/OnestLight1602-hint.woff',
    //   weight: '300',
    //   style: 'normal',
    // },
    {
      path: '../_assets/fonts/OnestRegular1602-hint.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../_assets/fonts/OnestMedium1602-hint.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../_assets/fonts/OnestBold1602-hint.woff',
      weight: '700',
      style: 'normal',
    },
    // {
    //   path: '../_assets/fonts/OnestExtraBold1602-hint.woff',
    //   weight: '800',
    //   style: 'normal',
    // },
    // {
    //   path: '../_assets/fonts/OnestBlack1602-hint.woff',
    //   weight: '900',
    //   style: 'normal',
    // },
  ],
  variable: '--font-default',
});

/**
 * An icon font with rounded lines.
 */
export const LineRoundedIcons = localFont({
  src: '../_assets/fonts/LineRoundedIcons.woff2',
  variable: '--font-line-rounded-icons',
});
