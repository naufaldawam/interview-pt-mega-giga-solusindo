import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
//content
import Header from '../views/contentViews/Header.vue'
import Dashboard from '../views/contentViews/Dashboard.vue'
import Footer from '../views/contentViews/Footer.vue'
//barang
import BarangPage from '../views/barangViews/BarangPage.vue'
import AddBarang from '../views/barangViews/AddBarang.vue'
import UpdateBarang from '../views/barangViews/UpdateBarang.vue'
//supplier
import SupplierPage from '../views/supplierViews/Supplier.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // barang views
    {
      path: '/barangpage',
      name: 'barangpage',
      component: BarangPage,
    },
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
    //supplier views
    {
      path: '/supplierpage',
      name: 'supplierpage',
      component: SupplierPage,
    },
    //content
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/footer',
      name: 'footer',
      component: Footer
    },
    //login register
    {
      path: '/register',
      name: 'register',
      component: Register
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login' // Mengarahkan root path ke rute login
    },


  ]
})

export default router
