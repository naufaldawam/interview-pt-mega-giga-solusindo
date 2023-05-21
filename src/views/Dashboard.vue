<!-- import header -->
<template>
  <!-- start of header -->
  <Header />
  <!-- end of header -->
  <div class="dashboard">
  <!-- start of sidebar  -->
  <div class="sidebar">
    <Sidebar />
  </div>
  <!-- end of sidebar -->
  <div class="content">
    <!-- start of content -->
    <h2>Dashboard</h2>
    <div class="menu">
      <h3>Menu</h3>
      <ul>
        <li>Barang</li>
        <li>Supplier</li>
      </ul>
    </div>
    <div class="list">
      <h3>List Barang</h3>
      <ul>
        <li v-for="item in barangList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
    <div class="list">
      <h3>List Supplier</h3>
      <ul>
        <li v-for="item in supplierList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
    <div class="pagination">
      <h3>Pagination</h3>
    </div>
  </div>
    <!-- end of content dashboard -->
  </div>
</template>

<script>
import Header from '@/views/Header.vue';
import Sidebar from '@/views/Sidebar.vue';
import 'bootstrap';
import axios from 'axios';


export default {
  name: 'Dashboard',
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      userInfo: {},
      barangList: [],
      supplierList: [],
      isOnline: false
    };
  },
  methods: {
  async fetchData() {
    try {
      // Ambil token dari penyimpanan lokal
      const token = localStorage.getItem('token');
      
      // Set header Authorization dengan token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Mengambil data Informasi User
      const userInfoResponse = await axios.get('http://159.223.57.121:8090/user-info');
      this.userInfo = userInfoResponse.data;

      // Mengambil data List Barang
      const barangResponse = await axios.get('http://159.223.57.121:8090/barang');
      this.barangList = barangResponse.data;
      console.log(barangResponse)

      // Mengambil data List Supplier
      const supplierResponse = await axios.get('http://159.223.57.121:8090/supplier');
      this.supplierList = supplierResponse.data;

      // Mengambil data Status Online
      const statusResponse = await axios.get('http://159.223.57.121:8090/status');
      this.isOnline = statusResponse.data.isOnline;
    } catch (error) {
      console.error(error);
    }
  }
  },
  mounted() {
    // Panggil method fetchData() saat komponen di-mount
    this.fetchData();
  }
};
</script>

<style scoped>

.sidebar {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
}


.content {
  flex: 1;
}

.dashboard {
  display: flex;
  max-width: 800px;
  margin: 0;
  padding: 20px;
}

.user-info {
  margin-bottom: 20px;
}

.menu {
  margin-bottom: 20px;
}

.list {
  margin-bottom: 20px;
}

.status {
  margin-bottom: 20px;
}

.pagination {
  margin-bottom: 20px;
}
</style>
