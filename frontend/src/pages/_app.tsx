import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import theme from "@/styles/theme";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import "@/styles/fonts.css";
import { useEffect } from "react";
import Head from "next/head";
import { NotificationsProvider } from "@/context/NotificationsContext";

function MyApp({ Component, pageProps }: AppProps) {
  const lang = pageProps.lang || "ru";

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme.palette.primary.main);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Anna-Egypt</title>
        <meta
          name="description"
          content="Anna-Egypt — индивидуальные экскурсии по Египту. Хургада, Шарм-эль-Шейх, Каир, Луксор. Проверенный гид, лучшие цены."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content={theme.palette.primary.main} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Anna-Egypt — экскурсии по Египту" />
        <meta
          property="og:description"
          content="Anna-Egypt — индивидуальные экскурсии по Египту. Хургада, Шарм-эль-Шейх, Каир, Луксор. Проверенный гид, лучшие цены."
        />
        <meta
          property="og:image"
          content="https://anna-egypt.com/images/thumbnail.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://anna-egypt.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:locale:alternate" content="ua_UA" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content="Anna-Egypt" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anna-Egypt — экскурсии по Египту" />
        <meta
          name="twitter:description"
          content="Anna-Egypt — индивидуальные экскурсии по Египту. Хургада, Шарм-эль-Шейх, Каир, Луксор. Проверенный гид, лучшие цены."
        />
        <meta
          name="twitter:image"
          content="https://anna-egypt.com/images/thumbnail.png"
        />
      </Head>

      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotificationsProvider>
            <Layout lang={lang}>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </>
  );
}

export default MyApp;
