<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-navbar">
    <a class="navbar-brand" href="#">
      marketplace
      <img src="@/assets/logo-sinau.png" alt="Logo Sinau Besar" />
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
        <li class="nav-item">
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
  height: 100px;
  width: 100px;
}


.sticky-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.show {
  display: block !important;
}

/* Add custom styles here if needed */
</style>
` b 
