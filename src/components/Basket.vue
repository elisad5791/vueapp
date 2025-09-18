<script setup>
import { useBasketStore } from '../stores/basket.js';
import { storeToRefs } from 'pinia';
import { ref, watch, computed } from 'vue';

const basketStore = useBasketStore()
const { removeProductFromBasket, increaseCount, decreaseCount, clearBasket } = basketStore;
const { basket } = storeToRefs(basketStore);

const items = ref(basket.value);

watch(
  () => basket.value, 
  newValue => {
    items.value = newValue;
  }
);

const total = computed(function() {
  return items.value.reduce((acc, item) => acc + item.price * item.count, 0).toFixed(2);
});
</script>

<template>
  <div class="overflow-x-auto mt-8">
    <table class="table max-w-[1000px] mx-auto" v-if="items.length > 0">
      <thead>
        <tr>
          <th></th>
          <th>Название</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Сумма</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, key) in items" :key="product.id">
          <th>{{ key + 1 }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.count }}</td>
          <td>{{ product.price * product.count }}</td>
          <td class="flex gap-1">
            <button type="button" class="btn btn-sm btn-info text-xl" :data-cy-increase="product.id" @click="increaseCount(product.id)">+</button>
            <button type="button" class="btn btn-sm btn-info text-xl" :data-cy-decrease="product.id" @click="decreaseCount(product.id)">-</button>
            <button type="button" class="btn btn-sm btn-error" :data-cy-delete="product.id" @click="removeProductFromBasket(product.id)">
              Удалить
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="6" class="font-bold">Полная сумма: {{ total }} руб.</td>
        </tr>
        <tr>
          <td colspan="6">
            <button class="btn" @click="clearBasket">Очистить корзину</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="max-w-[1000px] mx-auto">В корзине нет товаров</div>
  </div>
</template>

<style scoped></style>
