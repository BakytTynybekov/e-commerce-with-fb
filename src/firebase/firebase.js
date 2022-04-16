import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEIN_SENDER,
  appId: process.env.REACT_APP_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBP_scgKu-ToweYu2s07TD-TTfLATMEUsA",
//   authDomain: "reactfirabase-79889.firebaseapp.com",
//   projectId: "reactfirabase-79889",
//   storageBucket: "reactfirabase-79889.appspot.com",
//   messagingSenderId: "322660685354",
//   appId: "1:322660685354:web:20b4a99c61fdfeadfad553",
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
