<script setup>
const props = defineProps(["product"]);
</script>

<template>
  <div class="card bg-base-100 w-96 shadow-sm mx-auto">
    <figure>
      <img class="w-full h-96 object-contain" :src="product.image" :alt="product.title" />
    </figure>
    <div class="card-body flex-none">
      <h2 class="card-title">
        {{ product.title }}
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
    </div>
  </div>
</template>

<style scoped></style>
