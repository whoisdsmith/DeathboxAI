import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GameProvider } from '@/context/GameContext';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GameProvider>
  );
}