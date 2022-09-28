import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '../views/LoginView.vue'
import TodoView from '../views/TodoView.vue'
import TodoDetailView from '../views/TodoDetailView.vue'
import DoneView from '../views/DoneView.vue'
import PageNotFound from '../views/PageErrorView.vue'
import TodoCategoryView from '../views/TodoCategoryView.vue'
import DoneCategoryView from '../views/DoneCategoryView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/todos', name: 'todos', component: TodoView },
  { path: '/done', name: 'done', component: DoneView },
  { path: '/done/:category', name:'doneCategory', component: DoneCategoryView, props:true},
  { path: '/todos/:id', name:'todoDetail', component: TodoDetailView, props:true},
  { path: '/todos/:category', name:'todoCategory', component: TodoCategoryView, props:true},
  { path: '*', name: 'page404', component: PageNotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
