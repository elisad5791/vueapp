<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { Product, Order } from '@/types';

const props = defineProps<{
  product_data: Product
}>();

const orderCreated = ref<boolean>(false);
const orderError = ref<boolean>(false);

const agreement = ref<boolean>(true);
const delivery = ref<'1'|'2'>('1');

const showAddress = computed<boolean>(function() {
  return delivery.value == '2';
});

const schema = yup.object().shape({
  choice: yup.number().required().positive().integer(),
  count: yup.number().required().positive().integer(),

  name: yup.string().min(3).required(),
  phone: yup.string().required().matches(/[0-9\+\(\)\-]+/),
  email: yup.string().required().email(),

  card_number: yup.string().required().matches(/[0-9]{16}/),
  card_term: yup.string().required().matches(/[0-9]{2}\/[0-9]{4}/),
  card_cvv: yup.string().required().matches(/[0-9]{3}/),

  delivery: yup.string().required().oneOf(['1', '2']),
  country: yup.number().oneOf([1, 2])
    .when('delivery', {
      is: '2', 
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  city: yup.string().min(3)
    .when('delivery', {
      is: '2', 
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  street: yup.string().min(3)
    .when('delivery', {
      is: '2', 
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
  house: yup.string()
    .when('delivery', {
      is: '2', 
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),

  agreement: yup.boolean().required().oneOf([true]),
});

const api = axios.create({ baseURL: 'https://httpbin.org' });

async function saveOrder(values: Order): Promise<void> {
  console.log(values);
  try {
    await api.post('/post', values);
    orderCreated.value = true;
  } catch (error) {
    console.error('Ошибка создания заказа: ', error);
    orderError.value = true;
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">Создать заказ</h2>

    <Form @submit="saveOrder" :validation-schema="schema">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">Товар</legend>

        <fieldset class="fieldset">
          <label class="label">Выберите товар</label>
          <Field class="select w-full" name="choice" as="select">
            <option v-for="product in product_data" :value="product.id" :key="product.id">{{ product.title }}</option>
          </Field>
          <ErrorMessage name="choice" class="text-red-500" />
        </fieldset>

        <label class="label">Количество</label>
        <Field type="number" class="input w-full" step="1" min="1" name="count" />
        <ErrorMessage name="count" class="text-red-500" />
      </fieldset>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">Контактная информация</legend>

        <label class="label">Имя</label>
        <Field type="text" class="input w-full" name="name" />
        <ErrorMessage name="name" class="text-red-500" />

        <label class="label">Телефон</label>
        <Field type="text" class="input w-full" name="phone" />
        <ErrorMessage name="phone" class="text-red-500" />

        <label class="label">Email</label>
        <Field type="email" class="input w-full" name="email" />
        <ErrorMessage name="email" class="text-red-500" />
      </fieldset>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">Карта</legend>

        <label class="label">Номер</label>
        <Field type="text" class="input w-full" name="card_number" />
        <ErrorMessage name="card_number" class="text-red-500" />

        <label class="label">Срок действия</label>
        <Field type="text" class="input w-full" name="card_term" />
        <ErrorMessage name="card_term" class="text-red-500" />

        <label class="label">cvv</label>
        <Field type="text" class="input w-full" name="card_cvv" /> 
        <ErrorMessage name="card_cvv" class="text-red-500" /> 
      </fieldset>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">Доставка</legend>

        <div class="flex gap-2">
          <Field type="radio" value="1" class="radio" name="delivery" v-model="delivery" />
          Самовывоз
          <Field type="radio" value="2" class="radio" name="delivery" v-model="delivery" />
          Доставить по адресу
          <ErrorMessage name="delivery" class="text-red-500" />
        </div>

        <fieldset v-show="showAddress" class="fieldset">
          <fieldset class="fieldset">
            <label class="label">Страна</label>
            <Field class="select w-full" as="select" name="country">
              <option value="1">Россия</option>
              <option vlaue="2">Беларусь</option>
            </Field>
            <ErrorMessage name="country" class="text-red-500" />
          </fieldset>

          <label class="label">Город</label>
          <Field type="text" class="input w-full" name="city" />
          <ErrorMessage name="city" class="text-red-500" />

          <label class="label">Улица</label>
          <Field type="text" class="input w-full" name="street" />
          <ErrorMessage name="street" class="text-red-500" />

          <label class="label">Номер дома</label>
          <Field type="text" class="input w-full" name="house" />
          <ErrorMessage name="house" class="text-red-500" />
        </fieldset>
      </fieldset>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mt-2">
        <label class="label">
          <Field type="checkbox" class="checkbox" :value="true" name="agreement" v-model="agreement" />
          Даю согласие на обработку моих данных
        </label>
        <ErrorMessage name="agreement" class="text-red-500" />
        
        <div class="flex justify-center mt-4">
          <button class="btn">Создать заказ</button>
        </div>
      </fieldset>
    </Form>

    <div role="alert" class="alert alert-success mt-2" v-show="orderCreated">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Заказ успешно создан</span>
    </div>

    <div role="alert" class="alert alert-error mt-2" v-show="orderError">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Ошибка создания заказа</span>
    </div>
  </div>
</template>

<style scoped></style>