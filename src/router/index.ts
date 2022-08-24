import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';

import { auth } from '@/firebase/config';

const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if(!user) {
    // redirect them

    next({ name: 'login'});
  } else {
    next();
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
