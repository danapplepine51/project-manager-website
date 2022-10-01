import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)


const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/*', name: 'error', component: PageNotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
