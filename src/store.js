import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      backURL: 'http://localhost:8000',
      sername: '',
      chats_actuales: [],
      chats_atendidos: [],
      chats_por_atender: [],
      socket: null,
    }
  },
  mutations: {
    setSername(state, sername) {
      state.sername = sername;
    },
    setChatsActuales(state, chats_actuales) {
      state.chats_actuales = chats_actuales;
    },
    setChatsAtendidos(state, chats_atendidos) {
      state.chats_atendidos = chats_atendidos;
    },
    setChatsPorAtender(state, chats_por_atender) {
      state.chats_por_atender = chats_por_atender;
    }
  },
  actions: { //De acá se fechea la data aprovechando que acá se hace asincrono
    setSername({ commit }, sername) {
      commit('setSername', sername);
    },
    setChatsActuales({ commit }, chats_actuales) {
      commit('setChatsActuales', chats_actuales);
    },
    setChatsAtendidos({ commit }, chats_atendidos) {
      commit('setChatsAtendidos', chats_atendidos);
    },
    setChatsPorAtender({ commit }, chats_por_atender) {
      commit('setChatsPorAtender', chats_por_atender);
    }
  },
  getters: {
    getSername(state) {
      return state.sername;
    }
  } 
})