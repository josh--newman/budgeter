import React, { useContext, useEffect } from "react";
import firebase from "firebase/app";
import { FirebaseContext } from "../firebase";

const Auth = () => {
  const firebaseClient = useContext(FirebaseContext);
  useEffect(() => {
    firebaseClient.ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return true;
        }
      },
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
  }, [firebaseClient]);
  return <div id="firebaseui-auth-container" />;
};

export default Auth;
