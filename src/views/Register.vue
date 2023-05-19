<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="registerData.username" required>
        <div v-if="registerData.username.length > 50" class="error">Username melebihi 50 karakter.</div>
      </div>
      <div class="form-group">
        <label for="profileName">Profile Name:</label>
        <input type="text" id="profileName" v-model="registerData.profileName" required>
        <div v-if="registerData.profileName.length > 64" class="error">Profile Name melebihi 64 karakter.</div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="registerData.password" required>
        <div v-if="!isPasswordValid" class="error">Password harus berisi teks dan kalimat.</div>
        <div v-if="registerData.password.length > 50" class="error">Password melebihi 50 karakter.</div>
      </div>
      <button type="submit">Daftar</button>
    </form>
    <router-link to="/login">Sudah Punya Akun</router-link>

    <!-- Popup untuk pemberitahuan akun berhasil dibuat -->
    <div v-if="isAccountCreated" class="popup">
      <div class="popup-content">
        <p>Akun berhasil dibuat!</p>
        <p>Silakan login menggunakan akun yang baru dibuat.</p>
        <button @click="closePopup">Tutup</button>
      </div>
    </div>

    <!-- Popup untuk pemberitahuan username sudah digunakan -->
    <div v-if="isUsernameDuplicate" class="popup">
      <div class="popup-content">
        <p>Username sudah digunakan!</p>
        <p>Silakan pilih username lain.</p>
        <button @click="closePopup">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerData: {
        username: '',
        profileName: '',
        password: ''
      },
      isPasswordValid: true,
      isAccountCreated: false,
      isUsernameDuplicate: false
    };
  },
  methods: {
    register() {
      // Validasi password (harus berisi teks dan kalimat)
      const passwordRegex = /[a-zA-Z]+/;
      this.isPasswordValid = passwordRegex.test(this.registerData.password);

      if (!this.isPasswordValid) {
        return;
      }

      fetch('http://159.223.57.121:8090/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.registerData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)

          if (data.message === 'REGISTER SUCCESSFUL') {
            this.isAccountCreated = true;
            setTimeout(() => {
              this.$router.push('/login');
            }, 5000);
          } else if (data.message === 'USERNAME IS REGISTERED') {
            this.isUsernameDuplicate = true;
          }

        })
        .catch(error => {
          console.error(error);
        });
    },
    closePopup() {
      this.isAccountCreated = false;
      this.isUsernameDuplicate = false;
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

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

.popup button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup button:hover {
  background-color: #45a049;
}
</style>
