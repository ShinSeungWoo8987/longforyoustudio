import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Image, NoticeProps, Product } from '../../next-env';
import { DisplayButton, onepxToRem, Title } from '../../styles/globals';

interface EditContentProps {
  images: Image[];
  information: NoticeProps;

  updateImage: (images: Image[]) => void;
  updateInformation: (information: NoticeProps) => void;
}

const EditContent: React.FC<EditContentProps> = ({ images, information, updateImage, updateInformation }) => {
  const [titleSelected, setTitleSelected] = useState('procedure');
  const [procedureSelected, setProcedureSelected] = useState('procedure1');
  const [selectedProductId, setSelectedProductId] = useState(0);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (titleSelected === 'procedure') {
      setContent(information[procedureSelected]);
    } else if (titleSelected === 'productList') {
      const selectedProduct: Product = information[titleSelected].filter(
        (product: Product) => product.pro_id === selectedProductId
      )[0];

      setTitle(selectedProduct.pro_title);
      setContent(selectedProduct.pro_content);
    } else setContent(information[titleSelected]);
  }, [titleSelected, procedureSelected, selectedProductId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTitleSelected(e.target.value);

  const handleProcedureChange = (e: React.ChangeEvent<HTMLSelectElement>) => setProcedureSelected(e.target.value);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProductId(Number(e.target.value));

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  ///////////////////////////////////////

  const updateInformationData = (Inf_type: string, Inf_content: string) => {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/information/update`, {
        Inf_type,
        Inf_content,
      })
      .then(async (res) => {
        alert(`수정이 완료되었습니다.`);
        // 수정이후 refresh를 하던 따로 처리 필요함.. 이럴때 리덕스를 써야 편하긴한데..
      })
      .catch((err) => console.log(err));
  };

  const updateProductData = (pro_id: number, pro_title: string, pro_content: string) => {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/product/update`, {
        pro_id,
        pro_title,
        pro_content,
      })
      .then(async (res) => {
        alert(`수정이 완료되었습니다.`);
        // 수정이후 refresh를 하던 따로 처리 필요함.. 이럴때 리덕스를 써야 편하긴한데..
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    const _content = content.replaceAll('\n', '<br />');

    if (titleSelected === 'productList') {
      updateProductData(selectedProductId, title, _content);
    } else if (titleSelected === 'procedure') {
      updateInformationData(procedureSelected, _content);
    } else {
      updateInformationData(titleSelected, _content);
    }
  };

  ///////////////////////////////////////

  return (
    <Wrapper>
      <Title>Edit Content</Title>

      {display && (
        <>
          <select onChange={handleTitleChange}>
            <option value="procedure">촬영절차</option>
            <option value="request">문의</option>
            <option value="product">상품</option>
            <option value="productList">상품목록 수정</option>
          </select>

          {titleSelected === 'procedure' && (
            <select onChange={handleProcedureChange}>
              <option value="procedure1">:: 문의 ::</option>
              <option value="procedure2">:: 상담 ::</option>
              <option value="procedure3">:: 촬영 및 편집 ::</option>
            </select>
          )}

          {titleSelected === 'productList' && (
            <select onChange={handleProductChange}>
              {information.productList.map((product) => (
                <option key={product.pro_id} value={product.pro_id}>
                  {product.pro_title}
                </option>
              ))}
            </select>
          )}

          {titleSelected === 'productList' && (
            <div style={{ marginTop: '1rem' }}>
              <input type="text" value={title} onChange={handleTitle} />
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <textarea
              cols={50}
              rows={10}
              value={content.replaceAll('<br />', '\n')}
              // value={content}
              onChange={(e) => handleContentChange(e)}
            />
            <SubmitButton onClick={onSubmit}>수정</SubmitButton>
          </div>
        </>
      )}

      <DisplayButton onClick={() => setDisplay(!display)}>{display ? '∧' : '∨'}</DisplayButton>
    </Wrapper>
  );
};

export default EditContent;

const Wrapper = styled.div`
  text-align: center;
  width: 86%;
  margin: 0 auto;
  padding-bottom: ${10 * onepxToRem}rem;
`;

const SubmitButton = styled.button`
  display: block;
  margin: 0 auto;
`;
