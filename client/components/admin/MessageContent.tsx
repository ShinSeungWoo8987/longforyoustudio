import React, { useState } from 'react';
import { isSameDay } from 'date-fns';
import { MessageItem, MessageLine, onepxToRem } from '../../styles/globals';
import styled from 'styled-components';

interface MessageContentProps {
  sendDate: string;
  name: string;
  phone: string;
  description: string;
  hopeDate: string;
  product: string;
  messageBox: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({
  sendDate,
  name,
  phone,
  description,
  hopeDate,
  product,
  messageBox,
}) => {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <Wrapper border={display} onClick={() => setDisplay(!display)}>
        <MessageItem width={3}>{name}</MessageItem>
        <MessageItem width={6}>{phone}</MessageItem>
        <MessageItem width={5}>{sendDate}</MessageItem>
        <MessageItem width={4}>{product ? product : '미정'}</MessageItem>
        <MessageItem width={5}>{hopeDate === '9999-12-31 00:00:00' ? '미정' : hopeDate}</MessageItem>
      </Wrapper>

      <Content display={display ? 'block' : 'none'}>{description}</Content>

      {display && <Hr />}
    </>
  );
};

export default MessageContent;

const Wrapper = styled(MessageLine)<{ border: boolean }>`
  cursor: pointer;
  border-bottom: ${({ border }) => (border ? 'none' : `${onepxToRem}px solid lightgrey`)};
`;

const Content = styled.div<{ display: string }>`
  text-align: left;
  background-color: #d2e1ff;
  min-height: ${100 * onepxToRem}rem;
  margin: ${10 * onepxToRem}rem ${42 * onepxToRem}rem ${20 * onepxToRem}rem ${42 * onepxToRem}rem;
  padding: ${20 * onepxToRem}rem ${30 * onepxToRem}rem;

  border-radius: ${20 * onepxToRem}rem;

  display: ${({ display }) => display};
`;

const Hr = styled.div`
  border-bottom: ${onepxToRem}rem solid lightgrey;
`;
