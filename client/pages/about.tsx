import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { onepxToRem } from '../styles/globals';

const about = () => {
  return (
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
};

export default about;

const Container = styled.div`
  min-height: ${693 * onepxToRem}rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  text-align-last: center;
`;

const Logo = styled.img`
  height: ${200 * onepxToRem}rem;
`;

const Description = styled.div`
  margin-top: ${46 * onepxToRem}rem;
  font-size: ${26 * onepxToRem}rem;
  line-height: ${50 * onepxToRem}rem;
`;
