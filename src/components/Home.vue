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
    
  };
  </script>

<style >
.home-container {
  display: flex;
  align-items: end;
  flex-direction: column;
  height: 100%;
}

.home-chat-selector-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.chat-container {
  background-color: #ffffff;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 88vh;
  width: 100%;
  min-width: 40vh;
}

.chat-selector-container {
  background-color: #ffffff;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 88vh;
  min-width: 25vh;
}


</style>