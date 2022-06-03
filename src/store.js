import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
      token: null,
      usuario: null,
      drawer: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsuario(state, usuario) {
     state.usuario = usuario
    },
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    SET_SCRIM(state, payload) {
      state.barColor = payload
    }

  },
  actions: {
    guardarToken({ commit }, token) {
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token)
        this.commit("setUsuario", decode(token))
      }
      const ruta = router.history._startLocation;
      const rutaOriginal = ruta.slice(1)
      router.push({ name: rutaOriginal })
  //    console.log(router.history._startLocation)
    },
    salir({ commit }) {
      commit("setToken", null)
      commit("setUsuario", null)
      localStorage.removeItem("token")
      router.push({ name: 'Login' })
    }
  }
})
