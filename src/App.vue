<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item to="/">Startseite</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Buchen" right>
            <b-dropdown-item to="/add">Hinzufügen</b-dropdown-item>
            <b-dropdown-item to="/remove">Entfernen</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="In & Out" right>
            <b-dropdown-item to="/inward">Inward</b-dropdown-item>
            <b-dropdown-item to="/outward">Outward</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/orders" right>Bestellungen</b-nav-item>
          <b-nav-item to="/stock" right>Bestand</b-nav-item>
          <b-nav-item to="/supplies" right>Vorrat</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

export default {};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: rgb(255, 217, 0);
}
</style>
