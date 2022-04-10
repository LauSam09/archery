import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq8scRYr-rCJnpUiGRP03KIQK74aIhvyo",
  authDomain: "archery-89374.firebaseapp.com",
  projectId: "archery-89374",
  storageBucket: "archery-89374.appspot.com",
  messagingSenderId: "742659309021",
  appId: "1:742659309021:web:092cac756842a458e98a34",
  measurementId: "G-252PD6QKNZ",
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
