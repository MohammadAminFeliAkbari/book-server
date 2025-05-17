// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['141.11.21.237'] // Configure allowed image domains
  },
  async rewrites () {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://141.11.21.237:8000/api/v1/auth/:path*'
      }
    ]
  }
}

module.exports = nextConfig
