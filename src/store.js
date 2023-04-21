import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      backURL: 'http://localhost:8000',
      auth_token: '',
      username: '',
      chats_actuales: [],
      chats_atendidos: [],
      chats_por_atender: [],
      socket: null,
    }
  },
  mutations: {
    setUsername(state, username) {
      window.localStorage.setItem('username', username);
      state.username = username;
    },
    setAuthToken(state, auth_token){
      window.localStorage.setItem('token', response.data.auth_token);
      state.auth_token = auth_token;
    },
    setChatsActuales(state, chats_actuales) {
      state.chats_actuales = chats_actuales;
    },
    setChatsAtendidos(state, chats_atendidos) {
      state.chats_atendidos = chats_atendidos;
    },
    setChatsPorAtender(state, chats_por_atender) {
      state.chats_por_atender = chats_por_atender;
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    addChatActuales(state, chat) {
      state.chats_actuales.push(chat);
    },
    addChatAtendidos(state, chat) {
      state.chats_atendidos.push(chat);
    },
    addChatPorAtender(state, chat) {
      state.chats_por_atender.push(chat);
    }
 },
  actions: { //De acá se fechea la data aprovechando que acá se hace asincrono
    setSername({ commit }, username) {
      commit('setSername', username);
    },
    setChatsActuales({ commit }, chats_actuales) {
      commit('setChatsActuales', chats_actuales);
    },
    setChatsAtendidos({ commit }, chats_atendidos) {
      commit('setChatsAtendidos', chats_atendidos);
    },
    setChatsPorAtender({ commit }, chats_por_atender) {
      commit('setChatsPorAtender', chats_por_atender);
    },
    setSocket({ commit }, socket) {
      commit('setSocket', socket);
    },
    addChatActuales({ commit }, chat) {
      commit('addChatActuales', chat);
    },
    addChatAtendidos({ commit }, chat) {
      commit('addChatAtendidos', chat);
    },
    addChatPorAtender({ commit }, chat) {
      commit('addChatPorAtender', chat);
    }    
  },
  getters: {
    getSername(state) {
      return state.username;
    },
    getChatsActuales(state) {
      return state.chats_actuales;
    },
    getChatsAtendidos(state) {
      return state.chats_atendidos;
    },
    getChatsPorAtender(state) {
      return state.chats_por_atender;
    },
    getSocket(state) {
      return state.socket;
    }
  } 
})