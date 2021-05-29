import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DisplayButton, onepxToRem, Title } from '../../styles/globals';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Image } from '../../next-env';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const chunk = (arr: Image[], size: number) => {
  let i, j;
  let temparray = [];

  for (i = 0, j = arr.length; i < j; i += size) {
    temparray.push(arr.slice(i, i + size));
  }

  return temparray;
};

const EditImage: React.FC = () => {
  const [display, setDisplay] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/image/all`)
      .then((res) => setImages(res.data))
      .catch((err) => {
        console.log(`이미지데이터 불러오기 실패`);
      });
  }, []);

  const thumbnails = images ? images.filter((img) => img.Ima_thumbnail === true || img.Ima_thumbnail === 1) : [];
  const imageList: Image[][] = chunk(thumbnails, 6);

  const deleteImage = (groupId: number) => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + `/delete/image/${groupId}`)
      .then((res) => {
        // 삭제이후 images변수에서 해당 데이터 삭제해주기.
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>LongForYou Studio</title>
      </Head>

      <Container>
        <Title>Edit Image</Title>

        {display &&
          imageList.map((arr, idx) => (
            <div key={idx}>
              {idx !== 0 && <Margin />}
              <ImgList>
                {arr.map((image) => (
                  <ImageDiv key={image.Ima_id}>
                    <LazyLoadImage src={image.Ima_content} alt={`${image.Ima_id}`} effect="opacity" style={ImgStyle} />
                    <DeleteButton onClick={() => deleteImage(image.Ima_groupid)}>X</DeleteButton>
                  </ImageDiv>
                ))}
              </ImgList>
            </div>
          ))}

        <DisplayButton onClick={() => setDisplay(!display)}>{display ? '∧' : '∨'}</DisplayButton>
      </Container>
    </>
  );
};

export default EditImage;

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const ImgList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ImgStyle = {
  width: `${233.5 * onepxToRem}rem`,
  height: `${350.2593273148518 * onepxToRem}rem`,
  borderRadius: `${14 * onepxToRem}rem`,
  boxShadow: `0px 0px 99px 0px lightgrey`,
};

const Margin = styled.div`
  height: ${21 * onepxToRem}rem;
`;

const ImageDiv = styled.div``;

const DeleteButton = styled.button`
  display: block;
  margin: 0 auto;
`;
