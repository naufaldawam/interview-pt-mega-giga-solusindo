<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="registerData.username" required>
        <div v-if="registerData.username.length > 50" class="error">Password melebihi 50 karakter.</div>
      </div>
      <div class="form-group">
        <label for="profileName">Profile Name:</label>
        <input type="text" id="profileName" v-model="registerData.profileName" required>
        <div v-if="registerData.profileName.length > 64" class="error">Profile Name melebihi 64 karakter.</div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="registerData.password" required>
        <div v-if="registerData.password.length > 50" class="error">Password melebihi 50 karakter.</div>
      </div>
      <button type="submit">Daftar</button>
    </form>
    <router-link to="/login">Sudah Punya Akun</router-link>

  </div>
</template>


<script>

export default {
  data() {
    return {
      registerData :{
        username: '',
        profileName: '',
        password: ''
      }
    };
  },
  methods: {
      register() {
      // Kirim data register menggunakan metode POST
      fetch('http://159.223.57.121:8090/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.registerData),
      })
        .then(response => response.json())
        .then(data => {
          // Lakukan sesuatu dengan data yang diterima setelah register berhasil
          console.log(data);
          if(data.status === "OK"){
            this.$router.push({path: "/", replace : true})
            this.$router.replace({path: "/"})
          }

        })
        .catch(error => {
          // Tangani kesalahan jika terjadi
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.register {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.buttonRegister {
  padding: 10px 20px;
  background-color: yellow;
  color: blue;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buttonRegister:hover{
  background-color: blue;
}
</style>

