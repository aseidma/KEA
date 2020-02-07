<template>
  <div class="inward">
    <b-container>
      <h1>Wareneingänge und -abgänge</h1>

      <b-table v-if="buchungen.length > 0" striped :items="buchungen"></b-table>
      <h4 v-else>Es gibt noch keine Buchungen.</h4>

      <b-button @click="add = !add" href="#submit">{{ !add ? 'Hinzufügen' : 'Abbrechen' }}</b-button>

      <b-form class="mt-5 p-5 text-center" @submit.prevent="buyOrSellStock" v-if="add">
        <b-form-group label="Art der Buchung" label-for="input-1">
          <b-form-select id="input-1" v-model="type" :options="['Zugang', 'Abgang']"></b-form-select>
        </b-form-group>
        <b-form-group label="Kunde/Lieferant" label-for="input-2">
          <b-form-select id="input-2" v-model="contact" :options="contactType"></b-form-select>
        </b-form-group>
        <b-form-group label="Produkt" label-for="input-3">
          <b-form-select id="input-3" v-model="product" :options="products"></b-form-select>
        </b-form-group>
        <b-form-group label="Menge" label-for="input-4">
          <b-input id="input-4" v-model="amount"></b-input>
        </b-form-group>

        <p class="feedback" v-if="feedback">{{ feedback }}</p>

        <b-button type="submit" variant="primary" id="submit">Erstellen</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: 'Movement',
  data() {
    return {
      buchungen: [],
      stock: [],
      suppliers: [],
      customers: [],
      products: [],

      amount: 0,
      type: "",
      contact: "",
      product: "",
      add: false,

      feedback: ""
    };
  },
  mounted() {
    this.getBuchungen();
    this.getStock();
    this.getCustomers();
    this.getSuppliers();
    this.getProducts();
  },
  computed: {
    contactType() {
      return this.type == "Zugang" ? this.suppliers : this.customers;
    }
  },
  methods: {
    getProducts() {
      firebase
        .firestore()
        .collection("waren")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.products.push(doc.data().warenbezeichnung);
          });
        })
        .catch(err => console.log(err));
    },
    getSuppliers() {
      firebase
        .firestore()
        .collection("lieferanten")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.suppliers.push(doc.data().name);
          });
        })
        .catch(err => console.log(err));
    },
    getCustomers() {
      firebase
        .firestore()
        .collection("kunden")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.customers.push(doc.data().name);
          });
        })
        .catch(err => console.log(err));
    },
    getBuchungen() {
      this.buchungen = [];

      let name, amount, type, contact;

      firebase
        .firestore()
        .collection("buchungen")
        .orderBy('time')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            name = doc.data().ware;
            amount = doc.data().menge;
            type = doc.data().art;
            contact = doc.data().kontakt;

            this.buchungen.push({ Art: type, Ware: name, Käufer: contact, Volumen: amount });
          });
        })
        .catch(err => console.log(err));
    },
    getStock() {
      this.stock = [];

      firebase
        .firestore()
        .collection("stock")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.stock.push(doc.data());
          });
        })
        .catch(err => console.log(err));
    },
    async buyOrSellStock() {
      if (
        this.type &&
        this.contact &&
        this.product &&
        /\d+/.test(this.amount)
      ) {
        var amount, prodID, ek;

        // Get associatred Products ID
        await firebase
          .firestore()
          .collection("waren")
          .where("warenbezeichnung", "==", this.product)
          .get()
          .then(snapshot => {

            snapshot.forEach(doc => {
              prodID = doc.id;
              ek = doc.data().einkaufspreis;
            })

          })
          .catch(err => console.log(err));

        if (this.type == "Abgang") {

          amount = `- ${this.amount}`;
          let decAmount = parseInt(this.amount, 10);
          let currentAmount;

          // Check available amount
          await firebase
            .firestore()
            .collection("bestand")
            .doc(prodID)
            .get()
            .then(doc => {
              currentAmount = doc.data().bestand;
            })
            .catch(err => console.log(err));

          // Return with feedback if stock is insufficient
          if (currentAmount < this.amount || !currentAmount) {
            this.feedback = `Der Bestand reicht nicht aus, um die geforderte Menge zu verkaufen. Es befinden sich ${currentAmount || 0} ${this.product} im Bestand, du wolltest allerdings ${this.amount} verkaufen.`;

            return null;
          }

          // Decrease Stock
          firebase
            .firestore()
            .collection("bestand")
            .doc(prodID)
            .update({
              bestand: firebase.firestore.FieldValue.increment(-decAmount)
            })
            .catch(err => console.log(err));

        } else {

          amount = `+ ${this.amount}`;
          let incAmount = parseInt(this.amount, 10);
          
          // Increase Stock
          firebase
            .firestore()
            .collection("bestand")
            .doc(prodID)
            .update({
              bestand: firebase.firestore.FieldValue.increment(incAmount)
            })
            .catch(err => {
              if (/No document to update/.test(err.message)) {

                // Add new Stock Item
                firebase.firestore().collection("bestand")
                  .doc(prodID)
                  .set({
                    warenbezeichnung: this.product,
                    bestand: parseInt(this.amount, 10),
                    einkaufspreis: ek
                  })
                  .catch(err => console.log(err))

              } else {
                console.log(err)
              }
            });

        }

        // Book stock movement
        firebase
          .firestore()
          .collection("buchungen")
          .add({
            art: this.type,
            kontakt: this.contact,
            ware: this.product,
            menge: amount,
            time: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            this.feedback = "Erfolgreich gebucht!";

            this.resetForm();

            return this.getBuchungen();
          })
          .catch(err => console.log(err));

      } else {
        this.feedback = "Bitte fülle alle Felder aus.";

        if (!/\d+/.test(this.amount)) {
          this.feedback = "Gebe die Menge bitte als Zahl an.";
        }
      }
    },
    resetForm() {
      this.type = '';
      this.product = '';
      this.contact = '',
      this.amount = 0;
    }
  }
};
</script>

<style>
</style>