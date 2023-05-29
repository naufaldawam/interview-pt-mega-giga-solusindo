<!-- import header -->
<template>
<div class="addbarangPage">
  
  <!-- start of sidebar  -->
  <div class="sidebar">
    <Sidebar />
  </div>
  <!-- end of sidebar -->
  

  <!-- start of content -->
  <div class="content">

    <h2>Menu Tambah Barang</h2>
      <router-link to="/barangpage" class="btn btn-primary">kembali ke menu sebelumnya</router-link>
      <form @submit.prevent="tambahBarang">
        <div>
          <label for="namaBarang">Nama Barang:</label>
          <input type="text" id="namaBarang" v-model="formData.namaBarang" required>
        </div>
        <div>
          <label for="harga">Harga:</label>
          <input type="number" id="harga" v-model="formData.harga" required>
        </div>
        <div>
          <label for="stok">Stok:</label>
          <input type="number" id="stok" v-model="formData.stok" required>
        </div>
        <div>
          <label for="namaSupplier">Nama Supplier:</label>
          <input type="text" id="namaSupplier" v-model="formData.supplier.namaSupplier" required>
        </div>
        <div>
          <label for="noTelp">No. Telp Supplier:</label>
          <input type="text" id="noTelp" v-model="formData.supplier.noTelp" required>
        </div>
        <div>
          <label for="alamat">Alamat Supplier:</label>
          <input type="text" id="alamat" v-model="formData.supplier.alamat" required>
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Tambah Barang</button>
        </div>
      </form>

  </div>
</div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue';
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
  name: 'addbarang',
  components: {
    Sidebar
  },
  data() {
    return {
      dataBarang: []
    };
  },  data() {
    return {
      formData: {
        namaBarang: '',
        harga: 0,
        stok: 0,
        supplier: {
          namaSupplier: '',
          noTelp: '',
          alamat: ''
        }
      }
    };
  },
  methods: {
    tambahBarang() {
      const token = localStorage.getItem('token');
      const url = 'http://159.223.57.121:8090/barang/create';

      axios
        .post(url, this.formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          const data = response.data;
          console.log('response data:', data);

          // Lakukan tindakan setelah berhasil menambahkan barang
          // Misalnya, tampilkan pesan sukses atau lakukan navigasi ke halaman lain

        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};


</script>

<style scoped>

.addbarangPage {
  display: flex;
  justify-content: center;
}

.content {
  width: 100%;
  /*max-width: 800px;*/
  margin: 0 auto;
  /*padding: 20px;*/
}

.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .table th,
  .table td {
    white-space: nowrap;
  }
}


.action-button{
  display: flex;
  gap: 5px;
}

.sidebar {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
}



</style>
