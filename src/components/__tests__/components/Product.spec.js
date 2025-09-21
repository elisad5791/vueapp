import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import Product from '../../Product.vue';
import { createPinia } from 'pinia';
import router from '../../../router/index.ts';

test('displays product data', () => {
  const testProduct = {
    id: 1,
    title: 'title111',
    category: 'category111',
    price: 125,
    description: 'description111',
    image: 'img.png',
    rating: { rate: 8.5, count: 150 }
  };

  const pinia = createPinia();
  const wrapper = mount(Product, { 
    global: { provide: { pinia: pinia }, plugins: [pinia, router] },
    props: { product: testProduct},
  });

  expect(wrapper.text()).toContain('title111');
  expect(wrapper.text()).toContain('category111');
  expect(wrapper.text()).toContain('description111');
  expect(wrapper.text()).toContain('125');
  expect(wrapper.text()).toContain('8.5');
  expect(wrapper.text()).toContain('150');
  expect(wrapper.findAll('img')).toHaveLength(1);
  expect(wrapper.findAll('button')).toHaveLength(1);
});