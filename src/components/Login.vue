<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.js';

const router = useRouter();
const { login } = useUserStore();

const name = ref('');
const email = ref('');
const password = ref('');
const showError = ref(false);

function enter() {
  if (name.value.length > 0 && email.value.length > 0 && password.value.length > 0) {
    login(name.value, email.value, password.value);
  } else {
    showError.value = true;
  }
}
</script>

<template>
  <div role="alert" class="alert alert-error max-w-[400px] mx-auto mt-4" v-show="showError">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Введите имя, email, пароль</span>
  </div>

  <form class="max-w-[400px] mx-auto mt-4" @submit.prevent="enter">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Имя</legend>
      <input type="text" class="input" data-cy-name v-model.trim="name" />

      <legend class="fieldset-legend">Email</legend>
      <input type="email" class="input" data-cy-email v-model.trim="email" />

      <legend class="fieldset-legend">Пароль</legend>
      <input type="password" class="input" data-cy-password v-model.trim="password" />

      <div class="mt-2">
        <button class="btn btn-success" data-cy-submit>Войти</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped></style>
