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
  
  </div>
</div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue';


export default {
  name: 'SupplierPage',
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
