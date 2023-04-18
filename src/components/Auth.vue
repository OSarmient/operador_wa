<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="authenticate">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit">
          Ingresar
        </button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Auth',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async authenticate() {
      try {
        const response = await axios.post('http://localhost:8000/logIn', {
          username: this.username,
          password: this.password,
        });

        if (response.status === 200) {
          // console.log(response.headers)
          window.localStorage.setItem('username', this.username);
          window.localStorage.setItem('token', response.data.auth_token);
          // Realizar acciones después de una autenticación exitosa
          this.$router.push('/'); //this.$router.push({ name: 'Home' });
        } else {
          this.errorMessage = 'No es 200: ' + response.data.message;
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage = 'Error de otra cosa: ' + error.response.data.message;
        } else {
          this.errorMessage = 'Error de conexión: ' + error.message;
        }
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth-card {
  width: 300px;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}
</style>
