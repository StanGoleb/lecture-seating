// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZSlwtUlMQRG9hTWSxZBzzIA1w9Uiiyl8",
  authDomain: "lecture-seating-91f3e.firebaseapp.com",
  projectId: "lecture-seating-91f3e",
  storageBucket: "lecture-seating-91f3e.firebasestorage.app",
  messagingSenderId: "1008285496651",
  appId: "1:1008285496651:web:00fa43168a09a5de5364ce",
  measurementId: "G-N0F00SZSFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
