<template>
  <div class="welcomeContainer">

      <div class="bodyContainer block_container">
          <b-jumbotron>

        <template #header>Welcome to The Project Manager</template>

        <template #lead> Work More Structured and Orgainized. </template>

        <hr class="my-4" />
        <p>Task management made simple. Let's get started!</p>
        <div class="d-flex justify-content-center">

          <login-button />
          <b-button
            style="margin-left: 10px"
            variant="primary"
            @click="installPWA()"
            :style="{ display: installBtn }"
          >
            Add to Home Screen
          </b-button>

        </div>

        <div class="imageContainer">
          <b-img :src="require('../assets/landingImage.jpg')" class="img-fluid">
          </b-img>
        </div>
      </b-jumbotron>

      </div>
      <div class="footer">
          <footer class="text-center text-white" style="background-color: #1666fa;">

        <!-- Copyright -->
        <div
          class="text-center p-3"
          style="background-color: rgba(0, 0, 0, 0.2)"
        >
          © Powered by:
          <a
            class="text-white"
            style="text-decoration: none"
            href="https://mdbootstrap.com/"
            >The Greatest Website of All Time</a
          >
        </div>
        <!-- Copyright -->
      </footer>
    </div>
  </div>
</template>

<script>
import LoginButton from "../components/LoginButton.vue";

export default {
  data() {
    return {
      installBtn: "none",
      installPWA: undefined,
    };
  },

  components: {
    LoginButton,
  },

  created() {
    let installPrompt = null;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block";
    });

    this.installPWA = () => {
      this.installBtn = "none";
      installPrompt.prompt();
      installPrompt.userChoice.then((result) => {
        if (result.outcome === "accepted") {
          console.log("User accepted");
        } else {
          console.log("User denied");
        }
        installPrompt = null;
      });
    };
  },
};
</script>

<style scoped>
.bodyContainer {
  padding: 20px 10px 0px 10px;
}

img {
  max-width: 60%;
  max-height: 50%;
}

.imageContainer {
  padding: 20px;
}

</style>
