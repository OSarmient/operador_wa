<template>
  <div class="home-container">
    <Nav />
      <div class="chat-container">
        <Chat />
      </div>
    </div>
  </template>
  
  <script>
  import Nav from '../views/Nav.vue';
  import Chat from '../views/Chat.vue';

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
      Chat,
    },
    beforeCreate(){
      const token = window.localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
      }
    },
    
  };
  </script>

<style >
.home-container {
  display: flex;
  align-items: end;
  flex-direction: column;
  height: 100vh;
}

.chat-container {
  width: 80%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>