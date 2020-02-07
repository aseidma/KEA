<template>
  <div class="home">
    <h1>KEA Warenwirtschaftssystem</h1>
    <h2>We ❤️ Hot dogs & Furniture</h2>

    <h3 class="mt-5" style="color: #ffcc00;">Schnellzugriff</h3>
    <div class="quick-link-box">
      <router-link to="/add" class="quick-link">
        <h5>Waren Hinzufügen</h5>
      </router-link>
      <router-link to="/remove" class="quick-link">
        <h5>Waren Entfernen</h5>
      </router-link>
      <router-link to="/movement" class="quick-link">
        <h5>Wareneingang/-ausgang</h5>
      </router-link>
      <router-link to="/stock" class="quick-link">
        <h5>Bestand</h5>
      </router-link>
      <router-link to="/orders" class="quick-link">
        <h5>Bestellungen</h5>
      </router-link>
      <router-link to="/supplies" class="quick-link">
        <h5>Wareneingang</h5>
      </router-link>
      <router-link to="/add-contact" class="quick-link">
        <h5>Neuer Kontakt</h5>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.quick-link-box {
  position: absolute;
  left: 50%;
  margin-top: 10px;
  transform: translateX(-50%);
  text-align: center;
}

.quick-link {
  color: black;
  text-decoration: none;
}

.quick-link h5 {
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.quick-link:hover {
  text-decoration: none;
  color: black;
}

.quick-link h5:hover {
  text-shadow: 0 0 black;
  transform: scale(1.03);
}
</style>