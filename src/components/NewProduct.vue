<script setup lang="ts">
import { ref } from 'vue';
import { useProductsStore } from '../stores/products';
import { ProductFormData } from '@/types';

const title = ref<string>('');
const description = ref<string>('');
const category = ref<string>('');
const image = ref<string>('');
const price = ref<number|null>(null);
const rate = ref<number|null>(null);
const count = ref<number|null>(null);

const { addProduct } = useProductsStore();

function saveProduct(): void {
  const data: ProductFormData = {  
    title: title.value,
    description: description.value,
    price: price.value,
    category: category.value,
    image: image.value,
    rate: rate.value,
    count: count.value
  };

  title.value = '';
  description.value = '';
  category.value = '';
  image.value = '';
  price.value = null;
  rate.value = null;
  count.value = null;
  
  addProduct(data);
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">Создать новый товар</h2>

    <form @submit.prevent="saveProduct">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <label class="label">Название</label>
        <input type="text" class="input w-full" v-model="title" required />

        <label class="label">Описание</label>
        <textarea class="textarea w-full" v-model="description" required></textarea>

        <label class="label">Цена</label>
        <input type="number" class="input w-full" step="any" min="0" v-model="price" required />
        
        <label class="label">Категория</label>
        <input type="text" class="input w-full" v-model="category" required />

        <label class="label">Изображение (url)</label>
        <input type="url" class="input w-full" v-model="image" required />

        <label class="label">Рейтинг</label>
        <input type="number" class="input w-full" step="any" min="0" v-model="rate" required />

        <label class="label">Количество голосов</label>
        <input type="number" class="input w-full" step="1" min="0" v-model="count" required />
        
        <div class="flex justify-center mt-4">
          <button class="btn">Создать</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped></style>
