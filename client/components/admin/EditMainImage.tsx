import axios from 'axios';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Title } from '../../styles/globals';

interface EditMainImageProps {}

const EditMainImage: React.FC<EditMainImageProps> = () => {
  const mainImageRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const main = mainImageRef.current?.files;
    if (main) {
      const formData = new FormData();
      const config = { headers: { 'content-type': 'multipart/form-data' } };
      formData.append('video', main[0]);
      console.log(main);
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + `/backgroundVideo`, formData, config)
        .then(() => window.alert(`변경되었습니다.`))
        .catch(() => window.alert('잠시후에 다시 시도해 주세요.'));
    } else {
      window.alert(`파일을 업로드하세요.`);
    }
  };

  return (
    <Wrapper>
      <Title>Edit Main Image</Title>

      <input type="file" ref={mainImageRef} />
      <br />
      <button onClick={onSubmit}>업로드</button>
    </Wrapper>
  );
};

export default EditMainImage;

const Wrapper = styled.div`
  text-align: center;
`;
