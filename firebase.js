import firebase from firebase;

const firebaseConfig = {
    apiKey: "AIzaSyCnNkZMtBMdlqfDMIV4YXmkP0nOPL6VMBc",
    authDomain: "whats-app-2-46e4b.firebaseapp.com",
    projectId: "whats-app-2-46e4b",
    storageBucket: "whats-app-2-46e4b.appspot.com",
    messagingSenderId: "772359068770",
    appId: "1:772359068770:web:2e4550130882332672453b"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig)
            : firebase.app();

 const db = app.firestore();
 const auth = app.auth();
 const provider = new firebase.auth.GoogleAuthProvider();

 export { db , auth , provider };




