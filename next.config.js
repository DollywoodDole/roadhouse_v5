/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'kick.com' },
      { protocol: 'https', hostname: 'coconutcowboy.ca' },
    ],
  },
}

module.exports = nextConfig
