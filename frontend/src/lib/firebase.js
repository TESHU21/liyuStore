import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyDV75b5Nyio8r1WHmMRjCzec9a3CyoeY8o",
   authDomain: "liyu-store.firebaseapp.com",
  projectId: "liyu-store",
  storageBucket: "liyu-store.firebasestorage.app",
  messagingSenderId: "83489216594",
  appId: "1:83489216594:web:2991f2fb3dd312da0a278b",
  measurementId: "G-NPRSZKETFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
