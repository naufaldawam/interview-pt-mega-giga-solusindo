import { createRouter, createWebHistory } from 'vue-router'

import WellcomePage from '../views/WellcomePage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Header from '../views/Header.vue'
import Dashboard from '../views/Dashboard.vue'
import Footer from '../views/Footer.vue'
import SupplierPage from '../views/Supplier.vue'
import BarangPage from '../views/BarangPage.vue'
import AddBarang from '../views/AddBarang.vue'
import UpdateBarang from '../views/UpdateBarang.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/updatebarang',
      name: 'updatebarang',
      component: UpdateBarang,
    },
    {
      path: '/addbarang',
      name: 'addbarang',
      component: AddBarang,
    },
    {
      path: '/supplierpage',
      name: 'supplierpage',
      component: SupplierPage,
    },
    {
      path: '/barangpage',
      name: 'barangpage',
      component: BarangPage,
    },
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
