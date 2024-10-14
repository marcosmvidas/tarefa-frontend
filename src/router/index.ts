import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requireAuth: true},
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/tarefa',
    name: 'tarefa',
    component: () => import(/* webpackChunkName: "tarefa" */ '../views/TarefaView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token está presente

  if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    // Se a rota requer autenticação e o usuário não está autenticado
    next({ name: 'login' }); // Redireciona para a página de login
  } else {
    next(); // Permite a navegação
  }
});


export default router
