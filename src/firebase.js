// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_hAOM34OqmtcmWIoGgQo8Fb45b4BPtQI",
  authDomain: "scoutingapp-2024.firebaseapp.com",
  databaseURL: "https://scoutingapp-2024-default-rtdb.firebaseio.com",
  projectId: "scoutingapp-2024",
  storageBucket: "scoutingapp-2024.appspot.com",
  messagingSenderId: "715509081007",
  appId: "1:715509081007:web:f43ad0e5ac2d295440455a",
  measurementId: "G-S3H5BSJE3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebase = getFirestore(app);