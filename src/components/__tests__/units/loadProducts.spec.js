import { it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductsStore } from '../../../stores/products.js';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { dataFromApi } from '../../../data.js';

vi.mock('vue-router', () => ({ useRouter: vi.fn() }));

vi.mock('axios', () => ({ default: { create: vi.fn() } }));

vi.mock('../../../data.js', () => ({
  dataFromApi: [
    { id: 1, name: 'Fallback Product 1', price: 10 },
    { id: 2, name: 'Fallback Product 2', price: 20 }
  ]
}));

const mockApiProducts = [
  { id: 1, title: 'API Product 1', price: 100 },
  { id: 2, title: 'API Product 2', price: 200 }
];

let productsStore;
const mockRouter = { push: vi.fn() };
const mockApiInstance = { get: vi.fn() };

beforeEach(() => {
  vi.mocked(useRouter).mockReturnValue(mockRouter);
  vi.mocked(axios.create).mockReturnValue(mockApiInstance);

  const pinia = createPinia();
  setActivePinia(pinia);

  productsStore = useProductsStore();

  vi.clearAllMocks();
});

it('load products from api', async function () {
  mockApiInstance.get.mockResolvedValue({ data: mockApiProducts });

  await productsStore.loadProducts();

  expect(axios.create).toHaveBeenCalledWith({ baseURL: 'https://fakestoreapi.com' });
  expect(mockApiInstance.get).toHaveBeenCalledWith('/products');
});

it('updates store', async function () {
  mockApiInstance.get.mockResolvedValue({ data: mockApiProducts });

  await productsStore.loadProducts();

  expect(productsStore.products).toEqual(mockApiProducts);
});

it('uses fallback data for api error', async () => {
  const error = new Error('Network error');
  mockApiInstance.get.mockRejectedValue(error);

  await productsStore.loadProducts();

  expect(mockApiInstance.get).toHaveBeenCalledWith('/products');
  expect(productsStore.products).toEqual(dataFromApi);
});

