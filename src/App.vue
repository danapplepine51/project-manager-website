<template>
  <div id="app">
    <div v-if="is_logged_in">
      <nav-bar/>
    </div>
    <!-- <nav-bar/> -->
    <router-view/>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import NavBar from '@/components/NavBar.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
  components:{
    NavBar
  },
  data: function(){
    return {
      email: "",
      username: "",
      uid: "",
      is_logged_in: false
    }
  },

  created: function() {
    var user = auth.currentUser;
    if(user){
      this.is_logged_in = true
      this.username = user.displayName
      this.email = user.email
      this.uid = user.uid
    }
  }
}
</script>


<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-transition: transform 200ms;
  -webkit-transition: -webkit-transform 200ms;
  transition: all 200ms;
  /* text-align: center; */
  /* color: #2c3e50; */
}
</style>
