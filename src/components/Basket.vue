<script setup>
import { useBasketStore } from '../stores/basket.js';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const basketStore = useBasketStore()
const { removeProductFromBasket } = basketStore;
const { basket } = storeToRefs(basketStore);

const items = ref(basket.value);

watch(
  () => basket.value, 
  newValue => {
    items.value = newValue;
  }
);
</script>

<template>
  <div class="overflow-x-auto mt-8">
    <table class="table max-w-[800px] mx-auto" v-if="items.length > 0">
      <thead>
        <tr>
          <th></th>
          <th>Название</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, key) in items" :key="product.id">
          <th>{{ key + 1 }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button type="button" class="btn btn-sm btn-error" @click="removeProductFromBasket(product.id)">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="max-w-[800px] mx-auto">В корзине нет товаров</div>
  </div>
</template>

<style scoped></style>
