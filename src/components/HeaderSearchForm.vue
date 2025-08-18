<script setup>
import { ref } from 'vue';

const title = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);
const emits = defineEmits(['find']);

function findProducts() {
  const data = { title: title.value, min_price: minPrice.value, max_price: maxPrice.value };
  emits('find', data);
}
</script>

<template>
  <form @submit.prevent="findProducts" class="flex gap-2">
      <input type="text" class="input" v-model="title" placeholder="Название" />
      <input type="number" step="any" class="input w-24" v-model="minPrice" placeholder="Цена, от" />
      <input type="number" step="any" class="input w-24" v-model="maxPrice" placeholder="Цена, до" />
      <button class="btn">Найти</button>
  </form>
</template>

<style scoped></style>
