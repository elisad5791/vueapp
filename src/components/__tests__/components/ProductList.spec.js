import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import ProductList from '../../ProductList.vue';
import ProductItem from '../../ProductItem.vue';
import { createPinia } from 'pinia';
import router from '../../../router/index.ts';

test('displays productItem components', () => {
  const testProducts = [{
    id: 1,
    title: 'title111',
    category: 'category111',
    price: 125,
    description: 'description111',
    image: 'img.png',
    rating: { rate: 8.5, count: 150 }
  }];

  const pinia = createPinia();
  const wrapper = mount(ProductList, { 
    global: { provide: { pinia: pinia }, plugins: [pinia, router] },
    props: { products: testProducts},
  });

  expect(wrapper.getComponent(ProductItem).props()).toEqual({ product: testProducts[0] });
});