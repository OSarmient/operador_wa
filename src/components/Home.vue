<template>
  <div class="home-container">
    <Nav />
    <div class="home-chat-selector-container">
      <div class="chat-selector-container">
        <ChatSelector />
      </div>
      <div class="chat-container">
        <Chat />
      </div>
    </div>
  </div>
</template>
  
<script>
  import Nav from '../views/Nav.vue';
  import Chat from '../views/Chat.vue';
  import ChatSelector from '../views/ChatSelector.vue';

  export default {
    name: 'Home',
    components: {
      Nav,
      Chat,
      ChatSelector,
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
      async logout() {
        
        try {
          
          const auth_token = window.localStorage.getItem('token');
          const username = window.localStorage.getItem('username');
          
          // Preparar el cuerpo de la petición con el token y el nombre de usuario
          const requestBody = {
            auth_token,
            username,
          };
          // console.log('Cerrando sesión...');
          // Enviar petición al backend para cerrar sesión
          await axios.post('http://localhost:8000/logOut', requestBody);
          
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
          auth_token: window.localStorage.getItem('token'),
          id_chat: 1,
          mensaje: this.newMessage,
        });
        this.newMessage = '';
      },
    },
  };
  </script>

<style >
.home-container {
  display: flex;
  align-items: end;
  flex-direction: column;
  height: calc(100vh - 115px);
}

.home-chat-selector-container{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100%;
}

.chat-selector-container {
  background-color: #ffffff;
  border: 1px solid #ccc;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 20%;
  height: 100%;
}

.chat-container {
  width: 80%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #ccc;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


</style>