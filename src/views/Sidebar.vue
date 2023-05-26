<template>
  <div class="container">
    <div class="profile-section">
      <div class="profile-image">
        <img src="@/assets/profile-icon.png" alt="profile-image" />
      </div>
      <div class="name-users">
        ini nanti nama user yang di ambil dari generate token
        {{ userName }}
      </div>
    </div>
    <div class="menu-section">
      <div class="menu-border">
        <div class="menu-container">

          <button
            class="menu-button"
            :class="{ active: activeMenu === 'dashboard' }"
            @click="navigateToDashboard"
          >
            Dashboard
          </button>
          <button
            class="menu-submenu"
            :class="{ active: activeMenu === 'barang' }"
            @click="navigateToBarang"
          >
            Barang
          </button>
          <button
            class="menu-submenu"
            :class="{ active: activeMenu === 'supplier' }"
            @click="navigateToSupplier"
          >
            Supplier
          </button>


<!--           <a class="item" :class="{active: isActive === 0}" href="#">
            <router-link to="/dashboard">dashboard</router-link>
          </a>
            <button class="item" :class="{active: isActive === 0}" @click="navigateToBarang">
              Barang
            </button>
          <a class="item" href="#">Supplier</a>
          <router-link to="/supplierpage">ngarah ke supplierpage gk</router-link> -->

        </div>
      </div>
    </div>
    <div class="status-section">
      <div class="status-online">
        <span>Status Online</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0,
      userName: '',
      activeMenu:'',
    };
  },
  created() {
    this.fetchUserName();
    this.setActiveMenu(this.$route.path);
  },
  watch: {
    $route(to) {
      this.setActiveMenu(to.path);
    },
  },
  methods: {
    fetchUserName() {
      fetch('http://159.223.57.121:8090/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            this.userName = data[0].name;
          }
            console.log(data)
          
        })
        .catch(error => {
          console.error(error);
        });
    },
      setActiveMenu(path) {
        if (path === '/dashboard') {
          this.activeMenu = 'dashboard';
        } else if (path === '/barangpage') {
          this.activeMenu = 'barang';
        } else if (path === '/supplierpage') {
          this.activeMenu = 'supplier';
        } else {
          this.activeMenu = '';
        }
    },
      navigateToDashboard() {
        if (this.$route.path === '/dashboard') {
          alert('Anda sudah berada di halaman yang dituju.');
        } else {
          this.$router.push('/dashboard');
        }
    },
      navigateToSupplier() {
        if (this.$route.path === '/supplierpage') {
          alert('Anda sudah berada di halaman yang dituju.');
        } else {
          this.$router.push('/supplierpage');
        }
    },
      navigateToBarang() {
        if (this.$route.path === '/barangpage') {
          alert('Anda sudah berada di halaman yang dituju.');
        } else {
          this.$router.push('/barangpage');
        }
    },
  },
};
</script>

<style>
.container {
  padding-top: 20px;
}

.profile-section {
  margin-bottom: 20px;
  border: 2px solid lightblue;
  padding: 10px;
}

.profile-image {
  width: 100%;
  text-align: center;
}

.profile-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.menu-section {
  margin-bottom: 20px;
  min-height: fit-content;
}

.menu-border {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-button {
  background-color: lightblue;
  border: none;
  outline: none;
  cursor: pointer;
  min-width: 100%;
  color: blue;
}

.menu-submenu {
  border: none;
  outline: none;
  cursor: pointer;
  min-width: 100%;
  color: black;
}

.active {
  color: blue;
}

.menu-section,
.status-section {
  position: relative;
  z-index: 30;
}

.item {
  display: block;
  padding: 5px 10px;
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}


.status-section {
  text-align: center;
}

.status-online {
  background-color: lightblue;
  color: blue;
  padding: 10px;
  border-radius: 5px;
}

.name-users {
  text-align: center;
  color: blue;
  background-color: lightblue;
}

</style>
