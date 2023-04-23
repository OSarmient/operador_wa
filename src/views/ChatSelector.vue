<template>
    <div v-for="chat in chats" :key="chat.id" :class="['chat']">
        <span class="message-sender">{{ chat.id_chat }}</span>
        <p class="message-text">{{ chat.nombre }}</p>
        <p class="message-hour"> {{ chat.motivo_sesion }}</p>
        <span class="chat-hour"> {{ chat.tiempo_inicio }}</span>
    </div>
</template>
    
<script>
import axios from 'axios';
import dataFormatter from '../../utils/dataFormatter';

export default {
    name: 'Chat',
    data() {
        return {
            chats: []
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
                var { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } = Mensajes.Usuarios;
                var nombre = primer_nombre + " " + segundo_nombre + " " + primer_apellido + " " + segundo_apellido;

                this.chats.push({ id_chat: Mensajes.id_chat, nombre: nombre, motivo: Mensajes.motivo_sesion, tiempo_inicio: dataFormatter(new Date(parseInt(Mensajes.tiempo_inicio))) });
            });

        }).catch((error) => {
            console.log(error)
        });


    }
}

</script>

<style >

.chat {
    width: 100%;
    border: 1px solid #000000;
}

.chat-hour {
    font-size: 0.8rem;
    padding-right: 0.5rem;
    color: #ccc;
    float: right;
  }
</style>