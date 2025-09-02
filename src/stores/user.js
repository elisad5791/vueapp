import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', function () {
    const user = ref({
        name: '',
        email: '',
        password: '',
        auth: false
    });
    const router = useRouter();

    function loadUser() {
        const data = window.localStorage.getItem('user');
        if (data) {
            const userData = JSON.parse(data);
            user.value.name = userData.name;
            user.value.email = userData.email;
            user.value.auth = true;
        }
    }

    function login(name, email, password) {
        user.value.name = name;
        user.value.email = email;
        user.value.password = password;
        user.value.auth = true;

        const data = { name, email };
        window.localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
    }

    function logout() {
        user.value.name = '';
        user.value.email = '';
        user.value.password = '';
        user.value.auth = false;

        window.localStorage.removeItem('user');
        router.push('/');
    }

    function checkout() {
        if (!user.value.auth) {
            router.push('/login');
            return false;
        }
        return true;
    }

    return { user, login, logout, checkout, loadUser };
});