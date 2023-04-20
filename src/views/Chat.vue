<template>
    <section id="MS" ref="messagesContainer">
      <div class="messages">
          <div v-for="message in messages" :key="message.id" :class="['message', { 'own-message': message.sender === username }]">
              <span class="message-sender">{{ message.sender }}</span>
              <p class="message-text">{{ message.text }}</p>
          </div>
      </div>
    </section>
    <div class="input-container">
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje" />
        <button @click="sendMessage">Enviar</button>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        name: 'Chat',
        data() {
            return {
                username: '',
                messages: [],
                newMessage: '',
                socket: null,
                messagesContainer: null,
            };
        },
        mounted() {

            this.messagesContainer = this.$refs.messagesContainer;

            this.idroom = window.localStorage.getItem('token');

            this.socket = io('http://localhost:8001',{
                withCredentials: false,
                extraHeaders: {"auth_token": this.idroom}
            });

            this.socket.on('connect', () => {
                console.log('Conectado al servidor');
            });

            this.socket.on('message', (message) => {
                this.messages.push(message);
            });

            this.socket.on('notification', (data) => {
                console.log(data);
            });
        },
        updated() {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
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
                

                this.messages.push({
                    sender: this.username,
                    text: this.newMessage,
                });

                this.newMessage = '';
            },
        },
    }

</script>

<style scoped>

  #MS{
    overflow: hidden;
    overflow-y: scroll;
    
  }

  .messages {
    width: 80%;
    overflow-y: auto;
    flex-grow: 1;
    padding: 1rem;
    word-break: break-all;
    
  }
  
  .message {
    margin-bottom: 1rem;
  }
  
  .own-message {
    display: table;
    margin-left: auto;
  }
  
  .message-sender {
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .message-text {
    min-width: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0;
    color: #fff;
    background-color: #dc3545;
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

</style>