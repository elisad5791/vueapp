import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import Basket from '../../Basket.vue';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import router from '../../../router/index.js';
import { useBasketStore } from '../../../stores/basket.js';

test('displays empty basket text', () => {
  const pinia = createPinia();
  const wrapper = mount(Basket, { global: { 
    provide: { pinia: pinia }, 
    plugins: [pinia, router] 
  } });

  expect(wrapper.text()).toContain('В корзине нет товаров');
});

test('displays basket data', () => {
  const pinia = createPinia();
  setActivePinia(pinia);

  const { basket } = storeToRefs(useBasketStore());
  basket.value = [
    { id: 1, title: 'my title', price: 100, count: 2 },
    { id: 2, title: 'my title 2', price: 150, count: 3 },
  ];

  const wrapper = mount(Basket, { global: { 
    provide: { pinia: pinia },
    plugins: [pinia, router] 
  } });

  expect(wrapper.text()).toContain('my title');
  expect(wrapper.text()).toContain('my title 2');
  expect(wrapper.text()).toContain('100');
  expect(wrapper.text()).toContain('2');
  expect(wrapper.text()).toContain('150');
  expect(wrapper.text()).toContain('3');
});