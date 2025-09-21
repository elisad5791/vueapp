<script setup lang="ts">
import ProductItem from './ProductItem.vue';
import type { Product } from '@/types';

interface Props {
  products: Product[];
}
const props = defineProps<Props>();
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mt-4 text-center">Товары</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-12 md:max-w-200 xl:max-w-300 mx-auto">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style scoped></style>
