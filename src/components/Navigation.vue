<script setup>
import { ref, watch } from 'vue';
import { username } from '../store.js';
import { useRouter } from 'vue-router';

const showLogin = ref(username.value == '');
const router = useRouter();

watch(() => username.value, function(newValue) {
  showLogin.value = newValue == '';
});

function logout() {
  window.localStorage.removeItem('username');
  username.value = '';
  router.push('/');
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl text-nowrap">Happy Shop</RouterLink>
    </div>

    <div>
      <ul class="menu menu-horizontal px-1 flex-wrap">
        <li><RouterLink to="/">Главная</RouterLink></li>
        <li><RouterLink to="/admin">Панель администрирования</RouterLink></li>
        <li><RouterLink to="/basket">Корзина</RouterLink></li>
        <li v-if="showLogin"><RouterLink to="/login">Войти</RouterLink></li>
        <li v-else>
          <button type="button" @click="logout">Выйти</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
