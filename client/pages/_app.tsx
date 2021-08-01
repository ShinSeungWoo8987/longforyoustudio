import '../styles/globals.css';

import { AppProps } from 'next/app';
import Top from '../components/Top';
import Footer from '../components/Footer';
import { onepxToRem } from '../styles/globals';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Information } from '../next-env';
import styled from 'styled-components';
import media from '../styles/media';

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalPadding>
      <div style={{ paddingBottom: `${46 * onepxToRem}rem` }}>
        <Top />
        <Component {...pageProps} />
      </div>

      <Footer />
    </GlobalPadding>
  );
}

export default App;

const GlobalPadding = styled.div`
  padding-right: 9rem;
  padding-left: 9rem;

  @media ${media.mobile} {
    padding: 0;
  }
`;
