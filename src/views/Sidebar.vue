<template>
  <div class="container">
    <div class="profile-section">
      <div class="profile-image">
        <img src="@/assets/profile-icon.png" alt="profile-image" />
      </div>
      <div class="name-users">
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
    <div class="menu-section">
      <div class="menu-border">
        <div class="menu-container">
          <span class="status-online">{{ isOnline ? 'Online' : 'Offline' }}</span>
          <span v-if="isOnline" class="font-size: small">Hari Online: {{ onlineSince }}</span>
          <span v-if="isOnline" class="font-size: small">Waktu Online: {{ onlineDuration }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="status-section">
      <div class="status-online">
        <span>Status: {{ isOnline ? 'Online' : 'Offline' }}</span>
        <span v-if="isOnline">Sejak: {{ onlineSince }}</span>
        <span v-if="isOnline">Durasi Online: {{ onlineDuration }}</span></div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';

///pakai query string karna butuh string
function queryStringify(params) {
  const keyValuePairs = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return keyValuePairs.join('&');
}

export default {
  data() {
    return {
      isActive: 0,
      userName: '',
      activeMenu: '',
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
      const token = localStorage.getItem('token');
      // console.log('Token:', token);

      // Decode token payload
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const { sub: username , exp: expirationTime, iat: issuedAtTime} = JSON.parse(decodedPayload);
      // const ambilDataUsername = username;

      // console.log("payload: ", payload);
      // console.log("decode payload: ", JSON.stringify(decodedPayload) );
      // console.log("decode payload: ", decodedPayload );
      // console.log("ambil data username :", ambilDataUsername);
      const queryParams = queryStringify({
        username: username,
        // username: 'gita',//tar ganti jan lupa buat get accountnya
      });

      const url = `http://159.223.57.121:8090/users/find-by-username?${queryParams}`;

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          const coba = response.data;
          // console.log("coba:",coba.data.username);
          if (response.data != null) {
            this.userName = coba.data.username;
            // create status token jika masih valid
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            // jika valid tampilkan status onlinenya
            // if (currentTime < expirationTime) {
            //   console.log('Status: Online');
            // } else {
            //   console.log('Status: Offline');
            // }
            this.isOnline = currentTime < expirationTime;
            if (this.isOnline) {
              const loginTime = new Date(issuedAtTime * 1000); // Convert to milliseconds
              const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
              //ambil waktu login dengan format yy-mm-dd              
              const year = loginTime.getFullYear();
              const month = String(loginTime.getMonth() + 1).padStart(2, '0');
              const day = String(loginTime.getDate()).padStart(2, '0');
              this.onlineSince = `${year}-${month}-${day}`;
              //ambil waktu dia login dari jam berapa
              const loginHour = loginTime.getHours();
              const loginMinute = loginTime.getMinutes();
              const loginSecond = loginTime.getSeconds();
              this.onlineDuration = `${loginHour.toString().padStart(2, '0')}:${loginMinute.toString().padStart(2, '0')}:${loginSecond.toString().padStart(2, '0')}`;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
      },
      formatDuration(durationInSeconds) {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        let durationString = '';
        if (hours > 0) {
          durationString += `${hours} jam `;
        }
        if (minutes > 0) {
          durationString += `${minutes} menit `;
        }
        durationString += `${seconds} detik`;

        return durationString;
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

.span-menu{

}
</style>
