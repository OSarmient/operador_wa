<template>
    <div class="home-container">
      <h1>Bienvenido, {{ username }}!</h1>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data() {
      return {
        username: '',
      };
    },
    beforeCreate(){
      const token = window.localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
      }
    },
    mounted() {
      // Aquí puedes obtener el nombre de usuario desde la API, el almacenamiento local, etc.
      this.username = window.localStorage.getItem('username');
    },
    methods: {
      logout() {
        window.localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio de sesión
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #dc3545;
    border: 1px solid #dc3545;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c82333;
    border-color: #c82333;
  }
  </style>
  