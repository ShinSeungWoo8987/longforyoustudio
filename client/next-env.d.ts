export type Image = {
  Ima_id: number;
  Ima_type: string;
  Ima_thumbnail: boolean;
  Ima_groupid: number;
  Ima_content: string;
};

export type Information = {
  Inf_type: string;
  Inf_content: string;
};

export type NoticeProps = {
  procedure1: string;
  procedure2: string;
  procedure3: string;
  product: string;
  request: string;
  productList: Product[];
};

export type Product = {
  pro_id: number;
  pro_title: string;
  pro_content: string;
};

export type Message = {
  Mes_id: number;
  Mes_date: string;
  Mes_name: string;
  Mes_phone: string;
  Mes_content: string;
  mes_hopedate: string;
  pro_title: string;
};
