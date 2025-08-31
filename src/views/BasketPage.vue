<script setup>
import { ref, onMounted } from 'vue';
import { products } from '../store.js';
import BasketComponent from '../components/BasketComponent.vue';

const productIds = ref([]);
const items = ref([]);

onMounted(async function () {
  const ids = window.localStorage.getItem('basket');

  if (ids) {
    const idsArray = ids.split(',').map((item) => parseInt(item));
    const fetchedProducts = products.value;
    items.value = fetchedProducts.filter((item) => idsArray.includes(item.id));
  }
});

function removeProduct(id) {
  const ids = window.localStorage.getItem('basket');
  const productId = String(id);
  const newIds = ids.split(',').filter((item) => item != productId).join(',');
  if (newIds) {
    window.localStorage.setItem('basket', newIds);
  } else {
    window.localStorage.removeItem('basket');
  }
  items.value = items.value.filter((item) => item.id != id);
}
</script>

<template>
  <BasketComponent :products="items" @remove="removeProduct" />
</template>

<style scoped></style>
