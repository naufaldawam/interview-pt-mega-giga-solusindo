import { createRouter, createWebHistory } from 'vue-router'

import WellcomePage from '../views/WellcomePage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Header from '../views/Header.vue'
import Dashboard from '../views/Dashboard.vue'
import Footer from '../views/Footer.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
      path: '/wellcomepage',
      name: 'wellcomepage',
      component: WellcomePage
    },
    {
      path: '/footer',
      name: 'footer',
      component: Footer
    },
    {
      path: '/',
      redirect: '/login' // Mengarahkan root path ke rute login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }


  ]
})

export default router
