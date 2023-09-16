import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/Auth/RegistrateView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/layouts/DashboardLayout.vue"),
      children: [
        {
          path: "/dashboard/usuarios",
          name: "DashboardUsers",
          component: () => import("@/views/Dashboard/DashboardUsersView.vue"),
          meta: {
            adminRequired: true,
            encargadoRequired: false,
            juezRequired: false,
          },
        },
        {
          path: "/dashboard/equipos",
          name: "DashboardEquipos",
          component: () => import("@/views/Dashboard/DashboardEquiposView.vue"),
          meta: {
            adminRequired: true,
            encargadoRequired: false,
            juezRequired: false,
          },
        },
        {
          path: "/dashboard/universidades",
          name: "DashboardUniversidades",
          component: () =>
            import("@/views/Dashboard/DashboardUniversidadesView.vue"),
          meta: {
            adminRequired: true,
            encargadoRequired: false,
            juezRequired: false,
          },
        },
        {
          path: "/dashboard/asesores",
          name: "DashboardAsesores",
          component: () => import("@/views/Dashboard/DashboardAsesorView.vue"),
          meta: {
            adminRequired: true,
            encargadoRequired: false,
            juezRequired: false,
          },
        },
        {
          path: "/dashboard/pruebas",
          name: "DashboardPruebas",
          component: () => import("@/views/Dashboard/DashboardPruebasView.vue"),
          meta: {
            adminRequired: true,
            encargadoRequired: false,
            juezRequired: true,
          },
        },
        {
          path: "/dashboard/puntajes",
          name: "DashboardPuntajes",
          component: () =>
            import("@/views/Dashboard/DashboardPuntajesView.vue"),
          meta: {
            adminRequired: true,
            encargadoRequired: true,
            juezRequired: false,
          },
        },
        {
          path: "/dashboard/encargado",
          name: "DashboardEncargado",
          component: () =>
            import("@/views/Dashboard/DashboardEncargadoView.vue"),
          meta: {
            adminRequired: false,
            encargadoRequired: true,
            juezRequired: false,
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ["Login", "Register"];
  const loggedIn = await useAuth().currentUser();
  const role = useAuth().getRole;

  //@ts-ignore
  if (!publicPages.includes(to.name) && !loggedIn) {
    return next("/login");
  }

  if (loggedIn) {
    if (
      to.matched.some((record) => record.meta.adminRequired && record.meta.encargadoRequired)
    ) {
      if (role === "admin" || role === "encargado") {
        return next();
      } else if (role === "juez") {
        return next("/dashboard/pruebas");
      }
    }

    if (
      to.matched.some((record) => record.meta.adminRequired && record.meta.juezRequired)
    ) {
      if (role === "admin" || role === "juez") {
        return next();
      } else if (role === "encargado") {
        return next("/dashboard/encargado");
      }
    }

    if (to.matched.some((record) => record.meta.adminRequired)) {
      if (role === "admin") {
        return next();
      } else if (role === "encargado") {
        return next("/dashboard/encargado");
      } else if (role === "juez") {
        return next("/dashboard/pruebas");
      }
    }

    if (to.matched.some((record) => record.meta.encargadoRequired)) {
      if (role === "encargado") {
        return next();
      } else if (role === "admin") {
        return next("/dashboard/usuarios");
      } else if (role === "juez") {
        return next("/dashboard/pruebas");
      }
    }

    if (to.matched.some((record) => record.meta.juezRequired)) {
      if (role === "juez") {
        return next();
      } else if (role === "admin") {
        return next("/dashboard/usuarios");
      } else if (role === "encargado") {
        return next("/dashboard/puntajes");
      }
    }
  }

  next();
});

export default router;
