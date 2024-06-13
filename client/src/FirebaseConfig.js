// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1A4jmg-Zxz9djvkMOsZfDsjW1wSQC8l0",
  authDomain: "docsclone-2708f.firebaseapp.com",
  projectId: "docsclone-2708f",
  storageBucket: "docsclone-2708f.appspot.com",
  messagingSenderId: "431968049179",
  appId: "1:431968049179:web:512db91545ebcba2f940be",
  measurementId: "G-JWR2Y06R6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);