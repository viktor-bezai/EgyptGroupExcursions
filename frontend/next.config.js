/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  i18n: {
    locales: ["en", "ru", "ua"],
    defaultLocale: "ru",
    localeDetection: false,
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      // Local development media URL
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      // Production media URL (legacy)
      {
        protocol: "https",
        hostname: "anna-egypt.com",
        pathname: "/media/**",
      },
      // DigitalOcean Spaces
      {
        protocol: "https",
        hostname: "tor1.digitaloceanspaces.com",
        pathname: "/prep-english/**",
      },
    ],
  },
  // Dynamically set the trailing slash or basePath for deployments
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL || "http://127.0.0.1:8000",
  },
};

module.exports = nextConfig;
