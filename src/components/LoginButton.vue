<template>
  <div class="auth">

    <template v-if="!user">
      <b-button variant="primary" @click="signInWithGoogle"> Sign in with Google </b-button>
    </template>
    <!-- <template v-if="user">
      
      <img class="avatar" :src="user.photoURL" alt="avatar" referrerpolicy="no-referrer">
      <button @click="signOut">Sign Out</button>
    </template> -->

  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig";

export default {
    components: {},
    name: "LoginButton",
  data() {
    return {
      user: null
    };
  },
  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
       console.log("user state:", user);
      // uncomment above to check out which user properties are available.
      if (user) {        
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    signInWithGoogle: function() {
      auth.signInWithRedirect(provider)
        .then(result => {
          this.user = result.user;
        })
        .catch(err => console.log(err));
    },
    signOut: function() {
      auth.signOut()
        .then(() => {
          this.user = null;
          this.$router.push("/")
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 2em; 
  height: 2em; 
  border-radius: 50%;
}
</style>