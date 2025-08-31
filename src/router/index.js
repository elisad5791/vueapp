import { createWebHistory, createRouter } from 'vue-router';

import MainPage from '../views/MainPage.vue';
import ProductPage from '../views/ProductPage.vue';
import AddProduct from '../views/AddProduct.vue';
import BasketPage from '../views/BasketPage.vue';
import LoginPage from '../views/LoginPage.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/product/:id', component: ProductPage },
  { 
    path: '/admin', 
    component: AddProduct,
    beforeEnter: (to, from) => {
      const name = window.localStorage.getItem('username');
      if (!name) {
        return { path: '/login' };
      }
    }, 
  },
  { 
    path: '/basket', 
    component: BasketPage, 
    beforeEnter: (to, from) => {
      const name = window.localStorage.getItem('username');
      if (!name) {
        return { path: '/login' };
      }
    },
  },
  { path: '/login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;