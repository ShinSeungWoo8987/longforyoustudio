import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Container, onepxToRem } from '../styles/globals';
import media from '../styles/media';

const about = () => {
  return (
    <Wrapper>
      <Logo src="/images/logo.png" alt="logo" />
      <Description>
        LongForYou Studio는 사진에 감정을 담기 위해 노력합니다.
        <br />
        한 사람이 만들어내는 이야기와 감정에 집중하여
        <br />
        가장 '나' 다운 순간을 포착할 때, 사진은 비로소 본연의 목적, 그 아름다움을 찾아갑니다.
        <br />
        당신의 온도, 분위기, 매력 당신만이 만들어낼 수 있는 그 순간을 담습니다.
      </Description>
      {/* <Content>
        
      </Content> */}
    </Wrapper>
  );
};

export default about;

export const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${media.mobile} {
    padding-left: 9rem;
    padding-right: 9rem;
  }
`;

const Content = styled.div`
  text-align-last: center;
`;

const Logo = styled.img`
  /* height: ${200 * onepxToRem}rem; */
  width: 36%;
  aspect-ratio: 11/4;

  @media ${media.mobile} {
    width: 76%;
  }
`;

const Description = styled.div`
  text-align: center;
  margin-top: ${106 * onepxToRem}rem;
  font-size: ${26 * onepxToRem}rem;
  line-height: ${50 * onepxToRem}rem;

  @media ${media.mobile} {
    text-align: left;
    font-size: 16px;
    line-height: 30px;
  }
`;
