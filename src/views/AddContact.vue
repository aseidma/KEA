<template>
  <div class="add-contact">
      <b-container>
          <h1>Kontakt hinzufügen</h1>
          <b-form class="mt-4" @submit.prevent="addContact">
              <b-form-group label="Art des Kontakts" label-for="input-1">
                  <b-select id="input-1" v-model="type" :options="['Kunde', 'Lieferant']"></b-select>
              </b-form-group>
              <b-form-group label="Vor- und Nachname" label-for="input-2">
                  <b-input id="input-2" v-model="name"></b-input>
              </b-form-group>
              <p class="feedback" v-if="feedback">{{ feedback }}</p>
              <b-button type="submit" variant="primary">Erstellen</b-button>
          </b-form>
      </b-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'

export default {
    name: 'AddContact',
    data() {
        return {
            type: '',
            name: '',
            feedback: ''
        }
    },
    methods: {
        addContact() {
            if (this.type && this.name) {
                let collection = this.type == 'Kunde' ? 'kunden' : 'lieferanten';

                firebase.firestore().collection(collection)
                    .add({
                        name: this.name
                    })
                    .then(() => {
                        this.feedback = "Erfolgreich hinzugefügt!";

                        return this.resetForm();
                    })
                    .catch(err => console.log(err))
            } else {
                this.feedback = "Bitte fülle alle Felder aus."
            }
        },
        resetForm() {
            this.type = '';
            this.name = '';
        }
    }
}
</script>

<style>

</style>