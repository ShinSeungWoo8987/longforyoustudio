import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, onepxToRem, Title, Box } from '../styles/globals';
import Link from 'next/link';
import Head from 'next/head';
import ProductBox from '../components/ProductBox';
import parse from 'react-html-parser';
import axios from 'axios';
import { Information, NoticeProps } from '../next-env';
import media from '../styles/media';

const notice: React.FC<NoticeProps> = (props) => {
  const [procedure1, setProcedure1] = useState(props.procedure1 ? props.procedure1 : '');
  const [procedure2, setProcedure2] = useState(props.procedure2 ? props.procedure2 : '');
  const [procedure3, setProcedure3] = useState(props.procedure3 ? props.procedure3 : '');
  const [product, setProduct] = useState(props.product ? props.product : '');
  const [request, setRequest] = useState(props.request ? props.request : '');
  const [productList, setProductList] = useState(props.productList ? props.productList : []);

  useEffect(() => {
    // props 유무로 admin페이지인지 아닌지 확인한다.
    // admin페이지에서는 이미 받아온 데이터가 있으므로 fetch하지 않는다.
    if (Object.keys(props).length === 0)
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + `/information`)
        .then((res) => {
          res.data.map((info: Information) => {
            switch (info.Inf_type) {
              case 'procedure1':
                setProcedure1(info.Inf_content);
                break;
              case 'procedure2':
                setProcedure2(info.Inf_content);
                break;
              case 'procedure3':
                setProcedure3(info.Inf_content);
                break;
              case 'product':
                setProduct(info.Inf_content);
                break;
              case 'request':
                setRequest(info.Inf_content);
                break;

              default:
                break;
            }
          });
        })
        .catch((err) => {
          console.log(`Information 데이터 불러오기 실패`);
        });

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/product`)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(`Product 데이터 불러오기 실패`);
      });
  }, []);

  return (
    <>
      <Head>
        <title>LongForYou Studio</title>
      </Head>

      <Wrapper>
        <Title>촬영절차</Title>
        <Content marginBottom={true}>
          <Box height={250}>
            <BulbIcon src="/images/bulb.png" alt="bulb" />
            <Header>:: 문의 ::</Header>
            <Description>{parse(procedure1)}</Description>
          </Box>

          <Arrow src="/images/arrow-right.png" alt="arrow" />

          <Box height={250}>
            <ChatIcon src="/images/chat.png" alt="chat" />
            <Header>:: 상담 ::</Header>
            <Description>{parse(procedure2)}</Description>
          </Box>

          <Arrow src="/images/arrow-right.png" alt="arrow" />

          <Box height={250}>
            <CameraIcon src="/images/camera.png" alt="camera" />
            <Header>:: 촬영 및 편집 ::</Header>
            <Description>{parse(procedure3)}</Description>
          </Box>
        </Content>

        <Title>문의</Title>
        <Content marginBottom={true}>{parse(request)}</Content>

        <Title>상품</Title>
        <ProductList marginBottom={false}>
          {productList &&
            productList.map((prod) => {
              if (prod.pro_id === 0) return null;
              else return <ProductBox key={prod.pro_id} title={prod.pro_title} content={prod.pro_content} />;
            })}
        </ProductList>

        <div style={{ marginBottom: `${46 * onepxToRem}rem` }}>{parse(product)}</div>

        <Link href="/reservation">
          <E>예약 문의하기</E>
        </Link>
      </Wrapper>
    </>
  );
};

export default notice;

const Wrapper = styled(Container)`
  @media ${media.mobile} {
    padding-top: 4rem;
    padding-left: 9rem;
    padding-right: 9rem;
    font-size: 16px;
  }
`;

const Content = styled.div<{ marginBottom: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${46 * onepxToRem}rem` : `${16 * onepxToRem}rem`)};

  line-height: ${42 * onepxToRem}rem;

  @media ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${46}px` : `${16}px`)};
    line-height: 22px;
  }
`;

const ProductList = styled(Content)`
  @media ${media.mobile} {
    height: ${540 + 72}px;
  }
`;

const Arrow = styled.img`
  width: ${40 * onepxToRem}rem;
  height: ${35 * onepxToRem}rem;
  @media ${media.mobile} {
    width: ${40 / 3}px;
    height: ${35 / 3}px;

    transform: rotate(90deg);

    padding: 12px;
    align-self: center;
  }
`;

const E = styled.span`
  color: #9095db;
  font-weight: bold;
  cursor: pointer;
`;

const BulbIcon = styled.img`
  display: block;
  height: ${40 * onepxToRem}rem;
  width: ${27.54 * onepxToRem}rem;

  @media ${media.mobile} {
    height: ${40 / 2}px;
    width: ${27.54 / 2}px;
  }
`;

const ChatIcon = styled.img`
  display: block;
  height: ${40 * onepxToRem}rem;
  width: ${40.77 * onepxToRem}rem;

  @media ${media.mobile} {
    height: ${40 / 2}px;
    width: ${40.77 / 2}px;
  }
`;

const CameraIcon = styled.img`
  display: block;
  height: ${32 * onepxToRem}rem;
  width: ${41 * onepxToRem}rem;
  padding: ${4 * onepxToRem}rem 0;

  @media ${media.mobile} {
    height: ${32 / 2}px;
    width: ${41 / 2}px;
    padding: ${4 / 2}px 0;
  }
`;

const CheckIcon = styled.img`
  width: ${14 * onepxToRem}rem;
  padding: ${2 * onepxToRem}rem 0;
`;

const Header = styled.div`
  font-weight: bold;
`;
const Description = styled.div`
  line-height: normal;
`;

const ProductTitle = styled.div`
  font-size: ${24 * onepxToRem}rem;
  font-weight: bold;
`;
