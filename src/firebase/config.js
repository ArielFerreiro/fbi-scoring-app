// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn2HJ2gWgaQMOqnPIRrp9-pjjqqsDJfvM",
  authDomain: "fbi-scoring.firebaseapp.com",
  projectId: "fbi-scoring",
  storageBucket: "fbi-scoring.appspot.com",
  messagingSenderId: "567702357902",
  appId: "1:567702357902:web:9f098879f325160e6d46df"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth ( FirebaseApp );
export const FirebaseDB = getFirestore ( FirebaseApp );