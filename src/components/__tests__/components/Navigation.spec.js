import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import Navigation from '../../Navigation.vue';
import { createPinia } from 'pinia';
import router from '../../../router/index.js';

test('displays menu', () => {
  const pinia = createPinia();
  const wrapper = mount(Navigation, { global: { 
    provide: { pinia: pinia }, 
    plugins: [pinia, router] 
  } });

  expect(wrapper.text()).toContain('Happy Shop');
  expect(wrapper.text()).toContain('Главная');
  expect(wrapper.text()).toContain('Панель администрирования');
  expect(wrapper.text()).toContain('Корзина');
  expect(wrapper.findAll('a')).toHaveLength(5);
});