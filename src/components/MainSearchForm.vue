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
  <div>
    <h2 class="text-2xl font-bold mb-2">Поиск товаров</h2>

    <form @submit.prevent="findProducts">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <label class="label">Название</label>
        <input type="text" class="input" v-model="title" />
        
        <label class="label">Цена</label>
        <div class="flex gap-2">
          От
          <input type="number" step="any" class="input" v-model="minPrice" />
          До
          <input type="number" step="any" class="input" v-model="maxPrice" />
        </div>
        
        <div class="flex justify-center mt-4">
          <button class="btn">Найти</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped></style>
