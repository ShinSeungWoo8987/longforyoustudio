import axios from 'axios';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fetchData } from '../functions/fetchData';
import { Information } from '../next-env';

/////
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { description: '당신의 순간을 전해드립니다. LongForYou Studio :: 롱포유 스튜디오' },
    // notFound,redirect,revalidate
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
//   return {paths,fallback}
// }

// export const getServerSideProps: GetServerSideProps = async context => {
//   // ...
//   return { props, notFound, redirect };
// };

/////

const index = ({ description }) => {
  const uri = `https://longforyoustudio.s3.ap-northeast-2.amazonaws.com/information/background-video.mp4`;

  return (
    <>
      <Head>
        <title>LongForYou Studio</title>
        <meta name="description" content={description} />
        <meta name="og:title" content="📷 LongForYou Studio :: 롱포유 스튜디오" />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={uri} />
      </Head>

      <MainImg src={uri} alt="Main" />

      <Hidden>
        <span>롱포유 스튜디오</span>
        <span>롱포유스튜디오</span>
        <span>LongForYou 스튜디오</span>
        <span>LongForYou스튜디오</span>
        <span>LongForYou Studio</span>
        <span>LongForYouStudio</span>
        <span>Long For You Studio</span>
      </Hidden>
    </>
  );
};

export default index;

const MainImg = styled.img`
  width: 100%;
  box-shadow: 0px 0px 99px 0px lightgrey;
`;
const Img = styled.img`
  width: 33.3%;
`;

const Hidden = styled.div`
  display: none;
`;
