import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Container, Hr, Title } from '../styles/globals';
import { isUserLoggedIn, logout, setupAxiosInterceptors } from '../functions/AuthenticationService';
import Index from './index';
import Portfolio from './portfolio';
import About from './about';
import Notice from './notice';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Image, Information, NoticeProps } from '../next-env';
import Message from '../components/admin/Message';
import EditContent from '../components/admin/EditContent';
import styled from 'styled-components';
import EditImage from '../components/admin/EditImage';
import UploadImage from '../components/admin/UploadImage';
import EditMainImage from '../components/admin/EditMainImage';

export const getStaticProps: GetStaticProps = async (context) => {
  const images = await axios
    .get(process.env.URL + `/image/all`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(`이미지 데이터 불러오기 실패`);
    });

  let information = {};
  await axios
    .get(process.env.URL + `/information`)
    .then((res) => {
      res.data.map((info: Information) => {
        information[`${info.Inf_type}`] = info.Inf_content;
      });
    })
    .catch((err) => {
      console.log(`Information 데이터 불러오기 실패`);
    });

  await axios
    .get(process.env.URL + `/product`)
    .then((res) => {
      information[`productList`] = res.data;
    })
    .catch((err) => {
      console.log(`Product 데이터 불러오기 실패`);
    });

  return { props: { images, information } };
};

interface adminProps {
  images: Image[];
  information: NoticeProps;
}
const admin: React.FC<adminProps> = (props) => {
  const [{ images, information }, setData] = useState({
    images: props.images,
    information: props.information,
  });

  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [allPagesOpen, setAllPagesOpen] = useState(false);
  const router = useRouter();

  const updateImage = (data: Image[]) => {
    // 업데이트가 성공한 경우에는 서버에 다시 정보를 요청할지 아니면 업로드한 req로 배열에 push할지 전에 어떻게 했는지 확인하기.
    setData({ images: data, information });
  };
  const updateInformation = (data: NoticeProps) => {
    setData({ images, information: data });
    setAllPagesOpen(false);
  };

  useEffect(() => {
    setIsLogin(isUserLoggedIn());
    setLoading(false);
    if (!loading && isLogin) setupAxiosInterceptors();
  }, []);

  if (!loading && !isLogin) router.push(`/login`);

  const onLogout = () => {
    logout();
    router.push(`/`);
  };

  // const allPages = (
  //   <>
  //     <Index description="Admin page." />
  //     <Hr />
  //     <Portfolio images={images} />
  //     <Hr />
  //     <About />
  //     <Hr />
  //     <Notice {...information} />
  //   </>
  // );

  return (
    <>
      <Head>
        <title>LongForYou Studio - 관리자</title>
      </Head>

      <Container>
        {!loading && isLogin && (
          <>
            <Header>
              <Title>관리자 페이지.</Title>
              <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
            </Header>

            <Hr />

            <Container>
              <Message />
            </Container>

            <Hr />

            <Container>
              <EditContent
                images={images}
                information={information}
                updateImage={updateImage}
                updateInformation={updateInformation}
              />
            </Container>

            <Hr />

            <Container>
              <UploadImage />
            </Container>

            <Hr />

            <Container>
              <EditImage />
            </Container>

            <Hr />

            <Container>
              <EditMainImage />
            </Container>

            {/* <Hr />
            미리보기 :{' '}
            <button onClick={() => setAllPagesOpen(!allPagesOpen)}>
              {allPagesOpen ? '닫기' : '열기'}
            </button>
            {allPagesOpen && [<Hr />, allPages]} */}
          </>
        )}
      </Container>
    </>
  );
};

export default admin;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const LogoutBtn = styled.button``;
