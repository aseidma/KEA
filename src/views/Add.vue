<template>
  <div class="add">
    <h1>Wat' gibts Neues?</h1>
    <h3>Neue Waren hinzufügen</h3>
    <b-container>
      <h6 class="mt-5">Bisherige Waren</h6>
      <b-table striped :items="waren"></b-table>

      <b-button @click="add = !add">{{ add ? 'Doch nicht' : 'Ware hinzufügen' }}</b-button>

      <b-form class="mt-5 p-5 text-center" @submit.prevent="addProduct" v-if="add">
        <b-form-group label="Warenbezeichnung" label-for="#input-1">
          <b-input id="input-1" v-model="form.name"></b-input>
        </b-form-group>
        <b-form-group label="Einkaufspreis" label-for="#input-2">
          <b-input id="input-2" v-model="form.ek"></b-input>
        </b-form-group>
        <b-form-group label="Verkaufspreis" label-for="#input-3">
          <b-input id="input-3" v-model="form.vk"></b-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Erstellen</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      waren: [],
      add: false,
      form: {
        name: "",
        ek: 0,
        vk: 0
      }
    };
  },
  mounted() {
    return this.getProducts();
  },
  methods: {
    getProducts() {
      this.waren = []

      firebase
        .firestore()
        .collection("waren")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.waren.push(doc.data());
          });
        });
    },
    addProduct() {
      firebase
        .firestore()
        .collection("waren")
        .add({
          warenbezeichnung: this.form.name,
          einkaufspreis: this.form.ek,
          verkaufspreis: this.form.vk
        })
        .then(() => {
          this.add = false;
          return this.getProducts();
        })
        .catch(err => console.log(err))
    }
  }
};
</script>

<style>
</style>