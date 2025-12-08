// Firebase configuration for Talan Showcase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBAlDwlCVudYZktH44uFhUZfGdTqNmSkg",
  authDomain: "talanmi11ang.firebaseapp.com",
  projectId: "talanmi11ang",
  storageBucket: "talanmi11ang.firebasestorage.app",
  messagingSenderId: "834861452398",
  appId: "1:834861452398:web:f3ed01b3e51d13dbc6aa7f",
  measurementId: "G-WRT856MZ10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);

