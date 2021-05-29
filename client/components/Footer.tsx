import React from 'react';
import parse from 'react-html-parser';
import styled from 'styled-components';
import { onepxToRem } from '../styles/globals';

const Footer = () => {
  const footer =
    'TEL :: 010-7924-4074<br />KAKAOTALK :: longforyou25<br />KAKAO PLUS+ :: longforyoustudio<br />Instagram :: longforyoustudio<br />EMAIL:: longforyoustudio@gmail.com<br />ADD :: 다산동 4268-6';

  return (
    <Container>
      {/* {parse(footer)} */}© {new Date().getFullYear()} 최현민
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  padding: ${46 * onepxToRem}rem 0;
  border-top: 3px solid #eeeef0;
`;
