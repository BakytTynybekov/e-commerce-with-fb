import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBP_scgKu-ToweYu2s07TD-TTfLATMEUsA",
  authDomain: "reactfirabase-79889.firebaseapp.com",
  projectId: "reactfirabase-79889",
  storageBucket: "reactfirabase-79889.appspot.com",
  messagingSenderId: "322660685354",
  appId: "1:322660685354:web:20b4a99c61fdfeadfad553",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
