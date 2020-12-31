import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsKAxj3C1KGX1M2ex9bLLvp31ZTtshg-I",
    authDomain: "messenger-cabca.firebaseapp.com",
    projectId: "messenger-cabca",
    storageBucket: "messenger-cabca.appspot.com",
    messagingSenderId: "809783871125",
    appId: "1:809783871125:web:454a9dbae92eb6c67cfd9c",
    measurementId: "G-9CYH2BY6GL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;