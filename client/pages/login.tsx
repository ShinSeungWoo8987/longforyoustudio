import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Container, onepxToRem } from '../styles/globals';
import { setupAxiosInterceptors } from '../functions/AuthenticationService';
import media from '../styles/media';

const login = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idRef.current && pwRef.current) {
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + `/login`, {
          username: idRef.current!.value,
          password: pwRef.current!.value,
        })
        .then((res) => {
          // 로그인 성공
          sessionStorage.setItem('token', res.data.jwttoken);
          setupAxiosInterceptors();
          router.push(`/admin`);
        })
        .catch((err) => setMessage('잘못된 아이디/비밀번호 입니다.'));
    }
  };

  return (
    <>
      <Head>
        <title>LongForYou Studio</title>
      </Head>

      <Wrapper>
        <Form onSubmit={onLogin}>
          <Input ref={idRef} type="text" placeholder="아이디" required autoFocus />
          <Input ref={pwRef} type="password" placeholder="비밀번호" required />
          <Message>{message}&nbsp;</Message>
          <Button type="submit">로그인</Button>
        </Form>
      </Wrapper>
    </>
  );
};

export default login;

const Wrapper = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: ${150 * onepxToRem}rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media ${media.mobile} {
    width: 100%;
    height: 200px;
  }
`;

const Input = styled.input`
  display: block;
  width: ${306 * onepxToRem}rem;
  height: ${36 * onepxToRem}rem;

  border-radius: ${4 * onepxToRem}rem;
  border: 1px solid #707070;
  font-size: ${18 * onepxToRem}rem;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px lightgrey;
  }

  @media ${media.mobile} {
    width: 300px;
    height: 50px;
    border-radius: 8px;

    font-size: 16px;
  }
`;

const Message = styled.div`
  font-size: 5px;
  color: red;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto;
  height: ${36 * onepxToRem}rem;
  width: ${306 * onepxToRem}rem;
  font-size: ${18 * onepxToRem}rem;

  border-radius: ${4 * onepxToRem}rem;
  color: white;

  border: 1px solid #0077cc;
  background-color: #3d9de9;

  &:hover {
    box-shadow: 0px 0px 3px lightgrey;
  }

  @media ${media.mobile} {
    width: 300px;
    height: 50px;
    border-radius: 8px;

    font-size: 16px;
  }
`;
