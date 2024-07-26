// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0psTLrrlfxL6d3p9qa8AQqFRg6YNB3Zs",
  authDomain: "cineflixgpt-cc4cc.firebaseapp.com",
  projectId: "cineflixgpt-cc4cc",
  storageBucket: "cineflixgpt-cc4cc.appspot.com",
  messagingSenderId: "341598530733",
  appId: "1:341598530733:web:fdaf7ed44f8aab00e62a24",
  measurementId: "G-SJST2CLWLG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()