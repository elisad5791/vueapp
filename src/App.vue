<script setup>
import Navigation from './components/Navigation.vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores/user.js';
import { useProductsStore } from './stores/products.js';
import { useBasketStore } from './stores/basket.js';
import { storeToRefs } from 'pinia';
import { io } from 'socket.io-client';

onMounted(async function() {
  const userStore = useUserStore()
  const { loadUser } = userStore;
  const { user } = storeToRefs(userStore);
  loadUser();

  const productsStore = useProductsStore();
  const { products } = storeToRefs(productsStore);
  const { loadProducts } = productsStore;
  await loadProducts();

  if (user.value.isLoggedIn) {
    const { loadBasket } = useBasketStore();
    loadBasket();
  }

  const socket = io('ws://localhost:4000')
  socket.on('update-products', (payload) => {
    const newProducts = JSON.parse(payload);
    products.value = newProducts;
  });
});
</script>

<template>
  <Navigation />
  <RouterView />
</template>

<style scoped></style>
