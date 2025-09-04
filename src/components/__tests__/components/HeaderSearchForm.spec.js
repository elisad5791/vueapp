import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import HeaderSearchForm from '../../HeaderSearchForm.vue';
import { createPinia } from 'pinia';
import router from '../../../router/index.js';

test('displays inputs, buttons', () => {
  const pinia = createPinia();
  const wrapper = mount(HeaderSearchForm, { global: { 
    provide: { pinia: pinia }, 
    plugins: [pinia, router] 
  } });

  expect(wrapper.text()).toContain('Найти');
  expect(wrapper.text()).toContain('Сбросить');
  expect(wrapper.findAll('input')).toHaveLength(3);
  expect(wrapper.findAll('button')).toHaveLength(2);
});