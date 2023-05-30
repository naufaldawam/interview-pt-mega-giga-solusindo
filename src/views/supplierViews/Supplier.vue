<!-- import header -->
<template>
<div class="supplierpage">
  
  <!-- start of sidebar  -->
  <div class="sidebar">
    <Sidebar />
  </div>
  <!-- end of sidebar -->
  

  <!-- start of content -->
    <div class="content">
      <h2>Supplier Page</h2>
      <div class="button-down-header">
        <!-- <router-link to="/addbarang" class="btn btn-primary">Tambah Barang</router-link> -->
        <button class="btn btn-primary btn-sm btn-1 " @click="fiturProgressUpdate">Tambah Supplier</button>  
        <button class="btn btn-warning btn-sm btn-2" @click="downloadDataPDF">Unduh Data PDF</button>
        <button class="btn btn-warning btn-sm" @click="downloadDataExcell">Unduh Data Excell</button>
      </div>
      <div>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Supplier</th>
              <th>Alamat</th>
              <th>No Telepon</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(supplier, index) in dataSupplier" :key="supplier.id">
              <td>{{ index + 1 }}</td>
              <td>{{ supplier.namaSupplier }}</td>
              <td>{{ supplier.alamat }}</td>
              <td>{{ supplier.noTelp }}</td>
              <td>
                <div class="action-button">
                  <button class="btn btn-danger btn-sm" @click="hapusSupplier(supplier)">Hapus</button>
                  <button class="btn btn-warning btn-sm" @click="fiturProgressUpdate()">Update</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="showSuccessDeleted" class="success-popup">
          <p>Data berhasil dihapus!</p>
        </div>
        <div v-if="fiturUpdate" class="success-popup">
          <p>Fitur masih dalam tahap pengembangan</p>
          <button @click="confirmPopUpClose">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/views/contentViews/Sidebar.vue';
import axios from 'axios';
//import file untuk disimpan
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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
  name: 'SupplierPage',
  components: {
    Sidebar
  },
  data() {
    return {
      dataSupplier: [],
      showSuccessDeleted: false,
      fiturUpdate: false
    };
  },
  mounted() {
    this.fetchDataSupplier();
  },
  methods: {
    fetchDataSupplier() {
      const token = localStorage.getItem('token');
      // const payload = token.split('.')[1];
      // const decodedPayload = atob(payload);
      // console.log("decodedPayload :",decodedPayload);
      // const { sub: username } = JSON.parse(decodedPayload);
      const queryParams = queryStringify({
        limit: 20,
        offset: 1
      });
      // console.log("queryParams :",queryParams);
      const url = `http://159.223.57.121:8090/supplier/find-all?${queryParams}`;
      // console.log("urlnya :", url)
     
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          const data = response.data;
          // console.log('response data supplier:', data.data);
          this.dataSupplier = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    hapusSupplier(supplier) {
      if (confirm("Apakah Anda yakin ingin menghapus supplier ini?")) {
        // Logika penghapusan supplier
        // ...
        this.fiturUpdate = true;
      }
    },
    fiturProgressUpdate() {
      this.fiturUpdate = true;
    },
    confirmPopUpClose() {
      this.fiturUpdate = false;
    },
    downloadDataPDF() {
    const token = localStorage.getItem('token');
    const url = 'http://159.223.57.121:8090/supplier/find-all?limit=20&offset=1';
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const data = response.data;
        const jsonData = JSON.stringify(data);
        // console.log("Json data : ",jsonData);
        const doc = new jsPDF();
        doc.text(jsonData, 10, 10);
        doc.save('unduh-data-supplier-marketplace-sianu-koding-naufal.pdf');
      })
      .catch(error => {
        console.error(error);
      });
    },
    downloadDataExcell() {
    const token = localStorage.getItem('token');
    const url = 'http://159.223.57.121:8090/supplier/find-all?limit=5&offset=1';
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const data = response.data;
        // console.log("data :",data);
        const worksheet = XLSX.utils.json_to_sheet(data.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Supplier');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'unduh-data-supplier-marketplace-sianu-koding-naufal.xlsx';
        link.click();

        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error(error);
      });
    },



  }
};
</script>


<style scoped>
.supplierpage {
  display: flex;
  justify-content: center;
}

.sidebar {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
}

.content {
  width: 100%;
  margin: 0 auto;
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

.button-down-header{
  text-align: end;
}
.btn-1{
  margin-right: 10px;
}
.btn-2{
  margin-right: 10px;
}


</style>
