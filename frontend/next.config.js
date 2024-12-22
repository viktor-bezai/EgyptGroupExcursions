/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ru", "ukr"],
    defaultLocale: "ru",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/tours/**",
      },
    ],
  },
};

module.exports = nextConfig;
