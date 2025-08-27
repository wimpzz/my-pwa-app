/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  // PWA will be enabled in both development and production
  disable: false,
})

module.exports = withPWA({
  // Other Next.js config options can go here
})

