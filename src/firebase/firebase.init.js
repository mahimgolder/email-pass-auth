// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhRj9PCO7q2CpwUYlcscwknMYqmMHD0IE",
  authDomain: "email-pass-auth-cec52.firebaseapp.com",
  projectId: "email-pass-auth-cec52",
  storageBucket: "email-pass-auth-cec52.firebasestorage.app",
  messagingSenderId: "772393489495",
  appId: "1:772393489495:web:14f56a28e16f3e9f63ff12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);