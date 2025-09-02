<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Product from '../components/Product.vue';
import { useProductsStore } from '../stores/products.js';

const route = useRoute();
const productId = route.params.id;
const { findProduct } = useProductsStore();

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

const productData = findProduct(productId);
if (productData) {
  product.value = productData;
}
</script>

<template>
  <Product :product="product" />
</template>

<style scoped>
</style>