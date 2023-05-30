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
  

  <!-- start of content -->
  <div class="content">

    <h2>hello welcome back</h2>
  
  </div>
  <!-- end of content dashboard -->

  </div>
</template>

<script>
import Header from '@/views/contentViews/Header.vue';
import Sidebar from '@/views/contentViews/Sidebar.vue';
import 'bootstrap';
import axios from 'axios';


export default {
  name: 'Dashboard',
  components: {
    Header,
    Sidebar
  },
  methods: {
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
