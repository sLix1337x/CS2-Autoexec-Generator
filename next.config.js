const isProd = process.env.NODE_ENV === 'production';

const withPWA = isProd
  ? require('next-pwa')({
      dest: 'public',
      register: true,
      skipWaiting: true,
    })
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enable styled-components support
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove swcMinify as it's now the default in newer Next.js versions
  // and causes warnings when explicitly set
};

module.exports = withPWA(nextConfig);
