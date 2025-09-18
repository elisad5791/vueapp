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
      const data = JSON.parse(storage);
      const ids = Object.keys(data).map(item => parseInt(item));
      const basketProducts = findProductsByIds(ids);
      basket.value = basketProducts.map(function(item) {
        const newItem = item;
        newItem['count'] = data[String(item.id)];
        return newItem;
      });
    }
  }

  function addProductToBasket(productId) {
    const ind = basket.value.findIndex(function(val) {
      return val.id == productId;
    });

    if (ind == -1) {
      const product = findProduct(productId);
      product['count'] = 1;
      basket.value.push(product);
    } else {
      basket.value[ind]['count'] += 1;
    }

    updateLocalStorage();

    router.push('/basket');
  }

  function removeProductFromBasket(productId) {
    basket.value = basket.value.filter(item => item.id != productId);
    updateLocalStorage();
  }

  function increaseCount(productId) {
    const ind = basket.value.findIndex(function(val) {
      return val.id == productId;
    });

    const count = basket.value[ind]['count'] + 1;
    basket.value[ind]['count'] = count;

    updateLocalStorage();
  }

  function decreaseCount(productId) {
    const ind = basket.value.findIndex(function(val) {
      return val.id == productId;
    });

    const initialCount = basket.value[ind]['count'];
    if (initialCount > 1) {
      basket.value[ind]['count'] -= 1;
    } else {
      removeProductFromBasket(productId);
    }

    updateLocalStorage();
  }

  function clearBasket() {
    basket.value = [];
    updateLocalStorage();
  }

  function updateLocalStorage() {
    const data = basket.value.reduce(function(acc, item) {
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