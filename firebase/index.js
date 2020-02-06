import firebase from 'firebase'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBf14R9_up4rv4M32eD84_A6YGha8qkaLY",
    authDomain: "internettechnologien-bfdc1.firebaseapp.com",
    databaseURL: "https://internettechnologien-bfdc1.firebaseio.com",
    projectId: "internettechnologien-bfdc1",
    storageBucket: "internettechnologien-bfdc1.appspot.com",
    messagingSenderId: "745666459794",
    appId: "1:745666459794:web:fbdb771aa731555afd8e4b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;