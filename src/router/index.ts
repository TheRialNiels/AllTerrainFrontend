import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '/dashboard/usuarios',
          name: 'DashboardUsers',
          component: () => import('@/views/Dashboard/DashboardUsersView.vue')
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ["Login"];
  //@ts-ignore
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = await useAuth().currentUser();

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router
