import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Message } from '../../next-env';
import { setupAxiosInterceptors } from '../../functions/AuthenticationService';
import { DisplayButton, onepxToRem, Title } from '../../styles/globals';
import MessageContent from './MessageContent';

const MessageSreen: React.FC = () => {
  setupAxiosInterceptors();

  const [open, setOpen] = useState(false);

  const [cnt, setCnt] = useState<number>();
  const [message, setMessage] = useState<Message[]>();

  const [messageBox, setMessageBox] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMessageCnt = async () => await axios.get(process.env.NEXT_PUBLIC_API_URL + `/messageCnt`);
  const fetchMessage = async (num: number) => await axios.get(process.env.NEXT_PUBLIC_API_URL + `/message/${num}`);

  useEffect(() => {
    fetchMessageCnt()
      .then((res) => setCnt(res.data))
      .catch((err) => console.log(err));
    fetchMessage(page)
      .then((res) => setMessage(res.data))
      .catch((err) => console.log(err));
  }, [page]);

  const hadlePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setPage(Number(e.currentTarget.innerText));
  };

  console.log(message);
  const messageContent = message?.map((c) => (
    <MessageContent
      key={c.Mes_id}
      sendDate={c.Mes_date}
      name={c.Mes_name}
      phone={c.Mes_phone}
      description={c.Mes_content}
      hopeDate={c.mes_hopedate}
      product={c.pro_title}
      messageBox={messageBox}
    />
  ));

  let _paging = [];
  for (var i = 1; i <= Math.floor(cnt / 20 + 1); i++) {
    _paging.push(
      <a key={i} href={i.toString()} onClick={hadlePage}>
        {page === i ? <b>{i}</b> : i}
      </a>
    );
  }

  return (
    <Wrapper>
      <Title style={{ marginBottom: '2rem' }}>Message</Title>

      {open && (
        <>
          <MessageList>
            {message?.map((mes) => (
              <MessageContent
                key={mes.Mes_id}
                sendDate={mes.Mes_date}
                name={mes.Mes_name}
                phone={mes.Mes_phone}
                description={mes.Mes_content}
                hopeDate={mes.mes_hopedate}
                product={mes.pro_title}
                messageBox={messageBox}
              />
            ))}
          </MessageList>

          <Page>{_paging}</Page>
        </>
      )}
      <DisplayButton onClick={() => setOpen(!open)}>{open ? '∧' : '∨'}</DisplayButton>
    </Wrapper>
  );
};

export default MessageSreen;

const Wrapper = styled.div`
  text-align: center;
  width: 86%;
  margin: 0 auto;
  padding-bottom: ${10 * onepxToRem}rem;
`;

const MessageList = styled.div`
  min-height: ${570 * onepxToRem}rem;
`;

const Page = styled.div``;
