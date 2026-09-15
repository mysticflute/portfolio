import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  images: {
    qualities: [50, 75, 80, 100],
  },

  async headers() {
    return [
      {
        source: '/images/:path*(svg|jpg|png|webp)',
        has: [
          {
            type: 'query',
            key: 'v',
            value: '([0-9]+)',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            // day * 86400 = seconds. e.g., 2592000 = 30 days
            value: 'public, max-age=2592000, immutable',
          },
        ],
      },
    ];
  },

  // the playwright tests have issues with http://localhost:3000 as the base
  // url, and it seems http://127.0.0.1:3000 as the base url requires this
  // setting when running in dev mode.
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;
