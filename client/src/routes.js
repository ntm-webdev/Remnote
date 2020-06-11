import homeScreen from './components/HomeScreen.vue';
import loginScreen from './components/LoginScreen.vue';
import registrationScreen from './components/RegistrationScreen.vue';

export default [
    {
        name: 'index',
        path: '/',
        component: loginScreen
    },
    { 
        name: 'login',
        path: '/login',
        component: loginScreen
    },
    {
        name: 'registration',
        path: '/registration',
        component: registrationScreen
    },
    {
        name: 'home',
        path: '/:user',
        component: homeScreen
    },
]