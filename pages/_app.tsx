import { Onest, LineRoundedIcons } from '@/lib/fonts';

import 'normalize.css/normalize.css';
import '@/styles/globals.css';
import '@/styles/common.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-default: ${Onest.style.fontFamily};
          --font-line-rounded-icons: ${LineRoundedIcons.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
