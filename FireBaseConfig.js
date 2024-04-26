// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfDY0QApqC4Uapi-NKnQZy5aMgAjulies",
  authDomain: "application-76516.firebaseapp.com",
  databaseURL: "https://application-76516.firebaseio.com",
  projectId: "application-76516",
  storageBucket: "application-76516.appspot.com",
  messagingSenderId: "44119712543",
  appId: "1:44119712543:web:5cfe04a8a9a64b4aea062a",
  measurementId: "G-ZXP21EVPBD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);