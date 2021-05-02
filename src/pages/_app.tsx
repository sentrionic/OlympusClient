import Head from 'next/head';
import { ColorModeScript, CSSReset, ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import '../styles.css';
import fetcher from '../utils/fetcher';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      <ChakraProvider>
        <CSSReset />
        <Head>
          <title>OlympusBlog</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <ColorModeScript />
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
