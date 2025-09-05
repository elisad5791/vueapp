import { it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBasketStore } from '../../../stores/basket.js';
import { useProductsStore } from '../../../stores/products.js';
import { useRouter } from 'vue-router';

vi.mock('../../../stores/products.js', () => ({ useProductsStore: vi.fn() }));
vi.mock('vue-router', () => ({ useRouter: vi.fn() }));

const mockRouter = { push: vi.fn() };
const productsStore = {
  findProduct: vi.fn(),
  findProductsByIds: vi.fn()
};
const mockProduct = { id: 1, name: 'Test Product', price: 100 };
const existingProduct = { id: 1, name: 'Test Product', price: 100, count: 2 };

let basketStore;

beforeEach(function () {
  const pinia = createPinia();
  setActivePinia(pinia);

  vi.mocked(useRouter).mockReturnValue(mockRouter);
  vi.mocked(useProductsStore).mockReturnValue(productsStore);

  basketStore = useBasketStore();

  vi.clearAllMocks();
  localStorage.clear();
});

it('adds new product to basket', function () {
  productsStore.findProduct.mockReturnValue(mockProduct);

  basketStore.addProductToBasket(1);

  expect(basketStore.basket).toHaveLength(1);
  expect(basketStore.basket[0]).toEqual({ ...mockProduct, count: 1 });
  expect(productsStore.findProduct).toHaveBeenCalledWith(1);
  expect(mockRouter.push).toHaveBeenCalledWith('/basket');
});

it('increases count for existing product', function () {
  basketStore.basket = [existingProduct];

  basketStore.addProductToBasket(1);

  expect(basketStore.basket).toHaveLength(1);
  expect(basketStore.basket[0].count).toBe(3);
  expect(productsStore.findProduct).not.toHaveBeenCalled();
  expect(mockRouter.push).toHaveBeenCalledWith('/basket');
});

it('updates localStorage', () => {
  productsStore.findProduct.mockReturnValue(mockProduct);
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  basketStore.addProductToBasket(1);

  expect(setItemSpy).toHaveBeenCalledWith('basket', JSON.stringify({ '1': 1 }));
});