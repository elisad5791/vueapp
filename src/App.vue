<script setup>
import Navigation from './components/Navigation.vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores/user.js';
import { useProductsStore } from './stores/products.js';
import { useBasketStore } from './stores/basket.js';
import { storeToRefs } from 'pinia';

onMounted(async function() {
  const userStore = useUserStore()
  const { loadUser } = userStore;
  const { user } = storeToRefs(userStore);
  loadUser();

  const productsStore = useProductsStore();
  const { products } = storeToRefs(productsStore);
  const { loadProducts } = productsStore;
  await loadProducts();

  if (user.value.auth) {
    const { loadBasket } = useBasketStore();
    loadBasket();
  }
});
</script>

<template>
  <Navigation />
  <RouterView />
</template>

<style scoped></style>
