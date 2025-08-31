<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { products } from '../store.js';
import Product from '../components/ProductComponent.vue';

const route = useRoute();
const productId = route.params.id;

const product = ref({
  title: '',
  price: 0,
  description: '',
  category: '',
  rating: {
    rate: 0,
    count: 0
  }
});

onMounted(async function () {
  product.value = products.value.filter(item => item.id == productId)[0];
});
</script>

<template>
  <Product :product="product" />
</template>

<style scoped>
</style>