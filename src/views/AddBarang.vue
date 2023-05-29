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
      <router-link to="/barangpage" class="btn btn-primary">Kembali ke Menu Sebelumnya</router-link>
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
      <div v-if="showSuccessPopup" class="success-popup">
        <p>Data berhasil ditambahkan!</p>
        <p>Kembali ke halaman barang</p>
      </div>
    </div>
    <!-- end of content -->
  </div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue';
import axios from 'axios';

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
      formData: {
        namaBarang: '',
        harga: 0,
        stok: 0,
        supplier: {
          namaSupplier: '',
          noTelp: '',
          alamat: ''
        }
      },
      showSuccessPopup: false
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
          // console.log('response data:', data);
          this.showSuccessPopup = true;
          setTimeout(() => {
            this.$router.push('/barangpage');
          }, 2000);
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.content h2 {
  margin-bottom: 20px;
}

form {
  display: grid;
  gap: 10px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button {
  margin-top: 20px;
}

.sidebar {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
}

.success-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: green ;
  color: white;
}
</style>
