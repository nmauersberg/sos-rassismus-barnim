import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { SettingsProvider } from '../context/SettingsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Layout>
          <>
            <Head>
              <title>SOS Rassismus Barnim</title>
              <meta
                name='description'
                content='Chronik rassistischer Vorfälle im Landkreis Barnim'
              />
            </Head>
            <Toaster />
            <Component {...pageProps} />
          </>
        </Layout>
      </SettingsProvider>
    </AuthProvider>
  );
}
export default MyApp;
