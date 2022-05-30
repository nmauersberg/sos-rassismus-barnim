import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <>
          <Head>
            <title>SOS Rassismus Barnim</title>
            <meta
              name='description'
              content='Meta description for the Home page'
            />
          </Head>
          <Toaster />
          <Component {...pageProps} />
        </>
      </Layout>
    </AuthProvider>
  );
}
export default MyApp;
