import Head from 'next/head';
import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import { SWRConfig } from 'swr';
import '../styles.css';

import theme from '../theme';
import fetcher from '../utils/fetcher';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider value='light'>
          <CSSReset />
          <Head>
            <title>OlympusBlog</title>
            <link rel='shortcut icon' href='/favicon.ico' />
          </Head>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
