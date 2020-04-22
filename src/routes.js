import loginScreen from './components/LoginScreen.vue';
import homeScreen from './components/Home.vue';

export default [
    {
        name: 'login',
        path: '/',
        component: loginScreen
    },
    {
        name: 'home',
        path: '/home/:user',
        component: homeScreen
    },
]