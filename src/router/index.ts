import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../stores/user';
import MainPage from '../views/MainPage.vue';
import ProductPage from '../views/ProductPage.vue';
import AdminPage from '../views/AdminPage.vue';
import BasketPage from '../views/BasketPage.vue';
import LoginPage from '../views/LoginPage.vue';


const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MainPage },
  { path: '/product/:id', component: ProductPage },
  { 
    path: '/admin', 
    component: AdminPage,
    meta: { requiresAuth: true },
  },
  { 
    path: '/basket', 
    component: BasketPage, 
    meta: { requiresAuth: true },
  },
  { path: '/login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
    
  if (to.meta.requiresAuth && !userStore.checkout()) {
    { path: '/login' };
  }
});

export default router;