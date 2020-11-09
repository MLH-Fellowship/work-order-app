import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAA-EWram1eYjyBI1d_zo3TCxqCC78NHkA",
  authDomain: "workorder-f57f0.firebaseapp.com",
  databaseURL: "https://workorder-f57f0.firebaseio.com",
  projectId: "workorder-f57f0",
  storageBucket: "workorder-f57f0.appspot.com",
  messagingSenderId: "486097764365",
  appId: "1:486097764365:web:4d3fb2f2ef188a52139544",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
