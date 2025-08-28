/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  // PWA will be enabled in both development and production
  disable: false,
})

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/api/War/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/SPASv2Repo/api/War/:path*`,
      },
    ];
  },
})

