import axios from 'axios';
import { dataFromApi } from '../data.js';

export async function useFakestoreapi() {
  const api = axios.create({ baseURL: 'https://fakestoreapi.com' });

  let fetchedProducts;
  try {
    const response = await api.get('/products');
    fetchedProducts =  response.data;
  } catch (error) {
    fetchedProducts = [];
  }

  if (fetchedProducts.length == 0) {
    fetchedProducts = dataFromApi;
  }

  return fetchedProducts;
}