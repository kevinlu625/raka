import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB1b3UW2lHVAP-wWL_z7wrIa17Vp-yJYFM",
  authDomain: "mtsi-ebb63.firebaseapp.com",
  databaseURL: "https://mtsi-ebb63-default-rtdb.firebaseio.com",
  projectId: "mtsi-ebb63",
  storageBucket: "mtsi-ebb63.appspot.com",
  messagingSenderId: "300237751189",
  appId: "1:300237751189:web:18a877948695e5f4c36c9c",
  measurementId: "G-SW381JH2M9",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
