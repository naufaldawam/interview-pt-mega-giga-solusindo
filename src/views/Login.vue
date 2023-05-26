<template>
  <TheWelcome/>
  <div class="login">
    <h2 class="text-login">Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="loginData.username" required>
        <div v-if="loginData.username.length > 50" class="error">Username melebihi 50 karakter.</div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="loginData.password" required>
        <div v-if="loginData.password.length > 50" class="error">Password melebihi 50 karakter.</div>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <router-link to="/register" class="buttonRegister">Belum Punya Akun ?</router-link>
  </div>
</template>

<script>
import TheWelcome from '../views/WellcomePage.vue'

export default {
  data() {
    return {
      loginData:{
        username: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    login() {
      fetch('http://159.223.57.121:8090/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.loginData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('ini hasil datanya:', data);
          console.log('ini token :' ,data.token);
          if (data.message === "LOGIN SUCCESS") {
            localStorage.setItem('token', data.token);
            // console.log(localStorage.setItem);
            console.log(localStorage.getItem('token'));

            this.$router.push({path: "/dashboard", replace : true})
            this.$router.replace({path: "/dashboard"})
          } else {
            this.errorMessage = "Akun tidak ditemukan atau tidak sesuai"; // Menetapkan pesan kesalahan
          }
        })
        .catch(error => {
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

.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
}

.text-login{
  text-align: center;
  
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
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.buttonRegister:hover{
  background-color: lightblue;
}
</style>
