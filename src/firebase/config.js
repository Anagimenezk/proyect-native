import app from 'firebase/app';
import firebase from 'firebase';

//la constante la copio de la config de firebase en internet
const firebaseConfig = {
    apiKey: "AIzaSyBeUcf-Yql9jmoxvjhkXHCp7xmHCpSTT2k",
    authDomain: "proyectoreactnative-b3c66.firebaseapp.com",
    projectId: "proyectoreactnative-b3c66",
    storageBucket: "proyectoreactnative-b3c66.appspot.com",
    messagingSenderId: "382278071988",
    appId: "1:382278071988:web:f883b9f348dc51a51349e1",
    measurementId: "G-F4LMMJP8ET"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();