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

function MyApp({Component, pageProps}: AppProps) {
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
        <meta name="description" content="Welcome to Egypt Tours Website"/>
        {/* Add favicon */}
        <link rel="icon" href="/icons/favicon.ico"/>
        {/*Add colored Head to mobile browsers */}
        <meta name="theme-color" content={theme.palette.primary.main}/>
        {/* Open Graph meta tags */}
        <meta property="og:title" content="Home | Egypt Tours" />
        <meta property="og:description" content="Welcome to Egypt Tours Website" />
        <meta property="og:image" content="/images/thumbnail.jpg" />
        <meta property="og:url" content="http://64.227.119.29/" />
        <meta property="og:type" content="website" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | Egypt Tours" />
        <meta name="twitter:description" content="Welcome to Egypt Tours Website" />
        <meta name="twitter:image" content="/images/thumbnail.jpg" />
      </Head>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </I18nextProvider>
    </>
  );
}

export default MyApp;
