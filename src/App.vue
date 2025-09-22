<script setup lang="ts">
import Navigation from './components/Navigation.vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';
import { useProductsStore } from './stores/products';
import { useBasketStore } from './stores/basket';
import { storeToRefs } from 'pinia';
import { io, Socket } from 'socket.io-client';
import { Product } from '@/types';

onMounted(async (): Promise<void> => {
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

  const socket: Socket = io('ws://localhost:4000')
  socket.on('update-products', (payload: string) => {
    const newProducts: Product[] = JSON.parse(payload);
    products.value = newProducts;
  });
});
</script>

<template>
  <Navigation />
  <RouterView />
</template>

<style scoped></style>
