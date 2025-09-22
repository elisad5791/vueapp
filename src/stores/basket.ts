import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useProductsStore } from './products';
import { useRouter } from 'vue-router';
import { BasketItem, Product, BasketStorage } from '@/types';

export const useBasketStore = defineStore('basket', () => {
  const basket = ref<BasketItem[]>([]);
  const { findProduct, findProductsByIds } = useProductsStore();
  const router = useRouter();

  function loadBasket(): void {
    const storage: string = window.localStorage.getItem('basket');

    basket.value = [];
    if (storage) {
      const data = JSON.parse(storage);
      const ids: number[] = Object.keys(data).map(item => parseInt(item));
      const basketProducts: Product[] = findProductsByIds(ids);
      basket.value = basketProducts.map((item: Product): BasketItem => ({ ...item, count: data[String(item.id)] }));
    }
  }

  function addProductToBasket(productId: number): void {
    const ind: number = basket.value.findIndex((val: Product): boolean => val.id == productId);

    if (ind == -1) {
      const product: Product = findProduct(productId);
      const newItem: BasketItem = Object.assign({ count: 1 }, product);
      basket.value = [...basket.value, newItem];
    } else {
      basket.value[ind]['count'] += 1;
    }

    updateLocalStorage();

    router.push('/basket');
  }

  function removeProductFromBasket(productId: number): void {
    basket.value = basket.value.filter((item: BasketItem): boolean => item.id != productId);
    updateLocalStorage();
  }

  function increaseCount(productId: number): void {
    const ind: number = basket.value.findIndex((val: BasketItem): boolean => val.id == productId);

    const count: number = basket.value[ind]['count'] + 1;
    basket.value[ind]['count'] = count;

    updateLocalStorage();
  }

  function decreaseCount(productId: number): void {
    const ind: number = basket.value.findIndex((val: BasketItem): boolean => val.id == productId);

    const initialCount: number = basket.value[ind]['count'];
    if (initialCount > 1) {
      basket.value[ind]['count'] -= 1;
    } else {
      removeProductFromBasket(productId);
    }

    updateLocalStorage();
  }

  function clearBasket(): void {
    basket.value = [];
    updateLocalStorage();
  }

  function updateLocalStorage(): void {
    const data: BasketStorage  = basket.value.reduce((acc: BasketStorage, item: BasketItem): BasketStorage => {
      acc[String(item.id)] = item.count;
      return acc;
    }, {});

    if (Object.keys(data).length > 0) {
      window.localStorage.setItem('basket', JSON.stringify(data));
    } else {
      window.localStorage.removeItem('basket');
    }
  }

  return { basket, loadBasket, addProductToBasket, removeProductFromBasket, increaseCount, decreaseCount, clearBasket };
});
