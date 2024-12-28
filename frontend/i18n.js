import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./public/locales/en/common.json";
import ruCommon from "./public/locales/ru/common.json";
import uaCommon from "./public/locales/ua/common.json";

i18n.use(initReactI18next).init({
  lng: "ru", // Default language
  fallbackLng: "ru", // Fallback language
  debug: false,
  resources: {
    en: { common: enCommon },
    ru: { common: ruCommon },
    ukr: { common: uaCommon },
  },
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Disable suspense during SSR
  },
});

export default i18n;
