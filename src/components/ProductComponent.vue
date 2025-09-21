<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useBasketStore } from '../stores/basket';
import { Product } from '@/types';

interface Props {
  product: Product;
}
const props = defineProps<Props>();

const { addProductToBasket } = useBasketStore();
const { checkout } = useUserStore();

function addToBasket(): void {
  if (!checkout()) return;
  addProductToBasket(props.product.id);
}
</script>

<template>
  <div class="hero bg-white mt-10">
    <div class="hero-content flex-col lg:flex-row">
      <img :src="product.image" class="max-w-sm rounded-lg" />

      <div class="ms-4">
        <h1 class="text-5xl font-bold">{{ product.title }}</h1>
        <div class="font-bold text-2xl">{{ product.category }}</div>
        <div class="badge badge-success">${{ product.price }}</div>
        <p class="py-6">{{ product.description }}</p>

        <div class="py-6">
          <div class="badge badge-secondary">{{ product.rating.rate }}</div>
          <div class="badge badge-outline ms-4">{{ product.rating.count }} голосов</div>
        </div>

        <div class="flex justify-center mt-4">
          <button type="button" class="btn btn-success" @click="addToBasket">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
