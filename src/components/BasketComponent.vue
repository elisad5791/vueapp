<script setup>
const props = defineProps(['products']);
const emits = defineEmits(['remove']);

function removeProduct(id) {
  emits('remove', id);
}
</script>

<template>
  <div class="overflow-x-auto mt-8">
    <table class="table max-w-[800px] mx-auto" v-if="products.length > 0">
      <thead>
        <tr>
          <th></th>
          <th>Название</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, key) in products" :key="product.id">
          <th>{{ key + 1 }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button type="button" class="btn btn-sm btn-error" @click="removeProduct(product.id)">
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
