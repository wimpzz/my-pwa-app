/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // disable in dev for faster builds
})

module.exports = withPWA({
  // other next.js config here if needed
})
