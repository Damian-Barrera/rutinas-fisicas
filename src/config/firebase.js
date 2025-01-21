import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkcJwW3o63EOJs3N9d2msmi4A1tzI9ihc",
  authDomain: "rutinas-fisicas.firebaseapp.com",
  projectId: "rutinas-fisicas",
  storageBucket: "rutinas-fisicas.firebasestorage.app",
  messagingSenderId: "948775140027",
  appId: "1:948775140027:web:0d046f2a72bbfc8898079e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }
