import { it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '../../../stores/user.js';
import { useRouter } from 'vue-router';

vi.mock('vue-router', () => ({ useRouter: vi.fn() }));

const mockRouter = { push: vi.fn() };
let userStore;

beforeEach(function () {
  const pinia = createPinia();
  setActivePinia(pinia);

  vi.mocked(useRouter).mockReturnValue(mockRouter);

  userStore = useUserStore();

  vi.clearAllMocks();
});

it('user logged in', function () {
  userStore.user = { isLoggedIn: true };

  const result = userStore.checkout();

  expect(result).toEqual(true);
  expect(mockRouter.push).not.toHaveBeenCalled();
});

it('user not logged in', function () {
  userStore.user = { isLoggedIn: false };

  const result = userStore.checkout();

  expect(result).toEqual(false);
  expect(mockRouter.push).toHaveBeenCalledWith('/login');
});