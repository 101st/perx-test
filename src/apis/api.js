import axios from 'axios';

export const getCars = async (page = 1, per_page = 10) => {
  try {
    return axios.get(
      `https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&group=new&page=${page}&per_page=${per_page}`
      , {
        headers: {
          'X-CS-Dealer-Id-Only': '*',
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    throw error;
  }
};

export const getDealer = async (id) => {
  try {
    return axios.get(
      `https://jlrc.dev.perx.ru/carstock/api/v1/dealers/${id}`
      , {
        headers: {
          'X-CS-Dealer-Id-Only': '*',
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    throw error;
  }
};