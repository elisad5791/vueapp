<script setup>
import { useUserStore } from '../stores/user.js';
import { useRouter } from 'vue-router';
import { useBasketStore } from '../stores/basket.js';

const props = defineProps(['product']);
const router = useRouter();
const { addProductToBasket } = useBasketStore();
const { checkout } = useUserStore();

function addToBasket() {
  if (!checkout()) return;
  addProductToBasket(props.product.id);
}
</script>

<template>
  <div class="card bg-base-100 w-96 shadow-sm mx-auto" :data-cy-product="product.id">
    <figure>
      <RouterLink :to="'/product/'+product.id">
        <img class="w-full h-96 object-contain" :src="product.image" :alt="product.title" />
      </RouterLink>
    </figure>

    <div class="card-body flex-none">
      <h2 class="card-title">
        <RouterLink :to="'/product/'+product.id">{{ product.title }}</RouterLink>
        <div class="badge badge-secondary">{{ product.rating.rate }}</div>
      </h2>
      <p class="italic">{{ product.category }}</p>
      <p>
        {{ product.description }}
      </p>
      <div class="card-actions justify-end">
        <div class="badge badge-success">${{ product.price }}</div>
        <div class="badge badge-outline">{{ product.rating.count }} voices</div>
      </div>

      <div class="flex justify-center mt-4">
        <button type="button" class="btn btn-success" :data-cy-add="product.id" @click="addToBasket">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
