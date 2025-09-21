<script setup lang="ts">
import HeaderSearchForm from '../components/HeaderSearchForm.vue';
import ProductList from '../components/ProductList.vue';
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products';
import { useRouter } from 'vue-router';
import { Product, FilterData } from '@/types';

const router = useRouter();
const { products } = storeToRefs(useProductsStore());
const filteredProducts = ref<Product[]>([]);
filteredProducts.value = products.value;

watch(products, function(newValue: Product[]): void {
  filteredProducts.value = newValue;
  router.push('/');
});

function searchProducts(data: FilterData): void {
  const title = data.title ?? '';
  const minPrice = data.min_price ?? 0;
  const maxPrice = data.max_price ?? 0;
  let newProducts = products.value;

  if (title) {
    newProducts = newProducts.filter(function (item: Product): boolean {
      return item.title.toLowerCase().includes(title.toLowerCase());
    });
  }
  if (minPrice) {
    newProducts = newProducts.filter(function (item: Product): boolean {
      return item.price >= minPrice;
    });
  }
  if (maxPrice) {
    newProducts = newProducts.filter(function (item: Product): boolean {
      return item.price <= maxPrice;
    });
  }
  filteredProducts.value = newProducts;
}

function resetProducts(): void {
  filteredProducts.value = products.value;
}
</script>

<template>
  <header class="mt-4 flex justify-center">
    <HeaderSearchForm @find="searchProducts" @reset="resetProducts" />
  </header>

  <main>
    <ProductList :products="filteredProducts" />
  </main>
</template>

<style scoped></style>
