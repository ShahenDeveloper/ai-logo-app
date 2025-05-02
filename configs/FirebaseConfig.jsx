// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-s81WD7p05-ojUrL1bR3BI6Qq0ILMgNg",
  authDomain: "ai-logo-app-3024a.firebaseapp.com",
  projectId: "ai-logo-app-3024a",
  storageBucket: "ai-logo-app-3024a.firebasestorage.app",
  messagingSenderId: "533924617508",
  appId: "1:533924617508:web:52a6daec220a895209e7b1",
  measurementId: "G-3NTN85K1B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)