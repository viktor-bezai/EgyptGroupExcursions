import {AppProps} from 'next/app';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18n';
import theme from '@/styles/theme';
import Layout from '@/components/layout/Layout';
import "@/styles/globals.css";
import '@/styles/fonts.css';
import {useEffect} from 'react';
import Head from 'next/head';
import {NotificationsProvider} from "@/context/NotificationsContext";

function MyApp({Component, pageProps}: AppProps) {
  const lang = pageProps.lang || "ru";

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.palette.primary.main);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Egypt Tours</title>
        <meta name="description" content="Welcome to Mystical Egypt Travels Website"/>
        <link rel="icon" href="/icons/favicon.ico"/>
        <link rel="canonical" href="https://mystical-egypt-travels.online/"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="theme-color" content={theme.palette.primary.main}/>

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Home | Mystical Egypt Travels"/>
        <meta property="og:description" content="Welcome to Mystical Egypt Travels Website"/>
        <meta property="og:image" content="https://mystical-egypt-travels.online/images/thumbnail.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:url" content="https://mystical-egypt-travels.online/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="ru_RU"/>
        <meta property="og:locale:alternate" content="ua_UA"/>
        <meta property="og:locale:alternate" content="en_US"/>
        <meta property="og:site_name" content="Mystical Egypt Travels"/>

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Home | Mystical Egypt Travels"/>
        <meta name="twitter:description" content="Welcome to Mystical Egypt Travels Website"/>
        <meta name="twitter:image" content="https://mystical-egypt-travels.online/images/thumbnail.png"/>

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
      </Head>

      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
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
