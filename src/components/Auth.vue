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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    authenticate() {
      // Realizar la autenticación aquí (ej. enviar solicitud a un servidor API)
      console.log("Usuario:", this.username, "Contraseña:", this.password);
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
</style>
