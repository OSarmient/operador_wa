<template>
  <div id="app">
    <Auth />
  </div>
</template>

<script>
import Auth from "./components/Auth.vue";

export default {
  components: {
    Auth,
  },
};
</script>

<style>
  html, body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
</style>
