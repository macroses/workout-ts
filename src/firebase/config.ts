import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkDC9v4eKxFg4NoqyHz6EAprWsGe-33s0",
  authDomain: "workouts-note.firebaseapp.com",
  projectId: "workouts-note",
  storageBucket: "workouts-note.appspot.com",
  messagingSenderId: "207490181588",
  appId: "1:207490181588:web:409a92ba4eb1ecf0954e41"
};

// init
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

export { db, auth };