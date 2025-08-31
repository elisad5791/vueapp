<script setup>
import { username } from '../store.js';
import { useRouter } from 'vue-router';

const props = defineProps(['product']);
const router = useRouter();

function addToBasket() {
  if (username.value == '') {
    router.push('/login');
  }
  
  const basket = window.localStorage.getItem('basket');
  const id = String(props.product.id);

  if (!basket) {
    window.localStorage.setItem('basket', id);
    return;
  }

  const ids = basket.split(',').filter(item => item != id);
  ids.push(id);
  window.localStorage.setItem('basket', ids.join(','));
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
