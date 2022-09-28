<template>
  <div id="login">
    <div class="center">
        <h1>Welcome To Todo List</h1>
        <login-button/>
      </div>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import LoginButton from '../components/LoginButton.vue';

export default {
  components: {
    LoginButton
  },
  created: function() {
    auth.onAuthStateChanged(user => {
      //  console.log("user state:", user);
      // uncomment above to check out which user properties are available.
      if (user) {        
        this.$router.replace('/todos')
      } else {
        this.user = null;
        this.$$router.replace('/')
      }
    });
  },
  beforeCreate: function() {
    auth.getRedirectResult().then(result=>{
      if (result.user) {
        console.log('result: ', result)
        this.$router.push("/todos")
      }
    }).catch(() => {
      this.$router.push("/itsAllForNothing")
    })
  }
}
</script>
