<script setup>
import HeaderSearchForm from '../components/HeaderSearchForm.vue';
import ProductList from '../components/ProductList.vue';
import { ref, onMounted, watch } from 'vue';
import { products } from '../store.js';

const filteredProducts = ref([]);

onMounted(async function () {
  filteredProducts.value = products.value;
});

watch(() => products.value, function(newValue) {
  filteredProducts.value = newValue;
});

function searchProducts(data) {
  const title = data.title ?? "";
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
