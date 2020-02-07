<template>
  <div class="remove">
    <b-container>
      <h1>Waren aus Bestand entfernen</h1>
      <h3>Zum Entfernen Ware klicken</h3>

      <b-table striped :items="waren" @row-clicked="deleteClickedProduct"></b-table>
      <p class="feedback" v-if="feedback">{{ feedback }}</p>
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
      feedback: ""
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.waren = [];

      firebase
        .firestore()
        .collection("waren")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.waren.push(doc.data());
            this.ids.push(doc.id);
          });
        });
    },
    deleteClickedProduct(content, index) {
      firebase
        .firestore()
        .collection("waren")
        .doc(this.ids[index])
        .delete()
        .then(() => {
          this.feedback = `${content.warenbezeichnung} erfolgreich aus dem Sortiment entfernt!`;
          return this.getProducts();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.remove tbody tr {
  transition: transform .3s ease-in-out;
}

.remove tbody tr:hover {
  transform: scale(1.03);
  cursor: pointer;
}
</style>