<template>
  <div id="login">
    <div class="center">
        <welcome-dialog/>

      </div>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import WelcomeDialog from '@/components/welcomeDialog.vue';

export default {
  components: {
    WelcomeDialog
   
  },
  created: function() {
    auth.onAuthStateChanged(user => {
       console.log("user state:", user);
      // uncomment above to check out which user properties are available.
      if (user) {        
        this.$router.replace('/dashboard')
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
        this.$router.push("/dashboard")
      }
    }).catch(() => {
      this.$router.push("/itsAllForNothing")
    })
  }
}
</script>

<style scoped>

</style>
