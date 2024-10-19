import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, query, where, onSnapshot, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQ0J9Gx2tcqroJr92TmlsUZpYrq61uD3A",
    authDomain: "indeed-af4c3.firebaseapp.com",
    projectId: "indeed-af4c3",
    storageBucket: "indeed-af4c3.appspot.com",
    messagingSenderId: "431874219992",
    appId: "1:431874219992:web:e2a57639dfc7556f311cad",
    measurementId: "G-86R8K9162W"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  where, query, getStorage, uploadBytes, app, db, auth, storage, onSnapshot,
  doc, signOut, onAuthStateChanged, getDownloadURL, signInWithEmailAndPassword,
  ref, uploadBytesResumable, createUserWithEmailAndPassword, updateDoc,
  collection, addDoc
};