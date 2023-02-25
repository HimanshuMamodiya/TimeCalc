// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWar6ON6yPKoTumuU7n30j6ViBpR8cf94",
  authDomain: "time-calc-9c099.firebaseapp.com",
  projectId: "time-calc-9c099",
  storageBucket: "time-calc-9c099.appspot.com",
  messagingSenderId: "75862663042",
  appId: "1:75862663042:web:e38987b41c37fccbdf399b",
  measurementId: "G-Q1M86L5ZZB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
