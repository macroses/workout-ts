import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import Statistic from "../views/Statistic.vue";

import { auth } from "@/firebase/config";

const requireAuth = (to, from, next): void => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "signup" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "signup",
      component: SignUp,
      meta: {
        title: "Дневник тренировок",
      },
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: requireAuth,
      meta: {
        title: "Дневник тренировок",
      },
    },
    {
      path: "/statistic",
      name: "statistic",
      component: Statistic,
      beforeEnter: requireAuth,
      meta: {
        title: "Статистика",
      },
    },
  ],
});

export default router;
