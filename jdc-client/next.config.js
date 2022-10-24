/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['jdc-bucket.s3.amazonaws.com'],
  }
}

module.exports = nextConfig
