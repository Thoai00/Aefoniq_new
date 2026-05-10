/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    // Add this if you are using external images/videos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
    ],
  },
};

export default nextConfig;