<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-navbar">
    <a class="navbar-brand" href="#">
      MARKETPLACE
      <img src="@/assets/new-logo-sinau-no-bg.png" alt="Logo Sinau Besar" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="toggleMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" :class="{ 'show': isMenuOpen }" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item ml-auto">
          <router-link to="/" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
}

.bg-light{
  background-color: lightblue !important;
}

.navbar-brand{
  color: blue !important;
}

.sticky-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.show {
  display: block !important;
}

</style>