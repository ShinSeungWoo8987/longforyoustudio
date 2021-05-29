import '../styles/globals.css';

import { AppProps } from 'next/app';
import Top from '../components/Top';
import Footer from '../components/Footer';
import { onepxToRem } from '../styles/globals';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Information } from '../next-env';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div style={{ paddingBottom: `${46 * onepxToRem}rem` }}>
        <Top />
        <Component {...pageProps} />
      </div>

      <Footer />
    </>
  );
}

export default App;
