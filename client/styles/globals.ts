import styled from 'styled-components';

// 46px = 2.56875rem
export const onepxToRem: number = 2.56875 / 46;

export const Container = styled.div`
  margin: 0;
  padding: 0;
  font-size: ${24 * onepxToRem}rem;
`;

export const Title = styled.div`
  margin-bottom: ${16 * onepxToRem}rem;
  font-size: ${34 * onepxToRem}rem;
  font-weight: bold;
`;

export const Box = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${({ height }) => `${(height - 54) * onepxToRem}rem`};
  width: ${(400 - 62) * onepxToRem}rem;
  border: ${onepxToRem}rem solid #707070;
  border-radius: ${28 * onepxToRem}rem;
  padding: ${31 * onepxToRem}rem ${27 * onepxToRem}rem;
  font-size: ${20 * onepxToRem}rem;
`;

export const MessageLine = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 3px solid #eeeef0;
`;

export const MessageItem = styled.div<{ width: number }>`
  text-align: center;
  width: ${({ width }) => `calc(${width} * 3.9%)`};
`;

export const DisplayButton = styled.div`
  cursor: pointer;
  border: 1px solid #0077cc;
  background-color: #3d9de9;
  border-radius: ${4 * onepxToRem}rem;
  width: ${60 * onepxToRem}rem;
  height: ${40 * onepxToRem}rem;
  line-height: ${36 * onepxToRem}rem;
  text-align: center;
  font-size: ${40 * onepxToRem}rem;
  color: white;
  margin: ${30 * onepxToRem}rem auto 0 auto;
`;

export const Hr = styled.hr`
  border: none;
  background-color: #eeeef0;
  height: 2.5px;
`;

export const BlankImgStyle = {
  width: `${233.5 * onepxToRem}rem`,
  height: `${326.9 * onepxToRem}rem`,
};

export const ImgStyle = {
  ...BlankImgStyle,
  borderRadius: `${14 * onepxToRem}rem`,
  boxShadow: `0px 0px 99px 0px lightgrey`,
  cursor: 'pointer',
};
