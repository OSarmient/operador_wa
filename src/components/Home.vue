<template>
  <div class="home-container">
    <Nav />
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
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  import Nav from '../views/Nav.vue';

  export default {
    name: 'Home',
    data() {
      return {
        messages: [],
        newMessage: '',
        socket: null,
      };
    },
    components: {
      Nav,
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

.logout-button:hover {
  background-color: #c82333;
  border-color: #c82333;
}
</style>