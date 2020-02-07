<template>
  <div class="add">
    <h1>Neue Waren hinzufügen</h1>
    <b-container>
      <h3 v-if="!loading" class="mt-5">Bisherige Waren</h3>
      <b-table v-if="!loading" striped :items="waren"></b-table>

      <b-button @click="add = !add" href="#submit">{{ add ? 'Doch nicht' : 'Ware hinzufügen' }}</b-button>

      <b-form class="mt-5 p-5 text-center" @submit.prevent="addProduct" v-if="add">
        <b-form-group label="Warenbezeichnung" label-for="input-1">
          <b-input id="input-1" v-model="form.name"></b-input>
        </b-form-group>
        <b-form-group label="Einkaufspreis" label-for="input-2">
          <b-input id="input-2" v-model="form.ek"></b-input>
        </b-form-group>
        <b-form-group label="Verkaufspreis" label-for="input-3">
          <b-input id="input-3" v-model="form.vk"></b-input>
        </b-form-group>

        <b-button type="submit" variant="primary" id="submit">Erstellen</b-button>
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
      ids: [],
      add: false,
      form: {
        name: "",
        ek: 0,
        vk: 0
      },
      loading: false
    };
  },
  mounted() {
    return this.getProducts();
  },
  methods: {
    getProducts() {
      this.loading = true;
      this.waren = [];

      let name, vk, ek;

      firebase
        .firestore()
        .collection("waren")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            name = doc.data().warenbezeichnung;
            vk = doc.data().verkaufspreis;
            ek = doc.data().einkaufspreis;

            this.waren.push({ Warenbezeichnung: name, Verkaufspreis: vk + " €", Einkaufspreis: ek + " €" });
            this.ids.push(doc.id);
          });
        })
        .then(() => {
          this.loading = false;
        })
        .catch(err => console.log(err))
    },
    addProduct() {
      let ek = this.form.ek.replace(/\./, '');
      let vk = this.form.vk.replace(/\./, '');

      firebase
        .firestore()
        .collection("waren")
        .add({
          warenbezeichnung: this.form.name,
          einkaufspreis: ek,
          verkaufspreis: vk
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