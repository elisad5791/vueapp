import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import Login from '../../Login.vue';
import { createPinia } from 'pinia';
import router from '../../../router/index.ts';

test('displays labels', () => {
  const pinia = createPinia();
  const wrapper = mount(Login, { global: { 
    provide: { pinia: pinia }, 
    plugins: [pinia, router] 
  } });

  expect(wrapper.text()).toContain('Имя');
  expect(wrapper.text()).toContain('Email');
  expect(wrapper.text()).toContain('Пароль');
  expect(wrapper.text()).toContain('Войти');
});