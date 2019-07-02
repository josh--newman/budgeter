import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtps0YwloP_9gKEwMvIJTR_xwNlCCmqyE",
  authDomain: "budgetr-3ee0d.firebaseapp.com",
  databaseURL: "https://budgetr-3ee0d.firebaseio.com",
  projectId: "budgetr-3ee0d",
  storageBucket: "budgetr-3ee0d.appspot.com",
  messagingSenderId: "139023225541",
  appId: "1:139023225541:web:68496fd97c46cd37"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
