/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ru", "ua"],
    defaultLocale: "ru",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      // Local development media URL
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/tours/**",
      },
      // Production media URL
      {
        protocol: "https",
        hostname: "mystical-egypt-travels.online",
        pathname: "/media/tours/**",
      },
    ],
  },
  // Dynamically set the trailing slash or basePath for deployments
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL || "http://127.0.0.1:8000/media/",
  },
};

module.exports = nextConfig;
