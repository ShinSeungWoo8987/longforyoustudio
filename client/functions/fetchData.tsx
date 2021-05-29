import axios from 'axios';
import { Information, NoticeProps } from '../next-env';

export const getData = async () => {
  let information = {};

  await axios
    .get(process.env.NEXT_PUBLIC_API_URL + `/information`)
    .then((res) => {
      res.data.map((info: Information) => {
        information[`${info.Inf_type}`] = info.Inf_content;
      });
    })
    .catch((err) => {
      console.log(`Information 데이터 불러오기 실패`);
    });

  await axios
    .get(process.env.NEXT_PUBLIC_API_URL + `/product`)
    .then((res) => {
      information[`productList`] = res.data;
    })
    .catch((err) => {
      console.log(`Product 데이터 불러오기 실패`);
    });

  return information;
};

export const fetchData = async () => {
  const keys = ['procedure1', 'procedure2', 'procedure3', 'product', 'request', 'productList'];
  let data = {};

  keys.forEach((key) => {
    data[`${key}`] = sessionStorage.getItem(key);
  });

  // 데이터가 없는게 있으면 다시 불러와주기.
  if (Object.values(data).indexOf(null) === -1) data = await getData();

  return data;
};
