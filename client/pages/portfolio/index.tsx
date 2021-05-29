import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BlankImgStyle, ImgStyle, onepxToRem } from '../../styles/globals';
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

const index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
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

  const blankSpan = (n: number) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(<div style={BlankImgStyle} />);
    }

    return arr;
  };

  // const preventClose = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => e.stopPropagation();

  return (
    <>
      <Head>
        <title>LongForYou Studio</title>
      </Head>

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <LazyLoadImage src={selectedImage} alt={`modal`} effect="opacity" style={ModalStyle} />
        </Modal>
      )}

      <Container>
        {imageList.map((arr, idx) => (
          <div key={idx}>
            {idx !== 0 && <Margin />}
            <ImgList>
              {arr.map((image, idx) => (
                <span key={image.Ima_id}>
                  <LazyLoadImage
                    onClick={() => setSelectedImage(image.Ima_content)}
                    src={image.Ima_content}
                    alt={`${image.Ima_id}`}
                    effect="opacity"
                    style={ImgStyle}
                  />
                </span>
              ))}
              {blankSpan(6 - arr.length)}
            </ImgList>
          </div>
        ))}
      </Container>
    </>
  );
};

export default index;

const Container = styled.div`
  width: 100%;
`;

const ImgList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Margin = styled.div`
  height: ${21 * onepxToRem}rem;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
`;

const ModalStyle = {
  height: '100vh',
};
