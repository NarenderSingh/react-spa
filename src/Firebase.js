import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQdmJdT4PRZIFj4Q_JxekWjNageKOm0Eo",
  authDomain: "react-spa-project.firebaseapp.com",
  databaseURL: "https://react-spa-project.firebaseio.com",
  projectId: "react-spa-project",
  storageBucket: "react-spa-project.appspot.com",
  messagingSenderId: "108540880910",
  appId: "1:108540880910:web:bdd88fe24c7b750ea5745f",
  measurementId: "G-T1ZCWWZN39"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
