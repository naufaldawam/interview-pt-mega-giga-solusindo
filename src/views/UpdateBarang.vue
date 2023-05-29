<template>
  <div class="updateBarangPage">

    <!-- start of sidebar -->
    <div class="sidebar">
      <Sidebar/>
    </div>
    <!-- end of sidebar -->
    <!--  -->
    <!-- start of content update  -->
    <div class="content">
      <div class="barang-update">
        <h2>Update Barang</h2>
        <form @submit.prevent="updateBarang">
          <div class="form-group">
            <label for="namaBarang">Nama Barang:</label>
            <input type="text" id="namaBarang" v-model="namaBarang" required>
          </div>
          <div class="form-group">
            <label for="harga">Harga:</label>
            <input type="number" id="harga" v-model="harga" required>
          </div>
          <div class="form-group">
            <label for="stok">Stok:</label>
            <input type="number" id="stok" v-model="stok" required>
          </div>
          <div class="form-group">
            <label for="namaSupplier">Nama Supplier:</label>
            <input type="text" id="namaSupplier" v-model="namaSupplier" required>
          </div>
          <div class="form-group">
            <label for="alamat">Alamat Supplier:</label>
            <input type="text" id="alamat" v-model="alamatSupplier" required>
          </div>
          <div class="form-group">
            <label for="noTelp">No. Telp Supplier:</label>
            <input type="text" id="noTelp" v-model="noTelpSupplier" required>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" type="submit">Update</button>
            <button class="btn btn-secondary" @click="closeUpdateModal">Cancel</button>
          </div>
        </form>
      </div>
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
  data() {
    return {
      barangId: '',
      namaBarang: '',
      harga: 0,
      stok: 0,
      namaSupplier: '',
      alamatSupplier: '',
      noTelpSupplier: ''
    };
  },
  mounted() {
    this.fetchBarangData();
  },
  methods: {
    fetchBarangData() {
      const id = this.$route.params.id;
      const url = `http://159.223.57.121:8090/barang/find-by-id/${id}`;

      axios
        .get(url)
        .then(response => {
          const data = response.data.data;
          this.barangId = data.id;
          this.namaBarang = data.namaBarang;
          this.harga = data.harga;
          this.stok = data.stok;
          this.namaSupplier = data.supplier.namaSupplier;
          this.alamatSupplier = data.supplier.alamat;
          this.noTelpSupplier = data.supplier.noTelp;
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateBarang() {
      const url = `http://159.223.57.121:8090/barang/update/${this.barangId}`;

      const requestBody = {
        namaBarang: this.namaBarang,
        harga: this.harga,
        stok: this.stok,
        supplier: {
          namaSupplier: this.namaSupplier,
          alamat: this.alamatSupplier,
          noTelp: this.noTelpSupplier
        }
      };

      axios
        .put(url, requestBody)
        .then(response => {
          console.log('Barang updated:', response.data);
          // nanti buat popup berhasil yang langsung mengarahkan kembali ke barangPage
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>

.updateBarangPage {
  display: flex;
  justify-content: center;
}

.barang-update {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  width: 100%;
  /*max-width: 800px;*/
  margin: 0 auto;
  /*padding: 20px;*/
}

.action-button {
  display: flex;
  gap: 5px;
}

.sidebar {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
}
</style>
