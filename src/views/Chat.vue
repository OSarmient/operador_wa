<template>
    <section id="MS" ref="messagesContainer">
      <div class="messages">
          <div v-for="message in messages" :key="message.id" :class="['message', { 'own-message': message.sender === username  || message.de_operador}]">
              <span class="message-sender">{{ message.sender }}</span>
              <p class="message-text">{{ message.text }}</p>
              <p class="message-hour"> {{ message.hora_mensaje }}</p>
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
    import axios from 'axios';
    import dataFormatter from '../../utils/dataFormatter';

    export default {
        name: 'Chat',
        data() {
            return {
                username: '',
                messages: [],
                newMessage: '',
                socket: null,
                messagesContainer: null,
                hora_mensaje: '',
            };
        },
        mounted() {

            this.messagesContainer = this.$refs.messagesContainer;

            this.idroom = window.localStorage.getItem('token');
            this.username = window.localStorage.getItem('username');

            axios.post('http://localhost:8000/usuariosPorAtender', {
                auth_token: this.idroom,
                id_operador: this.username, 
                limit: 100, 
                limit_mensajes: 100, 
                offset_mensajes: 0, 
                con_operador: true
            }).then((response) => {

              response.data.data.chat.forEach(Mensajes => {              
                Mensajes.Mensajes.forEach(element => {
                  this.messages.push({sender: Mensajes.Usuarios.primer_nombre, text: element.texto_mensaje, hora_mensaje: dataFormatter(new Date(parseInt(element.hora_mensaje))), de_operador: element.de_operador});
                });
              });

            }).catch((error) => {
                console.log(error)});

            this.socket = io('http://localhost:8001',{
                withCredentials: false,
                extraHeaders: {"auth_token": this.idroom}
            });

            this.socket.on('connect', () => {
                console.log('Conectado al servidor');
            });

            this.socket.on('message', ({id_chat, texto_mensaje, hora_mensaje}) => {
                this.messages.push({sender: id_chat, text: texto_mensaje, hora_mensaje: hora_mensaje});
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
                    hora_mensaje: new Date().toLocaleTimeString(),
                });

                this.newMessage = '';
                console.log(this.messages)
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
    width: 95%;
    overflow-y: auto;
    flex-grow: 1;
    padding: 1rem;
    word-break: break-all;
    
  }
  
  .message {
    margin-bottom: 0;
  }
  
  .own-message {
    display: table;
    margin-left: auto;
  }
  
  .message-sender {
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .message-text{
    display: table-cell;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0;
    border: 1px solid #ccc;
    background-color: #dc3545;
  }
  
  .message:not(.own-message) .message-text {
    background-color: #324481;
    border-color: #324481;
  }

  .message-text {
    min-width: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0;
    color: #fff;
  }
  .input-container {
    display: flex;
    padding: 1rem;
    border-top: 1px solid #ccc;
  }

  .message-hour {
    font-size: 0.8rem;
    color: #ccc;
    margin: 0;
    margin-bottom: 0.5rem;
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