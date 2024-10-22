import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/tarefa',
        name: 'tarefa',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "tarefa" */ '../views/TarefaView.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token está presente

  if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    // Se a rota requer autenticação e o usuário não está autenticado
    next({ name: 'login' }); // Redireciona para a página de login
  } else {
    next(); // Permite a navegação
  }
});

export default router;
