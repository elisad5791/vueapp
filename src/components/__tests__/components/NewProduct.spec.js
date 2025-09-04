import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import NewProduct from '../../NewProduct.vue';
import { createPinia } from 'pinia';
import router from '../../../router/index.js';

test('displays creation form', () => {
  const pinia = createPinia();
  const wrapper = mount(NewProduct, { global: { 
    provide: { pinia: pinia }, 
    plugins: [pinia, router] 
  } });

  expect(wrapper.text()).toContain('Название');
  expect(wrapper.text()).toContain('Описание');
  expect(wrapper.text()).toContain('Цена');
  expect(wrapper.text()).toContain('Категория');
  expect(wrapper.text()).toContain('Изображение (url)');
  expect(wrapper.text()).toContain('Рейтинг');
  expect(wrapper.text()).toContain('Количество голосов');
  expect(wrapper.text()).toContain('Создать');

  expect(wrapper.findAll('input[type="text"]')).toHaveLength(2);
  expect(wrapper.findAll('input[type="number"]')).toHaveLength(3);
  expect(wrapper.findAll('input[type="url"]')).toHaveLength(1);
  expect(wrapper.findAll('textarea')).toHaveLength(1);
  expect(wrapper.findAll('button')).toHaveLength(1);
});