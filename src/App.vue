<template>
  <div id="app">
    <div v-if="is_logged_in">
      <nav-bar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import NavBar from '@/components/NavBar.vue'

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

  // Before Create: change prop then return to original....
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.center {
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
border: 5px solid #5597b4;
padding: 10px;
}
</style>
