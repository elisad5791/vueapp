import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useProductsStore } from './products.js';
import { useRouter } from 'vue-router';

export const useBasketStore = defineStore('basket', function () {
  const basket = ref([]);
  const { findProduct, findProductsByIds } = useProductsStore();
  const router = useRouter();

  function loadBasket() {
    const storage = window.localStorage.getItem('basket');

    basket.value = [];
    if (storage) {
      const ids = storage.split(',').map((item) => parseInt(item));
      basket.value = findProductsByIds(ids);
    }
  }

  function addProductToBasket(productId) {
    const storage = window.localStorage.getItem('basket');
    const id = String(productId);

    if (!storage) {
      window.localStorage.setItem('basket', id);
    } else {
      const ids = storage.split(',').filter(item => item != id);
      ids.push(id);
      window.localStorage.setItem('basket', ids.join(','));
    }

    const data = basket.value.filter(item => item.id == productId);
    if (data.length == 0) {
      const product = findProduct(productId);
      basket.value.push(product);
    }

    router.push('/basket');
  }

  function removeProductFromBasket(productId) {
    const storage = window.localStorage.getItem('basket');
    const id = String(productId);
    const newIds = storage.split(',').filter((item) => item != id).join(',');
    if (newIds) {
      window.localStorage.setItem('basket', newIds);
    } else {
      window.localStorage.removeItem('basket');
    }

    basket.value = basket.value.filter(item => item.id != productId);
  }

  return { basket, loadBasket, addProductToBasket, removeProductFromBasket };
});