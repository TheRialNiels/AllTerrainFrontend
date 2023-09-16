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
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Auth/RegistrateView.vue')
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
        {
          path: '/dashboard/equipos',
          name: 'DashboardEquipos',
          component: () => import('@/views/Dashboard/DashboardEquiposView.vue')
        },
        {
          path: '/dashboard/universidades',
          name: 'DashboardUniversidades',
          component: () => import('@/views/Dashboard/DashboardUniversidadesView.vue')
        },
        {
          path: '/dashboard/asesores',
          name: 'DashboardAsesores',
          component: () => import('@/views/Dashboard/DashboardAsesorView.vue')
        },
        {
          path: '/dashboard/pruebas',
          name: 'DashboardPruebas',
          component: () => import('@/views/Dashboard/DashboardPruebasView.vue')
        },
        {
          path: '/dashboard/puntajes',
          name: 'DashboardPuntajes',
          component: () => import('@/views/Dashboard/DashboardPuntajesView.vue')
        },
        {
          path: '/dashboard/encargado',
          name: 'DashboardEncargado',
          component: () => import('@/views/Dashboard/DashboardEncargadoView.vue')
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ["Login","Register"];
  const adminPages=["DashboardUsers","DashboardEquipos","DashboardUniversidades","DashboardAsesores","DashboardPruebas","DashboardPuntajes"]
  const encargadoPages=["DashboardEncargado","DashboardPuntajes"]
  const juezPages=["DashboardPruebas"]
  //@ts-ignore
  const authRequired = !publicPages.includes(to.name);
  const adminRequired = adminPages.includes(to.name)
  const encargadoRequired = encargadoPages.includes(to.name)
  const juezRequired = juezPages.includes(to.name)
  const loggedIn = await useAuth().currentUser()
  const role = await useAuth().getRole

  if (authRequired && !loggedIn) {
    return next('/login')
  } else {
    if (loggedIn) {
      if (adminRequired) {
        if (role === 'admin') {
          return next()
        } else if (role === 'encargado' || role === 'juez') {
          return next('/dashboard')
        }
      }

      if (encargadoRequired) {
        if (role === 'encargado') {
          return next()
        } else if (role === 'admin') {
          return next('/dashboard/usuarios')
        } else if (role === 'juez' && !juezRequired) {
          return next('/user/pruebas')
        }
      }
    }

    next()
  }
});

export default router
