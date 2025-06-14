import axios from 'axios';
import { sha256 } from '../helpers';

export const newPriceNotify = async (productName: string, oldPrice: number, newPrice: number) => {
  const body = {
    productName,
    oldPrice,
    newPrice,
  };

  const bodyString = JSON.stringify(body);
  const computedHash = await sha256(bodyString);

  await axios.post(`${process.env.BOT_IP}/api/update-notification/new-price`, body, {
    headers: {
      computed: computedHash,
    },
  });
};

export const orderNotify = async (
  name: string,
  lastName: string,
  address: string,
  phone: string,
  delivery: string,
  price: number,
) => {
  const body = {
    name,
    lastName,
    address,
    phone,
    delivery,
    price,
  };

  const bodyString = JSON.stringify(body);
  const computedHash = await sha256(bodyString);

  await axios.post(`${process.env.BOT_IP}/api/order/`, body, {
    headers: {
      computed: computedHash,
    },
  });
};

export const oneClickOrderNotify = async (
  name: string,
  phone: string,
  productName: string,
  link: string,
) => {
  const body = {
    name,
    productName,
    link,
    phone,
  };

  const bodyString = JSON.stringify(body);
  const computedHash = await sha256(bodyString);

  await axios.post(`${process.env.BOT_IP}/api/order/one-сlick`, body, {
    headers: {
      computed: computedHash,
    },
  });
};

export const reviewNotify = async (
  id: number,
  username: string,
  rating: number,
  title: string,
  description: string,
) => {
  const body = {
    username,
    id,
    rating,
    title,
    description,
  };

  const bodyString = JSON.stringify(body);
  const computedHash = await sha256(bodyString);

  await axios.post(`${process.env.BOT_IP}/api/review/`, body, {
    headers: {
      computed: computedHash,
    },
  });
};

export const questionNotify = async (
  name: string,
  phone: string,
  question: string,
  link: string,
) => {
  const body = {
    name,
    phone,
    question,
    link,
  };

  const bodyString = JSON.stringify(body);
  const computedHash = await sha256(bodyString);

  await axios.post(`${process.env.BOT_IP}/api/question/`, body, {
    headers: {
      computed: computedHash,
    },
  });
};

export const notifyNewProduct = async (
  productName: string,
  productPrice: number,
  productLink: string,
) => {
  const body = {
    productName,
    productPrice,
    productLink,
  };

  const bodyString = JSON.stringify(body);
  const computedHash = await sha256(bodyString);

  await axios.post(`${process.env.BOT_IP}/bot/new-product`, body, {
    headers: {
      computed: computedHash,
    },
  });
};
