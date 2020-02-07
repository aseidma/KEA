<template>
  <div class="orders">
    <b-container>
      <h1>Bestellungen</h1>
      <h4>Für welchen Kunden würdest du gerne die Bestellungen einsehen?</h4>
      <b-select v-model="customer" :options="customers"></b-select>
      <b-table v-if="customer" striped :items="orders"></b-table>
      <h3
        v-if="customer"
      >Insgesamt haben wir {{ totalCustomerRevenue }} € durch {{ customer }} umgesetzt.</h3>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "Orders",
  watch: {
    customer(newVal) {
      if (newVal) {
        return this.getCustomersOrders(newVal);
      }
    }
  },
  data() {
    return {
      customers: [],
      customer: "",
      orders: [],
      totalCustomerRevenue: 0
    };
  },
  mounted() {
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
  methods: {
    getCustomersOrders(name) {
      this.orders = [];
      this.totalCustomerRevenue = 0;

      let id, title, price, amount, total;

      firebase
        .firestore()
        .collection("buchungen")
        .where("kontakt", "==", name)
        .orderBy("time", "desc")
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
                  price = doc.data().verkaufspreis;
                });
              })
              .catch(err => console.log(err));

            id = doc.id;
            title = doc.data().ware;

            amount = doc.data().menge.replace(/[+-\s]+(\d+)/, "$1");
            amount = amount.replace(/,/, '');
            amount = parseFloat(amount, 10);

            price = price.replace(/,/g, '.');
            
            total = amount * parseFloat(price);

            this.totalCustomerRevenue = this.totalCustomerRevenue + total;

            total = total.toString().replace(/\./g, ',') + " €";

            this.orders.push({
              ProduktID: id,
              Warenbezeichnung: title,
              Volumen: amount + " Stk.",
              Umsatz: total
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