<template>
  <div class="supplies">
    <b-container>
      <h1>Wareneingang</h1>
      <h4>Von welchem Lieferanten würdest du gerne die Bestellungen einsehen?</h4>
      <b-select v-model="supplier" :options="suppliers"></b-select>
      <b-table v-if="supplier" striped :items="orders"></b-table>
      <h3
        v-if="supplier"
      >Insgesamt haben wir {{ totalSupplierCost }} € bei {{ supplier }} ausgegeben.</h3>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "Supplies",
  watch: {
    supplier(newVal) {
      if (newVal) {
        return this.getSuppliersOrders(newVal);
      }
    }
  },
  data() {
    return {
      supplier: "",
      orders: [],
      suppliers: [],
      totalSupplierCost: 0
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("lieferanten")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.suppliers.push(doc.data().name);
        });
      });
  },
  methods: {
    getSuppliersOrders(name) {
      this.orders = [];
      this.totalSupplierCost = 0;

      let id, title, price, amount, total;

      firebase
        .firestore()
        .collection("buchungen")
        .where("kontakt", "==", name)
        .get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            // Get Ordered Product Price
            await firebase
              .firestore()
              .collection("waren")
              .where("warenbezeichnung", "==", doc.data().ware)
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  price = doc.data().einkaufspreis;
                });
              })
              .catch(err => console.log(err));

            title = doc.data().ware;
            id = doc.id;
            amount = doc.data().menge.replace(/[+-\s]+(\d+)/, "$1");
            amount = amount.replace(/,/, '');
            amount = parseFloat(amount, 10);

            price = price.replace(/,/g, '.');

            total = amount * parseFloat(price);

            this.totalSupplierCost = this.totalSupplierCost + total;

            total = total.toString().replace(/\./g, ',') + " €";

            return this.orders.push({
              ProduktID: id,
              Warenbezeichnung: title,
              Volumen: amount + " Stk.",
              Kosten: total
            });
          });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>