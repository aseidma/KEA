<template>
  <div class="login">
    <b-container>
      <h2>Login</h2>
      <b-form @submit.prevent="attemptLogin">
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
            placeholder="dein-login@musst-du-selber-wissen.io"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Dein Passwort" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="password"
            required
            placeholder="Dein Passwort"
          ></b-form-input>
        </b-form-group>

        <p class="feedback" v-if="feedback">{{ feedback }}</p>

        <b-button type="submit" class="center" variant="primary">Anmelden</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/auth'

export default {
  data() {
    return {
        email: "",
        password: "",
        feedback: ""
    };
  },
  methods: {
    attemptLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.feedback = err.message
        })
    }
  }
};
</script>

<style>
.login .container {
    padding: 0% 15%;
}
</style>