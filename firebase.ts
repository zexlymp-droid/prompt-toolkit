import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase client config is safe to expose publicly — access is controlled
// via Firestore Security Rules, not by hiding these values.
const firebaseConfig = {
  apiKey: "AIzaSyDcHV6RWLURbAzaK3gOk1ElpqLGMihZuCM",
  authDomain: "prompt-toolkit-df514.firebaseapp.com",
  projectId: "prompt-toolkit-df514",
  storageBucket: "prompt-toolkit-df514.firebasestorage.app",
  messagingSenderId: "14323559533",
  appId: "1:14323559533:web:0a61e3ce71bf22f28f2364",
  measurementId: "G-MLQEZ79VZG",
};

// Avoid re-initializing during Next.js hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
