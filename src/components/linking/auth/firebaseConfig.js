// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFcC9X8lxqZ4Cxs_KBZPuieT8Hellk_V4",
  authDomain: "mcgill-quantum-group.firebaseapp.com",
  databaseURL: "https://mcgill-quantum-group-default-rtdb.firebaseio.com",
  projectId: "mcgill-quantum-group",
  storageBucket: "mcgill-quantum-group.firebasestorage.app",
  messagingSenderId: "302599456060",
  appId: "1:302599456060:web:96223232cfe8ea185bca39",
  measurementId: "G-9P2L8HQ6XS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
