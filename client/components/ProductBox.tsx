import React from 'react';
import styled from 'styled-components';
import { onepxToRem, Box } from '../styles/globals';

interface ProductBoxProps {
  title: string;
  content: string;
}
const ProductBox: React.FC<ProductBoxProps> = ({ title, content }) => {
  const _content = content.split(`<br />`);

  return (
    <Box height={200}>
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
`;

const ProductContent = styled.div`
  line-height: normal;
  line-height: ${30 * onepxToRem}rem;
`;

const CheckIcon = styled.img`
  width: ${14 * onepxToRem}rem;
  padding: ${2 * onepxToRem}rem 0;
`;

const Item = styled.div`
  margin: ${10 * onepxToRem}rem 0;
`;
