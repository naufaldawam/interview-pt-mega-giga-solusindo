<template>
  <div class="container">
    <div class="profile-section">
      <div class="profile-image">
        <img src="@/assets/profile-icon.png" alt="profile-image" />
      </div>
      <div class="name-users">
        users
      </div>
    </div>
    <div class="menu-section">
      <div class="menu-border">
        <div class="menu-container">
          <button class="menu-button">
            Menu
          </button>
          <a class="item" :class="{active: isActive === 0}" href="#">Barang</a>
          <a class="item" href="#">Supplier</a>
        </div>
      </div>
    </div>
    <div class="status-section">
      <div class="status-online">
        <span>Status Online</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0,
    };
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
  min-height: 12rem;
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

.active {
  color: blue;
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
</style>
