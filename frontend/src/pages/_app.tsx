import {AppProps} from 'next/app';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18n';
import theme from '@/styles/theme';
import Layout from '@/components/layout/Layout';
import "@/styles/globals.css";
import '@/styles/fonts.css';


function MyApp({Component, pageProps}: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default MyApp;
