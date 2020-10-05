import Head from 'next/head';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import theme from '../theme';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
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
