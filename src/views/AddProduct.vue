<script setup>
import NewProduct from '../components/NewProduct.vue';
import { products } from '../store.js';
import { useRouter } from 'vue-router';

const router = useRouter();

function saveProduct(data) {
  const product = {
    id: products.value.length,
    title: data.title,
    price: data.price,
    description: data.description,
    category: data.category,
    image: data.image,
    rating: {
      rate: data.rate,
      count: data.count,
    },
  };
  products.value.push(product);
  router.push('/');
}
</script>

<template>
  <div class="mt-8 max-w-[600px] mx-auto">
    <NewProduct @save="saveProduct"/>
  </div>
</template>

<style scoped>
</style>