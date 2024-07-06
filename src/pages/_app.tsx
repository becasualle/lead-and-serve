import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/pages/globals.css';
import { useTheme } from '@/hooks/useTheme';
import { ptSerif, openSans } from '@/utils/fonts';

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div>
        {' '}
        <p>{theme}</p>
        <button onClick={toggleTheme}>toggle</button>
      </div>
      <main className={`${openSans.variable} ${ptSerif.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
