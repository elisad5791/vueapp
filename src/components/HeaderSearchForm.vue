<script setup lang="ts">
import { ref } from 'vue';
import { FilterData } from '@/types';

const title = ref<string>('');
const minPrice = ref<number|null>(null);
const maxPrice = ref<number|null>(null);

const emits = defineEmits<{
  (e: 'find', data: FilterData): void;
  (e: 'reset'): void;
}>();

function findProducts(): void {
  const data: FilterData = { title: title.value, min_price: minPrice.value, max_price: maxPrice.value };
  emits('find', data);
}

function resetProducts(): void {
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
