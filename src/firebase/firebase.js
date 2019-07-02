import firebase from "firebase/app";
import firebaseui from "firebaseui";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtps0YwloP_9gKEwMvIJTR_xwNlCCmqyE",
  authDomain: "budgetr-3ee0d.firebaseapp.com",
  databaseURL: "https://budgetr-3ee0d.firebaseio.com",
  projectId: "budgetr-3ee0d"
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
    this.auth = firebase.auth();
    this.ui = new firebaseui.auth.AuthUI(this.auth);
  }
}

export default Firebase;
