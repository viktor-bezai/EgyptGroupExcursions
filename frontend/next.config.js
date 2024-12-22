/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ru', 'ukr'], // List of supported locales
    defaultLocale: 'ru',        // Default locale
    localeDetection: false,      // Automatically detect locale from browser
  },
};

module.exports = nextConfig;
