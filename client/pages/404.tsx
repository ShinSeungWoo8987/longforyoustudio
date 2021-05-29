import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/globals';

const Error404 = () => {
  return (
    <>
      <Head>
        <title>LongForYou Studio - Error</title>
        <meta name="description" content="Error page." />
      </Head>

      <Wrapper>페이지가 존재하지 않습니다.</Wrapper>
    </>
  );
};

export default Error404;

export const Wrapper = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
