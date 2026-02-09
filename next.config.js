/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      // Add your actual image hosting domain here
      // Example:
      {
        protocol: 'https',
        hostname: 'autogemzgo.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Improve HMR performance
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  async headers() {
    return [];
  },
};

module.exports = nextConfig;

