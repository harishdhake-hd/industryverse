/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'images.unsplash.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: 'IndustryVerse',
  },
};

module.exports = nextConfig;
