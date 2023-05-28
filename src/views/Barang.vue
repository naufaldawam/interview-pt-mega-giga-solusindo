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
        <table>
          <thead>
            <tr>
              <th>Kolom 1</th>
              <th>Kolom 2</th>
              <th>Kolom 3</th>
              <th>Kolom 4</th>
              <th>Kolom 5</th>
              <th>Kolom 6</th>
              <th>Kolom 7</th>
              <th>Kolom 8</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in 8" :key="row">
              <td>Data {{ row }} - Kolom 1</td>
              <td>Data {{ row }} - Kolom 2</td>
              <td>Data {{ row }} - Kolom 3</td>
              <td>Data {{ row }} - Kolom 4</td>
              <td>Data {{ row }} - Kolom 5</td>
              <td>Data {{ row }} - Kolom 6</td>
              <td>Data {{ row }} - Kolom 7</td>
              <td>Data {{ row }} - Kolom 8</td>
            </tr>
          </tbody>
        </table>
      </div>

  </div>
</div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue';


export default {
  name: 'barangPage',
  components: {
    Sidebar
  },
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

.barangpage {
  display: flex;
  max-width: 800px;
  margin: 0;
  padding: 20px;
}


</style>
