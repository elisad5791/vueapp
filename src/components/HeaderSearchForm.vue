<script setup>
import { ref } from 'vue';

const title = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);
const emits = defineEmits(['find', 'reset']);

function findProducts() {
  const data = { title: title.value, min_price: minPrice.value, max_price: maxPrice.value };
  emits('find', data);
}

function resetProducts() {
  title.value = '';
  minPrice.value = null;
  maxPrice.value = null;
  emits('reset');
}
</script>

<template>
  <form @submit.prevent="findProducts" class="flex flex-wrap justify-center gap-2 w-full px-2">
      <input type="text" class="input" v-model="title" data-cy-search-title placeholder="Название" />
      <input type="number" step="any" class="input w-24" data-cy-min-price v-model="minPrice" placeholder="Цена, от" />
      <input type="number" step="any" class="input w-24" data-cy-max-price v-model="maxPrice" placeholder="Цена, до" />
      <button class="btn" data-cy-search-button >Найти</button>
      <button type="button" class="btn" data-cy-search-reset @click="resetProducts">Сбросить</button>
  </form>
</template>

<style scoped></style>
