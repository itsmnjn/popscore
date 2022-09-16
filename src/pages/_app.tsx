import { AppProps } from 'next/app';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

import '@app/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string);
    ReactGA.send('pageview');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
