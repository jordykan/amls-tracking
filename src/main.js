import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import moment from 'moment'

Vue.use(Toast);
Vue.use(moment)
moment.locale('es') // returns the new locale, in this case 'de'

Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:3000/api/'

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
