<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '../stores/user.js';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { logout } = userStore;
const { user } = storeToRefs(userStore);

const showLogin = ref(!user.value.isLoggedIn);

watch(
  () => user.value.isLoggedIn, 
  function(newValue) {
    showLogin.value = !newValue;
  }
);
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
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="font-bold">{{ user.name }} ⬇️</div>
            <ul tabindex="0" class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-26 p-2 shadow-sm">
              <li><button type="button" @click="logout">Выйти</button></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!---->
</template>

<style scoped></style>
