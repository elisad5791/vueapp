<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { username } from '../store.js';

const router = useRouter();

const name = ref('');
const showError = ref(false);

function login() {
  if (name.value.length > 0) {
    window.localStorage.setItem('username', name.value);
    username.value = name;
    router.push('/');
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
    <span>Введите имя</span>
  </div>

  <form class="max-w-[400px] mx-auto mt-4" @submit.prevent="login">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Ваше имя</legend>
      <input type="text" class="input" v-model="name" />
      <div class="mt-2">
        <button class="btn btn-success">Войти</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped></style>
