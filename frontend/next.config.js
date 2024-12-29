/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ru", "ua"],
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
      {
        protocol: "http",
        hostname: "64.227.119.29",
        port: "8000",
        pathname: "/media/tours/**",
      },
    ],
  },
};

module.exports = nextConfig;
