<script setup>
import HeaderSearchForm from '../components/HeaderSearchForm.vue';
import ProductList from '../components/ProductList.vue';
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const { products } = storeToRefs(useProductsStore());
const filteredProducts = ref([]);
filteredProducts.value = products.value;

watch(products, (newValue) => {
  filteredProducts.value = newValue;
  router.push('/');
});

function searchProducts(data) {
  const title = data.title ?? '';
  const minPrice = data.min_price ?? 0;
  const maxPrice = data.max_price ?? 0;
  let newProducts = products.value;

  if (title) {
    newProducts = newProducts.filter(function (item) {
      return item.title.toLowerCase().includes(title.toLowerCase());
    });
  }
  if (minPrice) {
    newProducts = newProducts.filter(function (item) {
      return item.price >= minPrice;
    });
  }
  if (maxPrice) {
    newProducts = newProducts.filter(function (item) {
      return item.price <= maxPrice;
    });
  }
  filteredProducts.value = newProducts;
}

function resetProducts() {
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
