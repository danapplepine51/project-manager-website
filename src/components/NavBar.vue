<template>
  <div>
    <nav>
      <router-link to="/todos" class="projects">Todo</router-link>
      <router-link to="/done" class="projects">Done</router-link>
      <a><button class='b1' @click="signOut">SignOut</button></a>
      <a><button class='b1' @click="secret"><img class="avatar" :src="photo" alt="avatar" referrerpolicy="no-referrer"></button></a>
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
      photo: auth.currentUser.photoURL
    };
  },
  methods: {
    makeActivate: function(item){
        this.active = item;
    },
    secret: function(){
      alert("Congrat! Found a secret button!")
    },
    signOut: function() {
      auth.signOut()
        .then(() => {
          this.user = null;
          this.$router.push("/")
        })
        .catch(err => console.log(err));
    }
  },
};
</script>

<style>
*{
  margin:0;
  padding:0;
}

body{
  font:15px/1.3 'Open Sans', sans-serif;
  color: #5e5b64;
  text-align:center;
}

a, a:visited {
  outline:none;
  color:#389dc1;
}

a:hover{
  text-decoration:none;
}

.avatar {
  width: 2em; 
  height: 2em; 
  border-radius: 50%;
}

section, footer, header, aside, nav{
  display: block;
}

/*-------------------------
  The menu
--------------------------*/

nav{
  display:inline-block;
  margin:60px auto 45px;
  background-color:#5597b4;
  box-shadow:0 1px 1px #ccc;
  border-radius:2px;
}

nav a{
  display:inline-block;
  padding: 18px 30px;
  color:#fff !important;
  font-weight:bold;
  font-size:16px;
  text-decoration:none !important;
  line-height:1;
  text-transform: uppercase;
  background-color:transparent;

  -webkit-transition:background-color 0.25s;
  -moz-transition:background-color 0.25s;
  transition:background-color 0.25s;
}

nav a:first-child{
  border-radius:2px 0 0 2px;
}

nav a:last-child{
  border-radius:0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact{
  background-color:#e35885;
}

.b1 {
    border: none;
    background: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-weight:bold;
    font-size:16px;
}

p{
  font-size:22px;
  font-weight:bold;
  color:#7d9098;
}

p b{
  color:#ffffff;
  display:inline-block;
  padding:5px 10px;
  background-color:#c4d7e0;
  border-radius:2px;
  text-transform:uppercase;
  font-size:18px;
}
</style>
