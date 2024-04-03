import Script from 'next/script';

// XXX: This is a simplified copy from the component in @next/third-parties. The
// original version is a Client Component ('use client'), which currently causes
// a CSS ordering bug, where imported CSS files in the root layout are not
// consistently ordered as specified. See notes in the `layout` component.
//
// This can be deleted in favor of the original once this bug is fixed.

type Props = {
  gaId: string;
  dataLayerName?: string;
};

/**
 * Google analytics script tag.
 */
export function GoogleAnalytics({ gaId, dataLayerName = 'dataLayer' }: Props) {
  return (
    <>
      <Script
        id="ga-init"
        dangerouslySetInnerHTML={{
          __html: `
          window['${dataLayerName}'] = window['${dataLayerName}'] || [];
          function gtag(){window['${dataLayerName}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');`,
        }}
      />
      <Script
        id="ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  );
}
