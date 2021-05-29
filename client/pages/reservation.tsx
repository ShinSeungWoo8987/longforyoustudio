import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container, onepxToRem, Title } from '../styles/globals';
import Head from 'next/head';
import axios from 'axios';
import { Product } from '../next-env';

const reservation = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/product`)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(`Product 데이터 불러오기 실패`);
      });
  }, []);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const productRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const today = new Date();
  const todayString = `${today.getFullYear()}-${
    today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
  }-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;

  const [hopeDate, setHopeDate] = useState<string>(todayString);
  const [hopeDateState, setHopeDateState] = useState(false);

  const onsubmit = () => {
    const data = {
      Mes_name: nameRef.current.value,
      Mes_phone: phoneRef.current.value,
      Mes_content: contentRef.current.value,
      Mes_hopedate: hopeDateState ? '9999-12-31' : hopeDate,
      pro_id: productRef.current.value === '0' ? null : Number(productRef.current.value),
    };

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/message`, data)
      .then(() => {
        nameRef.current.value = '';
        phoneRef.current.value = '';
        productRef.current.value = '';
        setHopeDate(todayString);
        contentRef.current.value = '';
      })
      .catch(() => {
        window.alert(`잠시후에 다시 시도해 주세요.`);
      });
  };

  const handleCheckBox = (e: any) => setHopeDateState(e.target.checked);

  return (
    <>
      <Head>
        <title>LongForYou Studio</title>
      </Head>

      <Container>
        <Title>예약 문의</Title>

        <Content>
          <div>성함</div>
          <Input ref={nameRef} />
        </Content>

        <Content>
          <div>연락처</div>
          <Input ref={phoneRef} maxLength={11} />
        </Content>

        <Content>
          <div>촬영 내용</div>
          <Select ref={productRef}>
            {productList.map((product) => (
              <option key={product.pro_id} value={product.pro_id}>
                {product.pro_title}
              </option>
            ))}
          </Select>
        </Content>

        <Content>
          <div>희망 날짜</div>
          <Input
            type="date"
            onChange={(e) => setHopeDate(e.target.value)}
            value={hopeDate}
            min={todayString}
            style={{ width: `${436 * onepxToRem}rem` }}
            readOnly={hopeDateState}
          />
          <span style={{ marginLeft: `${20 * onepxToRem}rem` }}>
            <input type="checkbox" onClick={handleCheckBox} /> 미정
          </span>
        </Content>

        <Content>
          <div>기타 문의 사항</div>
          <TextArea ref={contentRef} cols={42} rows={5} />
        </Content>

        <Button onClick={onsubmit}>예약</Button>
      </Container>
    </>
  );
};

export default reservation;

const Content = styled.div`
  margin-bottom: ${16 * onepxToRem}rem;
  line-height: ${(32 + 10) * onepxToRem}rem;
`;

const Input = styled.input`
  width: ${530 * onepxToRem}rem;
  border-radius: ${4 * onepxToRem}rem;
  border: 1px solid #707070;
  font-size: ${24 * onepxToRem}rem;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px lightgrey;
  }
`;

const TextArea = styled.textarea`
  // width: ${530 * onepxToRem}rem;
  // height: ${40 * onepxToRem}rem;
  border-radius: ${4 * onepxToRem}rem;
  border: 1px solid #707070;
  font-size: ${24 * onepxToRem}rem;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px lightgrey;
  }
`;

const Button = styled.div`
  cursor: pointer;
  border: 1px solid #0077cc;
  background-color: #3d9de9;
  border-radius: ${4 * onepxToRem}rem;
  width: ${100 * onepxToRem}rem;
  height: ${35 * onepxToRem}rem;
  line-height: ${34 * onepxToRem}rem;
  text-align: center;
  font-size: ${14 * onepxToRem}rem;
  color: white;
`;

const CheckIcon = styled.img`
  width: ${14 * onepxToRem}rem;
  padding: ${2 * onepxToRem}rem 0;

  margin-right: ${4 * onepxToRem}rem;
`;

const Select = styled.select`
  width: ${530 * onepxToRem}rem;
  border-radius: ${4 * onepxToRem}rem;
  border: 1px solid #707070;
  font-size: ${24 * onepxToRem}rem;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px lightgrey;
  }
`;
