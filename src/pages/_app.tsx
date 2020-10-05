import Head from 'next/head';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import theme from '../theme';
import { SWRConfig } from 'swr';
import fetcher from '../utils/fetcher';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <CSSReset />
          <Head>
            <title>OlympusBlog</title>
          </Head>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
