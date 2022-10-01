import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import { auth } from "@/firebaseConfig";
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false
let app

auth.onAuthStateChanged(()=>{
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }  
});