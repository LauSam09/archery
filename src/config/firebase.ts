import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8uPcq-OuYd898caXKWaHU1cJ5Gz4La-Q",
  authDomain: "archery-55139.firebaseapp.com",
  projectId: "archery-55139",
  storageBucket: "archery-55139.appspot.com",
  messagingSenderId: "797222305846",
  appId: "1:797222305846:web:d2cedb8b09ebb6c94b9897",
  measurementId: "G-QMDZNBWTHC",
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
enableIndexedDbPersistence(db).catch(console.error);
