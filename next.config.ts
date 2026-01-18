/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'challenge.egodesign.dev',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;