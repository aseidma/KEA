<template>
  <div class="stock">
    <b-container>
      <h1>Warenbestand</h1>
      <b-table striped :items="stock"></b-table>
      <h3>Es sind insgesamt Waren im Wert von {{ totalStockValue }} € im Lager.</h3>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';

export default {
  name: "Stock",
  data() {
    return {
      stock: [],
      totalStockValue: 0
    }
  },
  mounted() {
    let price, amount, name, total;

    firebase.firestore().collection('bestand')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          price = doc.data().einkaufspreis;
          amount = doc.data().bestand;
          name = doc.data().warenbezeichnung;
          total = parseInt(price, 10) * amount;

          this.totalStockValue = this.totalStockValue + total;

          let _cellVariants = amount <= 10 ? { Menge: 'danger'} : {};

          this.stock.push({ Warenbezeichnung: name, Menge: amount + " Stk.", _cellVariants , Einkaufspreis: price + " €", Bestandswert: total + " €" });
        })
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>

</style>