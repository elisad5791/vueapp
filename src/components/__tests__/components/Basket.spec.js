import { mount } from '@vue/test-utils';
import { expect, test, vi } from 'vitest';
import Basket from '../../Basket.vue';
import { ref } from 'vue';

const mockUseBasketStore = vi.hoisted(() => vi.fn());
vi.mock('../../../stores/basket.js', () => ({
  useBasketStore: mockUseBasketStore
}))

test('displays empty basket text', () => {
  mockUseBasketStore.mockReturnValue({
    basket: ref([]),
    loadBasket: vi.fn(),
    addProductToBasket: vi.fn(),
    removeProductFromBasket: vi.fn(),
    increaseCount: vi.fn(),
    decreaseCount: vi.fn(),
  });

  const wrapper = mount(Basket);

  expect(wrapper.text()).toContain('В корзине нет товаров');
});

test('displays basket data', () => {
  mockUseBasketStore.mockReturnValue({
    basket: ref([
      { id: 1, title: 'my title', price: 100, count: 2 },
      { id: 2, title: 'my title 2', price: 150, count: 3 },
    ]),
    loadBasket: vi.fn(),
    addProductToBasket: vi.fn(),
    removeProductFromBasket: vi.fn(),
    increaseCount: vi.fn(),
    decreaseCount: vi.fn(),
  });

  const wrapper = mount(Basket);

  expect(wrapper.text()).toContain('my title');
  expect(wrapper.text()).toContain('my title 2');
  expect(wrapper.text()).toContain('100');
  expect(wrapper.text()).toContain('2');
  expect(wrapper.text()).toContain('150');
  expect(wrapper.text()).toContain('3');
});