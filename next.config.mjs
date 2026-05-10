/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: { unoptimized: true } // keep true to avoid image-optimizer/sharp on shared hosting
};
export default nextConfig;
