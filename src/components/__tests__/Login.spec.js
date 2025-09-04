import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import Login from '../Login.vue';
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

test('displays message', () => {
  const pinia = createPinia();
  
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [],
  });

  const wrapper = mount(Login, { global: { plugins: [pinia, router] } });

  expect(wrapper.text()).toContain('Войти');
});