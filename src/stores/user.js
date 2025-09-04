import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', function () {
    const user = ref({
        name: '',
        email: '',
        password: '',
        isLoggedIn: false
    });
    const router = useRouter();

    function loadUser() {
        const isAuth = window.localStorage.getItem('isLoggedIn');
        if (isAuth) {
            const data = window.localStorage.getItem('user');
            const userData = JSON.parse(data);
            user.value.name = userData.name;
            user.value.email = userData.email;
            user.value.isLoggedIn = true;
        }
    }

    function login(name, email, password) {
        user.value.name = name;
        user.value.email = email;
        user.value.password = password;
        user.value.isLoggedIn = true;

        const data = { name, email };
        window.localStorage.setItem('user', JSON.stringify(data));
        window.localStorage.setItem('isLoggedIn', true);
        router.push('/admin');
    }

    function logout() {
        user.value.name = '';
        user.value.email = '';
        user.value.password = '';
        user.value.isLoggedIn = false;

        window.localStorage.removeItem('user');
        window.localStorage.removeItem('isLoggedIn');
        router.push('/');
    }

    function checkout() {
        if (!user.value.isLoggedIn) {
            router.push('/login');
            return false;
        }
        return true;
    }

    return { user, login, logout, checkout, loadUser };
});