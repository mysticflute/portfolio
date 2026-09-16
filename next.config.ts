import type { NextConfig } from 'next';

// settings that can be overridden by .env files
const env = {
  // the playwright tests have issues with http://localhost:3000 as the base
  // url, and it seems using http://127.0.0.1:3000 as the base requires adding
  // it to allowedDevOrigins for it to work with the dev server.
  allowedDevOrigins: ['localhost', '127.0.0.1'],
};

if (process.env.ALLOWED_DEV_ORIGINS !== undefined) {
  env.allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS.split(',')
    .map(v => v.trim())
    .filter(v => !!v);
}

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

  allowedDevOrigins: env.allowedDevOrigins,
};

export default nextConfig;
