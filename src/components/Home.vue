<template>
  <div class="home-container">
    <h1>Bienvenido, {{ username }}!</h1>
      <div class="chat-container">
        <div class="messages">
          <div v-for="message in messages" :key="message.id" :class="['message', { 'own-message': message.sender === username }]">
            <span class="message-sender">{{ message.sender }}</span>
            <p class="message-text">{{ message.text }}</p>
          </div>
        </div>
        <div class="input-container">
          <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje" />
          <button @click="sendMessage">Enviar</button>
        </div>
      </div>
      <button class="logout-button" @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  import axios from 'axios';

  export default {
    name: 'Home',
    data() {
      return {
        username: '',
        messages: [],
        newMessage: '',
        socket: null,
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
      this.idroom = window.localStorage.getItem('token');

      this.socket = io('http://localhost:8001',{
        withCredentials: false,
        extraHeaders: {"auth_token": this.idroom}
      }
      );

      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
      });

      this.socket.on('message', (message) => {
        this.messages.push(message);
      });
    },
    methods: {
      async logout() {
        
        try {
          
          const token = window.localStorage.getItem('token');
          const username = window.localStorage.getItem('username');
          
          // Preparar el cuerpo de la petición con el token y el nombre de usuario
          const requestBody = {
            auth_token: token,
            username,
          };

          // Enviar petición al backend para cerrar sesión
          await axios.post('http://localhost:8000/logOut', requestBody);
          console.log('Cerrando sesión...');
          // Eliminar el token del almacenamiento local y redirigir al usuario a la página de inicio de sesión
          window.localStorage.removeItem('token');
          this.$router.push('/login');
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      },
       sendMessage() {
        if (this.newMessage.trim() === '') {
          return;
        }

        this.socket.emit('message', {
          id_chat: 1,
          mensaje: this.newMessage,
        });
        this.newMessage = '';
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

.chat-container {
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.messages {
  overflow-y: auto;
  flex-grow: 1;
  padding: 1rem;
}

.message {
  margin-bottom: 1rem;
}

.own-message {
  text-align: right;
}

.message-sender {
  font-weight: bold;
  font-size: 0.9rem;
}

.message-text {
  margin: 0;
}

.input-container {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #ccc;
}

input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 1rem;
}

button:hover {
  background-color: #c82333;
  border-color: #c82333;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.logout-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
  border-color: #c82333;
}
</style>