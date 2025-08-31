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
  <div class="card bg-base-100 w-96 shadow-sm mx-auto">
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
        <button type="button" class="btn btn-success" @click="addToBasket">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
