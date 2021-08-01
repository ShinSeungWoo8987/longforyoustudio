import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BlankImgStyle,
  Container,
  ImgStyle,
  onepxToRem,
  MobileBlankImgStyle,
  MobileImgStyle,
} from '../../styles/globals';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Image } from '../../next-env';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import media, { size } from '../../styles/media';

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
  /////////////
  const [splitNum, setSplitNum] = useState(6);
  const handleResize = () => {
    if (window.innerWidth < size.mobile) {
      setSplitNum(3);
    } else {
      setSplitNum(6);
    }
  };

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/image/all`)
      .then((res) => setImages(res.data))
      .catch((err) => {
        console.log(`이미지데이터 불러오기 실패`);
      });
    /////////////
    handleResize(); // 첫번째 렌더링에서 화면크기를 가져오기위해 한번 실행시켜준다.
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const thumbnails = images ? images.filter((img) => img.Ima_thumbnail === true || img.Ima_thumbnail === 1) : [];
  const imageList: Image[][] = chunk(thumbnails, splitNum);

  const blankSpan = (n: number) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(<div style={splitNum === 3 ? MobileBlankImgStyle : BlankImgStyle} />);
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

      <Wrapper>
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
                    style={splitNum === 3 ? MobileImgStyle : ImgStyle}
                  />
                </span>
              ))}
              {blankSpan(splitNum - arr.length)}
            </ImgList>
          </div>
        ))}
      </Wrapper>
    </>
  );
};

export default index;

const Wrapper = styled(Container)`
  @media ${media.mobile} {
    padding-top: 4rem;
    padding-left: 9rem;
    padding-right: 9rem;
    font-size: 16px;
  }
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
