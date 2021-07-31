import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBP0T8ukMz-gnHAfmLE-ZLDsluDvGLjwQw",
    authDomain: "challenge-92c0d.firebaseapp.com",
    projectId: "challenge-92c0d",
    storageBucket: "challenge-92c0d.appspot.com",
    messagingSenderId: "531605740368",
    appId: "1:531605740368:web:b92235ef732ae25e14aa55",
    measurementId: "G-MV0D0EDHTG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth };