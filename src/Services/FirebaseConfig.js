// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkxnEa8Bqjo_NPZzvLkt6p8puq6LhheKg",
  authDomain: "volhub-c0181.firebaseapp.com",
  projectId: "volhub-c0181",
  storageBucket: "volhub-c0181.appspot.com",
  messagingSenderId: "294693614997",
  appId: "1:294693614997:web:496f9c9993d515ab8fb29c",
  measurementId: "G-ZGX900NMSQ"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const storage=getStorage();