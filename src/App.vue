<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item to="/">KEA</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Sortiment" right>
            <b-dropdown-item to="/add">Hinzufügen</b-dropdown-item>
            <b-dropdown-item to="/remove">Entfernen</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/movement">Wareneingang/-ausgang</b-nav-item>

          <b-nav-item to="/stock" right>Bestand</b-nav-item>
          <b-nav-item to="/orders" right>Bestellungen</b-nav-item>
          <b-nav-item to="/supplies" right>Wareneingang</b-nav-item>
          <b-nav-item to="/add-contact" right>Neuer Kontakt</b-nav-item>
          <b-nav-item @click="logout" v-if="isLoggedIn">Ausloggen</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view class="view" />
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import firebase from "firebase";
import "firebase/auth";

Vue.use(BootstrapVue);

export default {
  watch: {
    $route(to) {
      document.title = to.meta.title || "KEA Warensystem";
    }
  },
  computed: {
    isLoggedIn() {
      return firebase.auth().currentUser ? true : false;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  position: relative;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-active {
  color: #ffcc00;
}

.view {
  margin-top: 200px;
}
</style>
