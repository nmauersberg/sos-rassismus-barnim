import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SOS Rassismus Barnim</title>
        <meta name='description' content='Meta description for the Home page' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
