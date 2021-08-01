import React from 'react';
import styled from 'styled-components';
import { onepxToRem, Box } from '../styles/globals';
import media from '../styles/media';

interface ProductBoxProps {
  title: string;
  content: string;
}
const ProductBox: React.FC<ProductBoxProps> = ({ title, content }) => {
  const _content = content.split(`<br />`);

  return (
    <Box height={230}>
      <ProductTitle>{title}</ProductTitle>

      <ProductContent>
        {_content.map((desc, idx) => (
          <Item key={idx}>
            <CheckIcon src="/images/check.png" alt="check" /> {desc}
            <br />
          </Item>
        ))}
      </ProductContent>
    </Box>
  );
};

export default ProductBox;

const ProductTitle = styled.div`
  font-size: ${24 * onepxToRem}rem;
  font-weight: bold;

  @media ${media.mobile} {
    font-size: 16px;
  }
`;

const ProductContent = styled.div`
  line-height: normal;
  line-height: ${30 * onepxToRem}rem;

  @media ${media.mobile} {
    font-size: 16px;
    line-height: 22px;
  }
`;

const CheckIcon = styled.img`
  width: ${14 * onepxToRem}rem;
  padding: ${2 * onepxToRem}rem 0;

  @media ${media.mobile} {
    width: ${14 / 1.4}px;
    padding: ${2 / 1.4}px 0;
  }
`;

const Item = styled.div`
  margin: ${10 * onepxToRem}rem 0;
`;
