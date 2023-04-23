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
        <textarea v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje"></textarea>
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
    overflow: none;
    overflow-y: auto;
    scrollbar-width: 6px; /* Ancho del scroll bar en Firefox */
    scrollbar-color: #999 #F5F5F5;
  }

  #MS::-webkit-scrollbar {
    width: 6px; /* Ancho del scroll bar */
  }
  
  #MS::-webkit-scrollbar-track {
    background-color: #F5F5F5; /* Color de fondo de la pista del scroll bar */
  }
  
  #MS::-webkit-scrollbar-thumb {
    background-color: #999; /* Color del deslizador (thumb) del scroll bar */
    border-radius: 3px; /* Añade bordes redondeados al deslizador del scroll bar */
  }

  .messages {
    width: 95%;
    overflow-y: auto;
    flex-grow: 1;
    padding: 1rem;
    word-break: break-all;
  }

  
  .message {
    overflow: auto;
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
    display: table;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0;
    margin-left: auto;
    color: #292b2c;
    background-color: #e3effd;
    /*#f6f6f6*/
  }
  
  .message:not(.own-message) .message-text {
    background-color: #324481;
    border-color: #324481;
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
    display: table;
    margin-left: auto;
  }
  
  textarea{
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-wrap: break-word;
    resize: none;
    font-family: Arial, sans-serif;
  }
  
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: 1px solid #007bff;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 1rem;
  }
  
  button:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

</style>