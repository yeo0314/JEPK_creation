// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuration Firebase - Remplacez par vos propres clés
// Obtenez-les sur https://console.firebase.google.com
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "votre-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "votre-projet.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "votre-projet-id",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "votre-projet.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;