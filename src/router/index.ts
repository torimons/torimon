import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MainView from '../components/MainView/index.vue';
import MainCreationView from '../components/MainCreationView/index.vue';
import MapSelection from '../views/MapSelection.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/map-select',
        name: 'map-select',
        component: MapSelection,
    },
    {
        path: '/MainView',
        name: 'MainView',
        component: MainView,
        // とりあえずMainViewにアクセスすると今までのマップを表示する
    },
    {
        path: '/MainCreationView',
        name: 'MainCreationView',
        component: MainCreationView,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/map-detail',
        name: 'map-detail',
        component: () => import('../components/MapDetailCard/index.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
