import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Albums from '../views/Albums.vue';
import AlbumDetails from '../views/AlbumDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
  },
  {
    path: '/albums/:id',
    name: 'Album Details',
    component: AlbumDetails,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
