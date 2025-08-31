<script setup>
import Navigation from './components/Navigation.vue';
import { onMounted } from 'vue';
import { username, products } from './store.js';
import { useFakestoreapi } from './hooks/useFakestoreapi.js';


onMounted(async function() {
  const name = window.localStorage.getItem('username');
  if (name) {
    username.value = name;
  }

  products.value = await useFakestoreapi();
});
</script>

<template>
  <Navigation />
  <RouterView />
</template>

<style scoped></style>
