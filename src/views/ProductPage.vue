<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductComponent from '../components/ProductComponent.vue';
import { useProductsStore } from '../stores/products';
import { Product } from '@/types';

const route = useRoute();
const productId = ref<string>(route.params.id);
const { findProduct } = useProductsStore();

const product = ref<Product>({
  id: 0,
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  rating: {
    rate: 0,
    count: 0
  }
});

const productData = findProduct(Number(productId.value));
if (productData) {
  product.value = productData;
}
</script>

<template>
  <ProductComponent :product="product" />
</template>

<style scoped>
</style>