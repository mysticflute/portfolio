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
};

export default nextConfig;
