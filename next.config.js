/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

module.exports = nextConfig;
