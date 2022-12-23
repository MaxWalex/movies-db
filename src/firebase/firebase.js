import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyA-yLmzlOvOh_BUR7lzS-ZqeLkqxSPh6ZI",
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyA-yLmzlOvOh_BUR7lzS-ZqeLkqxSPh6ZI",
  authDomain: "moviesdb-4d3a9.firebaseapp.com",
  projectId: "moviesdb-4d3a9",
  storageBucket: "moviesdb-4d3a9.appspot.com",
  messagingSenderId: "1011138057201",
  appId: "1:1011138057201:web:1cf3a10d63bf3f5cac6a50",
  measurementId: "G-MGE2VQ6SQ0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore()