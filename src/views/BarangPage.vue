<!-- import header -->
<template>
<div class="barangpage">
  
  <!-- start of sidebar  -->
  <div class="sidebar">
    <Sidebar />
  </div>
  <!-- end of sidebar -->
  

  <!-- start of content -->
  <div class="content">

    <h2>Barang Page</h2>
    <div>
      <router-link to="/addbarang" class="btn btn-primary">Tambah Barang</router-link>
    </div>
      <div class="table-container">
        <table class="table" :data="dataBarang">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Nama Supplier</th>
              <th>Alamat Supplier</th>
              <th>No Telp Supplier</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(barang, index) in dataBarang" :key="barang.id">
              <td>{{ index + 1 }}</td>
              <td>{{ barang.namaBarang }}</td>
              <td>{{ barang.stok }}</td>
              <td>{{ barang.harga }}</td>
              <td>{{ barang.supplier.namaSupplier }}</td>
              <td>{{ barang.supplier.alamat }}</td>
              <td>{{ barang.supplier.noTelp }}</td>
              <td>
                <div class="action-button">
                  <button class="btn btn-danger btn-sm" @click="hapusBarang(barang)">Hapus</button>
                  <button class="btn btn-warning btn-sm" @click="fiturProgressUpdate">Update</button>  
                  <!-- <router-link to="#" class="btn btn-warning btn-sm">Update Barang</router-link> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="showSuccessDeleted" class="success-popup">
          <p>Data berhasil dihapus!</p>
        </div>
        <div v-if="fiturUpdate" class="success-popup">
          <p>fitur masih dalam tahap pengembangan</p>
          <button @click="confirmPopUpClose">OK</button>
        </div>
      </div>

      <!-- start modal -->

      <!-- end of modal -->

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
  name: 'barangPage',
  components: {
    Sidebar
  },
  data() {
    return {
      dataBarang: [],
      isUpdateModalOpen: false,
      updateForm: {
        id: '',
        namaBarang: '',
        harga: 0,
        stok: 0,
        supplier: {
          id: '',
          namaSupplier: '',
          alamat: '',
          noTelp: ''
        }
      },
      showSuccessDeleted: false,
      fiturUpdate: false,
    };
  },
  mounted() {
    this.fetchDataBarang();
  },
  methods: {
    fetchDataBarang() {
      const token = localStorage.getItem('token');
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const { sub: username } = JSON.parse(decodedPayload);
      const queryParams = queryStringify({
        username: username,
        limit: 20,
        offset: 1
      });

      const url = `http://159.223.57.121:8090/barang/find-all?${queryParams}`;

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          const data = response.data;
          // console.log('response data:', data);
          this.dataBarang = data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    hapusBarang(barang) {
      if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
        const id = barang.id;
        const token = localStorage.getItem('token');
        const url = `http://159.223.57.121:8090/barang/delete/${id}`;

             axios
          .delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            this.showSuccessDeleted = true;
            setTimeout(() => {
              this.showSuccessDeleted = false;
              window.location.reload();
            }, 2000);
            // console.log('Barang berhasil dihapus:', response.data);
            const index = this.dataBarang.indexOf(barang);
            if (index !== -1) {
              this.dataBarang.splice(index, 1);

            }
          })
          .catch(error => {
            console.error('Gagal menghapus barang:', error);
          });
      }
    },
    openUpdateModal(barang) {
      this.isUpdateModalOpen = true;
      this.updateForm.id = barang.id;
      this.updateForm.namaBarang = barang.namaBarang;
      this.updateForm.harga = barang.harga;
      this.updateForm.stok = barang.stok;
      this.updateForm.supplier.id = barang.supplier.id;
      this.updateForm.supplier.namaSupplier = barang.supplier.namaSupplier;
      this.updateForm.supplier.alamat = barang.supplier.alamat;
      this.updateForm.supplier.noTelp = barang.supplier.noTelp;
      console.log('update form id :' ,this.updateForm.id)
    },
   closeUpdateModal() {
      this.isUpdateModalOpen = false;
      this.updateForm = {
        id: '',
        namaBarang: '',
        harga: 0,
        stok: 0,
        supplier: {
          id: '',
          namaSupplier: '',
          alamat: '',
          noTelp: ''
        },
      };
    },
    updateBarang() {
      const token = localStorage.getItem('token');
      const url = `http://159.223.57.121:8090/barang/update/${this.updateForm.id}`;
      console.log("urlnya :", url);
      axios
        .put(url, this.updateForm, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          const data = response.data;
          console.log('response data update barang:', data);

          // Lakukan pembaruan tabel atau tindakan lainnya setelah berhasil memperbarui barang

          this.closeUpdateModal();
        })
        .catch(error => {
          console.error(error);
        });
    },
    fiturProgressUpdate(){
      this.fiturUpdate = true;
    },
    confirmPopUpClose(){
      this.fiturUpdate = false;
      window.location.reload();
    },


  }
};


</script>

<style scoped>

.barangpage {
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
