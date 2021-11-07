import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSqaXf7-37db3P-xpSB4F1mKAyJrJkbXY",
  authDomain: "proyectnative.firebaseapp.com",
  projectId: "proyectnative",
  storageBucket: "proyectnative.appspot.com",
  messagingSenderId: "927258276388",
  appId: "1:927258276388:web:8b12cb631b69b499d6deb1"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();