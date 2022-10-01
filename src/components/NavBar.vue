<template>
<div>
<nav style="background-color: #1666fa;" class="navbar navbar-expand-lg navbar-light justify-content-between">

    <a class="navbar-brand" href="#">
      <!-- add image here if we want a logo image -->
    </a>
    <div class="navbar-nav">
      <!-- <a class="nav-item nav-link"><button type="button" class="btn btn-primary"><router-link style="text-decoration: none; color:black;" to="/dashboard">Dashboard</router-link></button></a> -->
      <a class="nav-item nav-link" id="signOut" style="text-decoration: none; color:white;">Hello! {{username}}</a> 
      <a class="nav-item nav-link" style="text-decoration: none; color:black;"><img class="avatar" :src="photo" alt="avatar" referrerpolicy="no-referrer"></a> 
      <a class="nav-item nav-link" ><button @click="signOut" type="button" class="btn btn-secondary">SignOut</button></a>

    </div>
</nav>    
  </div>
</template>

<script>
import { auth } from '@/firebaseConfig'

export default {
  name: "NavBar",
  el: '#main',
  data: function() {
    return {
      active: 'home',
      photo: auth.currentUser.photoURL,
      username: null,
      online: false
    };
  },
  methods: {
    makeActivate: function(item){
        this.active = item;
    },
    signOut: function() {
      auth.signOut()
        .then(() => {
          this.user = null;
          this.$router.push("/")
        })
        .catch(err => console.log(err));
    },
    checkOnline: function(){
		if(navigator.onLine){
			this.online = true;
			return true;
		}
		else{
			this.online = false;
			return false;
		}
    }
  },
  created: function(){
      this.username = auth.currentUser.displayName
  }
};
</script>

<style>
.avatar {
  width: 2em; 
  height: 2em; 
  border-radius: 50%;
}

/* #signOut {
  padding-left: 60em;
} */

.navFloatRight{
  width: 100%;
  text-align:center;
}
</style>
