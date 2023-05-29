<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Footer from './views/Footer.vue'
import Header from './views/Header.vue'
</script>

<template>


    <div class="app">
       <div v-if="$route.path == '/supplierpage' || $route.path == '/barangpage' ||  $route.path == '/addbarang' ||   $route.path == '/updatebarang' ">
      <div class="header">
        <Header/>
      </div>
    </div>

    <RouterView />

    <div class="footer">
      <Footer />
    </div>
  </div>
  
</template>

<style scoped>

.app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  background-color: #f8f8f8;
  margin-top: auto;
  text-align: center;
}

.footer {
  margin-top: top;
}


/*header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/
</style>
